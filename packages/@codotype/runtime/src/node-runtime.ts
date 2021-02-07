import * as fs from "fs";
import * as path from "path";
import * as ejs from "ejs";
import {
    indent,
    ComposeWithOptions,
    trailingComma,
    normalizeProjectInput,
    Project,
    RelationTypes,
    RuntimeLogLevel,
    RuntimeLogLevels,
    PluginMetadata,
    PluginRegistration,
    RuntimeProps,
    RuntimeAdapter,
    Runtime,
    ProjectBuild,
    RuntimeAdapterProps,
    GeneratorProps,
    Schema,
    Datatypes,
    PrettifyOptions,
    RuntimeLogBehaviors,
    FileOverwriteBehaviors,
    FileSystemAdapter,
    RuntimeLogBehavior,
    FileOverwriteBehavior,
    ConfigurationValue,
} from "@codotype/core";
import { RuntimeProxyAdapter } from "./utils/runtimeProxyAdapter";
import { runGenerator } from "./utils/runGenerator";
import { prettify } from "./utils/prettify";
import {
    OUTPUT_DIRECTORY,
    TEMPLATES_DIRECTORY_NAME,
    PLUGIN_METADATA_FILENAME,
    PLUGIN_DISTRIBUTABLE_DIR,
} from "./constants";
import { getPluginPath } from "./utils/getPluginPath";
import { prepareProjectBuildDestination } from "./utils/prepareProjectBuildDestination";
import { logger } from "./utils/logger";
import { getAllFiles } from "./utils/getAllFiles";
import {
    handlePluginImportError,
    handleExecuteImportError,
} from "./utils/handleErrors";
import { getComposeWithModulePath } from "./utils/getComposeWithModulePath";

// // // //

interface TemplateData {
    plugin: PluginMetadata;
    project: Project;
    configuration: ConfigurationValue;
    RelationTypes: typeof RelationTypes;
    Datatypes: typeof Datatypes;
    helpers: {
        indent: (text: string, depth: number) => string;
        trailingComma: (arr: any[], index: number) => string;
    };
    [key: string]: any;
}

/**
 * NodeRuntime
 * Runtime for running Codotype plugins through Node.js
 * NOTE - this is called `NodeRuntime` because we may support a non-Node.js runtime
 * in the future (i.e. DenoRuntime, BrowserRuntime, etc.)
 */
export class NodeRuntime implements Runtime {
    private plugins: PluginRegistration[];
    private options: {
        cwd: string;
        fileSystemAdapter: FileSystemAdapter;
        logBehavior: RuntimeLogBehavior;
        fileOverwriteBehavior: FileOverwriteBehavior;
    };

    /**
     * constructor
     * Instantiates a new NodeRuntime and returns it
     * @param options - see `RuntimeProps`
     */
    constructor(options: RuntimeProps) {
        // Assigns this.options + default values
        this.options = {
            ...options,
            fileOverwriteBehavior:
                options.fileOverwriteBehavior || FileOverwriteBehaviors.force,
            logBehavior: options.logBehavior || RuntimeLogBehaviors.verbose,
        };

        // Assigns this.plugins
        this.plugins = [];

        // Returns the runtime instance
        return this;
    }

    /**
     * registerPlugin
     * Registers an individual Codotype Plugin with the runtime
     * This allows the runtime to execute a Build against the registered Codotype Plugin
     * @param props - see `getPluginPath` function
     */
    registerPlugin(props: {
        modulePath?: string;
        relativePath?: string;
        absolutePath?: string;
    }): Promise<PluginRegistration | null> {
        // Resolves path to Codotype Plugin
        const pluginPath: string = getPluginPath({
            ...props,
            cwd: this.options.cwd,
        });

        // Construct path to the generator module
        const pluginDynamicImportPath: string = path.join(
            pluginPath,
            PLUGIN_DISTRIBUTABLE_DIR,
        );

        // Path to PluginMetadata
        const pluginMetadataImportPath: string = path.join(
            pluginPath,
            PLUGIN_DISTRIBUTABLE_DIR,
            PLUGIN_METADATA_FILENAME,
        );

        // Debug pluginPath
        this.log(`registerPlugin - pluginPath: ${pluginPath}`, {
            level: RuntimeLogLevels.verbose,
        });

        // Debug pluginDynamicImportPath
        this.log(
            `registerPlugin - pluginDynamicImportPath: ${pluginDynamicImportPath}`,
            { level: RuntimeLogLevels.verbose },
        );

        // Debug pluginMetadataImportPath
        this.log(
            `registerPlugin - pluginMetadataImportPath: ${pluginMetadataImportPath}`,
            { level: RuntimeLogLevels.verbose },
        );

        // Attempt to load up plugin import and metadata, catch error on failure
        try {
            // Import the the class dynamically
            // QUESTION - can these be done with `import`?
            const pluginDynamicImport = require(pluginDynamicImportPath); // eslint-disable-line import/no-dynamic-require
            const pluginMetadataImport = require(pluginMetadataImportPath); // eslint-disable-line import/no-dynamic-require

            // Destructures the default export into pluginMetadata
            const pluginMetadata: PluginMetadata = {
                ...pluginMetadataImport.default,
            };

            // Add Codotype Plugin to this.plugins if import paths resolve correctly are met
            if (pluginDynamicImport && pluginMetadata) {
                // Defines the new PluginRegistration
                const newPluginRegistration: PluginRegistration = {
                    id: pluginMetadata.identifier,
                    pluginPath,
                    pluginMetadata,
                    pluginDynamicImportPath,
                };

                // Tracks newPluginRegistration in this.plugins
                this.plugins.push(newPluginRegistration);

                // Logs successful registration message
                this.log(
                    `Registered ${pluginMetadata.content.label} Codotype Plugin`,
                    {
                        level: RuntimeLogLevels.verbose,
                    },
                );

                // Resolves the promise with the newPluginRegistration
                return Promise.resolve(newPluginRegistration);
            }
        } catch (err) {
            // Invoke handlePluginImportError and return result
            return handlePluginImportError(err, this.options.logBehavior);
        }

        // Includes default Promise resolution to prevent invariant error
        return Promise.resolve(null);
    }

    /**
     * ensureDir
     * Ensures presence of directory for template compilation
     * @param dir - the directory whose existance is being ensured
     */
    ensureDir(dir: string): Promise<boolean> {
        return this.options.fileSystemAdapter.ensureDir(dir);
    }

    /**
     * getPlugins
     * Returns an array of PluginRegistration instances currently to this runtime instance
     */
    getPlugins(): Promise<PluginRegistration[]> {
        return Promise.resolve(this.plugins);
    }

    /**
     * findPlugin
     * Finds a PluginRegistration based on PluginRegistration.id
     * @param pluginID - the ID of the Plugin that's being looked-up
     */
    async findPlugin(
        pluginID: string,
    ): Promise<PluginRegistration | undefined> {
        // Gets array of PluginRegistrations from this.getPlugins()
        const plugins = await this.getPlugins();

        // Finds the pluginRegistration associated with the ProjectBuild
        // FEATURE - check version here, use semver if possible
        const pluginRegistration: PluginRegistration | undefined = plugins.find(
            g => g.id === pluginID,
        );

        // Returns Promise<PluginRegistration | undefined>
        return Promise.resolve(pluginRegistration);
    }

    /**
     * execute
     * Executes a single ProjectBuild against a Codotype Plugin
     * QUESTION - accept OUTPUT_DIRECTORY override here?
     * @param props.build - ProjectBuild
     */
    async execute({ build }: { build: ProjectBuild }): Promise<void> {
        // Logs "Start Execution" statement
        this.log("NodeRuntime - start execute({ build })", {
            level: RuntimeLogLevels.verbose,
        });

        // Pulls id, projectInput from build object
        let { id, projectInput } = build;

        // Inflates Project from ProjectInput
        const project: Project = normalizeProjectInput({
            projectInput,
        });

        // Provisions the output directory and writes the Codotype Project JSON to the output directory
        await prepareProjectBuildDestination({
            build,
            runtime: this,
            cwd: this.options.cwd,
        });

        // Performs lookup to gind Plugin based on ProjectInput.pluginID
        const pluginRegistration = await this.findPlugin(project.pluginID);

        // If pluginRegistration is not found -> log error message and short-circuit execution
        if (pluginRegistration === undefined) {
            // Logs error message
            this.log(
                "NodeRuntime.execute - Codotype Plugin not found. Please ensure that Codotype Plugin has been correctly registered with Runtime.registerPlugin",
                { level: RuntimeLogLevels.verbose },
            );

            // Resolves Promise<void>
            return Promise.resolve();
        }

        // Pulls pluginDynamicImportPath from pluginRegistration
        const { pluginDynamicImportPath } = pluginRegistration;

        // Sets buildOutputDirectory default to build ID by default
        // NOTE - if `build.id` is an empty string, the project is placed directly inside OUTPUT_DIRECTORY
        const buildOutputDirectory: string = id || "";

        // Constructs RuntimeAdapterProps.destinationPath
        const destinationPath: string = path.join(
            this.options.cwd,
            OUTPUT_DIRECTORY,
            buildOutputDirectory,
            project.identifiers.snake,
        );

        // Attempt to load the Generator from pluginDynamicImportPath, handle error
        try {
            // Defines generator and it's associated absolute filepath for module resolution
            const generator: GeneratorProps = require(pluginDynamicImportPath); // eslint-disable-line import/no-dynamic-require
            const generatorResolvedPath: string = require.resolve(
                pluginDynamicImportPath,
            );

            // Defines options for generator instance
            const runtimeAdapterProps: RuntimeAdapterProps = {
                project,
                destinationPath,
                generatorResolvedPath,
                plugin: pluginRegistration.pluginMetadata,
                runtime: this,
            };

            // Log "Running Plugin Generator" statement
            this.log(`Running Plugin Generator: ${generator.name}`, {
                level: RuntimeLogLevels.verbose,
            });

            // Creates RuntimeProxyAdapter instance
            const runtimeProxyAdapter = new RuntimeProxyAdapter(
                generator,
                runtimeAdapterProps,
            );

            // Invokes runGenerator w/ Project + RuntimeProxyAdapter
            await runGenerator({
                project,
                runtimeAdapter: runtimeProxyAdapter,
            });
        } catch (err) {
            return handleExecuteImportError(err, this.options.logBehavior);
        }

        // Logs "Thank you" message
        this.log(
            "\nBuild complete\nThank you for using Codotype :)\nFollow us on github.com/codotype\n",
            { level: RuntimeLogLevels.verbose },
        );

        // Resolves with Promise<void>
        return Promise.resolve();
    }

    /**
     * getTemplatePath
     * Generates the full path to a specific template file, relative to the filepath of the generator in-which the template is compiled
     * @param {string} generatorResolved
     * @param {string} template_path
     */
    getTemplatePath(
        generatorResolvedPath: string,
        templateRelativePath: string,
    ): string {
        return path.join(
            generatorResolvedPath,
            TEMPLATES_DIRECTORY_NAME,
            templateRelativePath,
        );
    }

    /**
     * getDestinationPath
     * Takes the destination name for a template and Generates
     */
    getDestinationPath(
        outputDirAbsolutePath: string,
        destinationRelativePath: string,
    ): string {
        return path.join(outputDirAbsolutePath, destinationRelativePath);
    }

    /**
     * renderTemplate
     * Compiles an EJS template and returns the result
     * @param generatorInstance
     * @param src
     * @param options
     */
    renderTemplate(
        generatorInstance: RuntimeAdapter,
        src: string,
        data?: { [key: string]: any },
        options?: { prettify?: PrettifyOptions },
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            // default options padded into the renderFile
            let renderOptions = {};

            // Defines data + options objects if none are passed in
            const dataObj: { [key: string]: any } = data || {};
            const optionsObj: { prettify?: PrettifyOptions } = options || {};

            // Pulls references to plugin + project from generatorInstance.props
            const { plugin, project } = generatorInstance.props;

            // Assembles the data object passed into each template file that that gets rendered
            const templateData: TemplateData = {
                plugin,
                project,
                configuration: generatorInstance.props.project.configuration,
                helpers: {
                    indent,
                    trailingComma,
                },
                RelationTypes,
                Datatypes,
                ...dataObj,
            };

            // Compiles EJS template
            return ejs.renderFile(
                src,
                templateData,
                renderOptions,
                (err, str) => {
                    // Handles template compilation error
                    if (err) return reject(err);

                    // Prettify if desired
                    if (optionsObj.prettify !== undefined) {
                        str = prettify({
                            source: str,
                            parser: optionsObj.prettify.parser,
                            semi: optionsObj.prettify.semi,
                        });
                    }

                    // Resolves with compiled template
                    return resolve(str);
                },
            );
        });
    }

    /**
     * compareFile
     * Compares an existing file against a compiled template, returns true/false
     * @param destinationFilepath - the destination file being compared against compiledTemplate
     * @param compiledTemplate - the text being compared against the contents of the file at destinationFilepath
     */
    async compareFile(
        destinationFilepath: string,
        compiledTemplate: string,
    ): Promise<boolean> {
        // Reads the file from FS
        const existingFile:
            | string
            | null = await this.options.fileSystemAdapter.readFile(
            destinationFilepath,
        );

        // If exists, and it's the same, SKIP
        if (existingFile === null) {
            return Promise.resolve(false);
        }
        return Promise.resolve(compiledTemplate === existingFile);
    }

    /**
     * writeFile
     * Writes a compiled template to a file
     * @param dest - the destination where the compiledTemplate is being written
     * @param compiledTemplate - the text being written inside `dest`
     */
    writeFile(
        dest: string,
        compiledTemplate: string,
        options?: {
            prettify?: PrettifyOptions;
        },
    ): Promise<boolean> {
        let fileContents: string = compiledTemplate;

        // Run prettify against compiledTemplate
        if (options && options.prettify) {
            fileContents = prettify({
                source: compiledTemplate,
                semi: options.prettify.semi,
                parser: options.prettify.parser,
            });
        }

        return this.options.fileSystemAdapter.writeFile(dest, fileContents);
    }

    /**
     * copyDir
     * Copy a directory from src to dest
     * @param src - the name of the directory being copied inside the `templates` directory relative to the Codotype Generator invoking this method
     * @param dest - the name of the destination directory
     */
    async copyDir(params: { src: string; dest: string }): Promise<boolean> {
        const { src, dest } = params;
        // CHORE - update allFiles to produce contents + destination pairs
        const allFiles = getAllFiles(src, []);
        for (const i in allFiles) {
            const sourcePath = allFiles[i];

            let destPath: string | undefined = sourcePath
                .split(`/${TEMPLATES_DIRECTORY_NAME}/`)
                .pop();

            if (destPath === undefined) {
                this.log("Runtime Error - destination path not found!", {
                    level: RuntimeLogLevels.error,
                });
                continue;
            }

            // Builds destination path
            destPath = path.resolve(dest, destPath);

            // Safely reads in
            try {
                const contents: string = fs.readFileSync(sourcePath, "utf8");
                await this.options.fileSystemAdapter.writeFile(
                    destPath,
                    contents,
                );
            } catch (e) {
                // Logs error message
                this.log(
                    `Runtime Error - copyDir file not found: ${sourcePath}`,
                    {
                        level: RuntimeLogLevels.error,
                    },
                );
                continue;
            }
        }

        // Resolves true
        return Promise.resolve(true);
    }

    /**
     * log
     * A logging function used internally by the Runtime
     * Invokes logger function with args, options, and Runtime.options.logLevel
     * @param args - see logger.ts
     */
    log(args: any, options: { level: RuntimeLogLevel }) {
        logger(args, options, this.options.logBehavior);
    }

    /**
     * composeWith
     * Enables one generator to fire off several child generators
     * @param parentRuntimeAdapter
     * @param generatorModulePath
     * @param options - @see ComposeWithOptions
     */
    async composeWith(
        parentRuntimeAdapter: RuntimeAdapter,
        generatorModulePath: string,
        options: ComposeWithOptions = {},
    ): Promise<void> {
        // Log composeWith debug statement
        this.log(`Composing Generator: ${generatorModulePath}`, {
            level: RuntimeLogLevels.verbose,
        });

        // Looks up actively-used Plugin
        const activePlugin = await this.findPlugin(
            parentRuntimeAdapter.props.plugin.identifier,
        );

        if (activePlugin === undefined) {
            console.log("MODULE NOT FOUND");
            throw new Error("NodeRuntime - composeWith - plugin not found");
        }

        // Gets path to generator module using getComposeWithModulePath function
        const modulePath = getComposeWithModulePath(
            generatorModulePath,
            parentRuntimeAdapter,
            activePlugin,
        );

        // Attempt to load the Generator from pluginDynamicImportPath, handle error
        try {
            // Defines generator and it's associated absolute filepath for module resolution
            const generator: GeneratorProps = require(modulePath); // eslint-disable-line import/no-dynamic-require
            const resolved: string = require.resolve(modulePath);

            // CHORE - document this, clean it all up
            // CHORE - move into independent function, `getResolvedGeneratorPath`, perhaps
            let resolvedGeneratorPath = resolved;
            let resolvedGeneratorPathParts = resolvedGeneratorPath.split("/");
            resolvedGeneratorPathParts.pop();
            resolvedGeneratorPath = resolvedGeneratorPathParts.join("/");

            // Resolve the absoluate path to the destination directory for this generator
            let resolvedDestination =
                parentRuntimeAdapter.props.destinationPath;

            // Handle ComposeWithOptions.outputDirectoryScope
            // Scope the output of the composed Generator inside a different directory within OUTPUT_DIRECTORY/my_project
            if (options.outputDirectoryScope) {
                // Updates resolvedDestination to include the additional outputDirectoryScope
                resolvedDestination = path.resolve(
                    parentRuntimeAdapter.props.destinationPath,
                    options.outputDirectoryScope,
                );
            }

            // Debug statements
            this.log(
                `Runtime.composeWith - resolvedDestination: ${resolvedDestination}`,
                { level: RuntimeLogLevels.verbose },
            );

            this.log(
                `Runtime.composeWith - resolvedGeneratorPath: ${resolvedGeneratorPath}`,
                { level: RuntimeLogLevels.verbose },
            );

            // // // //

            // Gets project from parentRuntimeAdapter.options
            const project = parentRuntimeAdapter.props.project;

            // Creates new CodotypeGenerator
            const runtimeProxyAdapter = new RuntimeProxyAdapter(generator, {
                ...parentRuntimeAdapter.props,
                destinationPath: resolvedDestination,
                generatorResolvedPath: resolvedGeneratorPath,
            });

            // Invokes runGenerator w/ generatorInstance + project
            await runGenerator({
                project,
                runtimeAdapter: runtimeProxyAdapter,
            });

            // Logs output
            this.log(`Generated ${generator.name}.\n`, {
                level: RuntimeLogLevels.info,
            });
        } catch (err) {
            return handleExecuteImportError(err, this.options.logBehavior);
        }
    }

    /**
     * writeTemplateToFile
     * Compiles a template and writes to the dest location
     * @param runtimeAdapter
     * @param src
     * @param dest
     * @param options
     */
    writeTemplateToFile(
        runtimeAdapter: RuntimeAdapter,
        src: string,
        dest: string,
        data: object = {},
        options: object = {},
    ): Promise<boolean> {
        // DEBUG
        // console.log('Copying:' + dest)

        return new Promise(async (resolve, reject) => {
            // DEBUG
            // this.log('Rendering:' + dest)

            // Compiles the template through CodotypeRuntime.renderTemplate
            const compiledTemplate: string = await this.renderTemplate(
                runtimeAdapter,
                src,
                data,
                options,
            );

            // DEBUG
            // this.log('Rendered:' + dest)

            // // // //
            // FEATURE - re-introduce based on FileOverwriteBehavior
            // // Does the destination already exist?
            // const exists = await this.options.fileSystemAdapter.fileExists(
            //     dest,
            // );

            // // If it doesn't exist, OKAY TO WRITE
            // if (exists) {
            //     console.log("EXISTS");
            //     if (this.compareFile(dest, compiledTemplate)) {
            //         return resolve();
            //     } else {
            //         // NOTE - input checking will vary depending on environment
            //         // If exists, and it's different, WRITE (add PROMPT option later, for safety)
            //     }
            // }
            // // // //

            // Writes the compiled template to the dest location
            return this.writeFile(dest, compiledTemplate).then(() => {
                return resolve();
            });
        });
    }
}
