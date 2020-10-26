import * as fs from "fs";
// @ts-ignore
import * as fsExtra from "fs-extra";
import * as path from "path";
import * as ejs from "ejs";
import {
    indent,
    ComposeWithOptions,
    trailingComma,
    inflateProject,
    Datatype,
    Project,
    RelationType,
    RuntimeLogLevel,
    RuntimeLogLevels,
    PluginMetadata,
    PluginRegistration,
    RuntimeConstructorParams,
    RuntimeAdaptor,
    Runtime,
    ProjectBuild,
    RuntimeInjectorProps,
} from "@codotype/core";
import { RuntimeProxyAdaptor } from "./utils/runtimeProxyAdaptor";
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
import { GeneratorConstructorParams } from "packages/@codotype/core/dist";

// // // //
// TODO - cleanup + simplify error handling

function handlePluginImportError(error: any): Promise<null> {
    console.log(error);
    if (error.code === "MODULE_NOT_FOUND") {
        console.log("REGISTRATION ERROR - PLUGIN NOT FOUND");
        return Promise.resolve(null);
    } else {
        console.log("REGISTRATION ERROR - OTHER");
        return Promise.resolve(null);
    }
}

function handleExecuteImportError(error: any): Promise<void> {
    if (error.code === "MODULE_NOT_FOUND") {
        console.log("RUNTIME ERROR - GENERATOR NOT FOUND");
    } else {
        console.log("RUNTIME ERROR - OTHER");
    }
    // Resolves with Promise<void>
    return Promise.resolve();
}

// // // //

/**
 * CodotypeNodeRuntime
 * Runtime for running Codotype plugins through Node.js
 */
export class CodotypeNodeRuntime implements Runtime {
    private options: RuntimeConstructorParams;
    private plugins: PluginRegistration[];

    /**
     * constructor
     * Instantiates a new CodotypeNodeRuntime and returns it
     * @param options - see `RuntimeConstructorParams`
     */
    constructor(options: RuntimeConstructorParams) {
        // Assigns this.options + default values
        this.options = {
            ...options,
            logLevel: options.logLevel || RuntimeLogLevels.verbose,
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
                    id: pluginMetadata.id,
                    pluginPath,
                    pluginMetadata,
                    pluginDynamicImportPath,
                };

                // Tracks newPluginRegistration in this.plugins
                this.plugins.push(newPluginRegistration);

                // Logs successful registration message
                this.log(`Registered ${pluginMetadata.label} Codotype Plugin`, {
                    level: RuntimeLogLevels.verbose,
                });

                // Resolves the promise with the newPluginRegistration
                return Promise.resolve(newPluginRegistration);
            }
        } catch (err) {
            // Invoke handlePluginImportError and return result
            return handlePluginImportError(err);
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
        return new Promise((resolve, reject) => {
            return fsExtra.ensureDir(dir, (err: any) => {
                if (err) return reject(err);
                return resolve(true);
            });
        });
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
     * TODO - finish implementing this, replace duplicate code throughout the
     */
    // findPlugin(pluginID: string): Promise<PluginRegistration|null> {}

    /**
     * execute
     * Executes a single ProjectBuild against a Codotype Plugin
     * QUESTION - accept OUTPUT_DIRECTORY override here?
     * @param props.build - ProjectBuild
     */
    async execute({ build }: { build: ProjectBuild }): Promise<void> {
        // Logs "Start Execution" statement
        this.log("CodotypeNodeRuntime - start execute({ build })", {
            level: RuntimeLogLevels.verbose,
        });

        // Pulls id, projectInput from build object
        let { id, projectInput } = build;

        // Inflates Project from ProjectInput
        const project: Project = inflateProject({
            projectInput,
        });

        // Provisions the output directory and writes the Codotype Project JSON to the output directory
        await prepareProjectBuildDestination({
            build,
            runtime: this,
            cwd: this.options.cwd,
        });

        // // // //
        // TODO - abstract into findPlugin()
        //
        // Gets array of PluginRegistrations from this.getPlugins()
        const plugins = await this.getPlugins();

        // Finds the pluginRegistration associated with the ProjectBuild
        // TODO - check version here, use semver if possible
        const pluginRegistration: PluginRegistration | undefined = plugins.find(
            (g) => g.id === project.pluginID,
        );
        //
        // // // //

        // If pluginRegistration is not found -> log error message and short-circuit execution
        if (pluginRegistration === undefined) {
            // Logs error message
            this.log(
                "CodotypeNodeRuntime.execute - Codotype Plugin not found. Please ensure that Codotype Plugin has been correctly registered with Runtime.registerPlugin",
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

        // Assigns `dest` option for project output
        const dest: string = path.join(
            this.options.cwd,
            OUTPUT_DIRECTORY,
            buildOutputDirectory,
            project.identifiers.snake,
        );

        // Attempt to load the Generator from pluginDynamicImportPath, handle error
        try {
            // Defines generator and it's associated absolute filepath for module resolution
            const generator: GeneratorConstructorParams = require(pluginDynamicImportPath); // eslint-disable-line import/no-dynamic-require
            const resolved: string = require.resolve(pluginDynamicImportPath);

            // Defines options for generator instance
            const runtimeProxyAdaptorProps: RuntimeInjectorProps = {
                project,
                dest,
                resolved,
                plugin: pluginRegistration.pluginMetadata,
                runtime: this,
            };

            // Log "Running Plugin Generator" statement
            this.log(`Running Plugin Generator: ${generator.name}`, {
                level: RuntimeLogLevels.verbose,
            });

            // Creates RuntimeProxyAdaptor instance
            const runtimeProxyAdaptor = new RuntimeProxyAdaptor(
                generator,
                runtimeProxyAdaptorProps,
            );

            // Invokes runGenerator w/ Project + RuntimeProxyAdaptor
            await runGenerator({
                project,
                runtimeProxyAdaptor,
            });

            // Logs which generator is being run
        } catch (err) {
            return handleExecuteImportError(err);
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
     * templatePath
     * Generates the full path to a specific template file, relative to the filepath of the generator in-which the template is compiled
     * @param {string} generatorResolved
     * @param {string} template_path
     */
    templatePath(generatorResolved: string, template_path = "./"): string {
        return path.join(
            generatorResolved,
            TEMPLATES_DIRECTORY_NAME,
            template_path,
        );
    }

    /**
     * destinationPath
     * Takes the destination name for a template and Generates
     */
    destinationPath(destPath: string, dest = "./"): string {
        return path.join(destPath, dest);
    }

    /**
     * renderTemplate
     * Compiles an EJS template and returns the result
     * @param generatorInstance
     * @param src
     * @param options
     */
    renderTemplate(
        generatorInstance: RuntimeAdaptor,
        src: string,
        options: any = {},
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            // default options padded into the renderFile
            let renderOptions = {};

            // // // //
            // TODO - type this object - TemplateProps interface
            // TODO - should be abstracted into a separate function?
            // The `data` object is passed into each file that gets rendered
            const data = {
                project: generatorInstance.options.project,
                plugin: generatorInstance.options.plugin,
                configuration: generatorInstance.options.project.configuration,
                helpers: {
                    indent,
                    trailingComma,
                    // forEachSchema helper function?
                    // forEachAttribute helper function?
                    // forEachRelation helper function?
                    // forEachReverseRelation helper function?
                    // forEachReference helper function?
                },
                RelationType,
                Datatype,
                ...options, // QUESTION - are options ever used here?
            };
            // // // //

            // Compiles EJS template
            return ejs.renderFile(src, data, renderOptions, (err, str) => {
                // Handles template compilation error
                if (err) return reject(err);

                // Prettify if desired
                if (options.prettify) {
                    str = prettify({ source: str });
                }

                // Resolves with compiled template
                return resolve(str);
            });
        });
    }

    /**
     * fileExists
     * Checks to see if a file exists at the destination in the filesystem
     * @param filepath - string
     */
    fileExists(filepath: string): Promise<boolean> {
        return Promise.resolve(fs.existsSync(filepath));
    }

    /**
     * compareFile
     * Compares an existing file against a compiled template, returns true/false
     * @param destinationFilepath - the destination file being compared against compiledTemplate
     * @param compiledTemplate - the text being compared against the contents of the file at destinationFilepath
     */
    compareFile(
        destinationFilepath: string,
        compiledTemplate: string,
    ): Promise<boolean> {
        // Reads the file from FS
        const existing = fsExtra.readFileSync(destinationFilepath, "utf8");

        // If exists, and it's the same, SKIP
        if (compiledTemplate === existing) {
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }

    /**
     * writeFile
     * Writes a compiled template to a file
     * @param dest - the destination where the compiledTemplate is being written
     * @param compiledTemplate - the text being written inside `dest`
     */
    writeFile(dest: string, compiledTemplate: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fsExtra.writeFile(dest, compiledTemplate, (err: any) => {
                // Handle error
                if (err) {
                    // Logs debug statement
                    this.log("writeFile error: " + dest, {
                        level: RuntimeLogLevels.verbose,
                    });

                    // Rejects error
                    return reject(err);
                }

                // Logs debug statement
                this.log("writeFile: " + dest, {
                    level: RuntimeLogLevels.verbose,
                });

                // Resovles
                return resolve(true);
            });
        });
    }

    /**
     * copyDir
     * Copy a directory from src to dest
     * @param src - the name of the directory being copied inside the `templates` directory relative to the Codotype Generator invoking this method
     * @param dest - the name of the destination directory
     */
    async copyDir(params: { src: string; dest: string }): Promise<boolean> {
        const { src, dest } = params;
        return new Promise((resolve, reject) => {
            return fsExtra.copy(src, dest, (err: any) => {
                if (err) return reject(err);
                return resolve(true);
            });
        });
    }

    /**
     * log
     * A logging function used internally by the Runtime
     * Invokes logger function with args, options, and Runtime.options.logLevel
     * @param args - see logger.ts
     */
    log(args: any, options: { level: RuntimeLogLevel }) {
        logger(args, options, this.options.logLevel);
    }

    /**
     * composeWith
     * Enables one generator to fire off several child generators
     * @param parentRuntimeAdaptor
     * @param generatorModulePath
     * @param options - @see ComposeWithOptions
     */
    async composeWith(
        parentRuntimeAdaptor: RuntimeAdaptor,
        generatorModulePath: string,
        options: ComposeWithOptions = {},
    ): Promise<void> {
        // Log composeWith debug statement
        this.log(`Composing Generator: ${generatorModulePath}`, {
            level: RuntimeLogLevels.verbose,
        });

        // Defines module path
        let modulePath: string = "";

        // // // //
        // TODO - abstract this into a separate function, we're using this in a few different places
        //
        // Finds the currently active plugin
        const plugins = await this.getPlugins();
        const activePlugin = plugins.find(
            (p) => p.id === parentRuntimeAdaptor.options.plugin.id,
        );

        if (activePlugin === undefined) {
            console.log("MODULE NOT FOUND");
            throw new Error("NodeRuntime - composeWith - plugin not found");
        }
        //
        // // // //

        // // // //
        // TODO - move this into a function ( `getModulePath`, perhaps )
        // Handle relative paths
        if (
            generatorModulePath.startsWith("./") ||
            generatorModulePath.startsWith("../")
        ) {
            // TODO - document
            let base: string = "";

            // TODO - abstract into helper function?
            const stats = fsExtra.statSync(
                parentRuntimeAdaptor.options.resolved,
            );

            // TODO - document
            // TODO - document
            if (stats.isDirectory()) {
                base = parentRuntimeAdaptor.options.resolved;
            } else {
                base = path.dirname(parentRuntimeAdaptor.options.resolved);
            }

            // TODO - document
            modulePath = path.join(base, generatorModulePath);

            // Handle absolute path
            // } else if (generatorModulePath.absolutePath) {
        } else if (generatorModulePath.startsWith("/")) {
            modulePath = path.join(generatorModulePath);

            // Handle module path
        } else {
            modulePath = path.join(
                activePlugin.pluginDynamicImportPath, // TODO - ensure this is correct!!!
                "node_modules",
                generatorModulePath,
            );
        }
        //
        // // // //

        // Attempt to load the Generator from pluginDynamicImportPath, handle error
        try {
            // Defines generator and it's associated absolute filepath for module resolution
            const generator: GeneratorConstructorParams = require(modulePath); // eslint-disable-line import/no-dynamic-require
            const resolved: string = require.resolve(modulePath);

            // TODO - document this, clean it all up
            // TODO - move into independent function, `getResolvedGeneratorPath`, perhaps
            let resolvedGeneratorPath = resolved;
            let resolvedGeneratorPathParts = resolvedGeneratorPath.split("/");
            resolvedGeneratorPathParts.pop();
            resolvedGeneratorPath = resolvedGeneratorPathParts.join("/");

            // // // //
            // TODO - move into independent function, `resolveDestination`, perhaps
            let resolvedDestination = parentRuntimeAdaptor.options.dest;

            // Handle ComposeWithOptions.outputDirectoryScope
            // Scope the output of the composed Generator inside a different directory within OUTPUT_DIRECTORY/my_project
            if (options.outputDirectoryScope) {
                // Updates resolvedDestination to include the additional outputDirectoryScope
                resolvedDestination = path.resolve(
                    parentRuntimeAdaptor.options.dest,
                    options.outputDirectoryScope,
                );
            }
            //
            // // // //

            // Debug statements
            this.log(
                `Runtime.composeWith - resolvedDestination: ${resolvedDestination}`,
                { level: RuntimeLogLevels.verbose },
            );

            // Gets project from parentRuntimeAdaptor.options
            const project = parentRuntimeAdaptor.options.project;

            // Creates new CodotypeGenerator
            const runtimeProxyAdaptor = new RuntimeProxyAdaptor(generator, {
                ...parentRuntimeAdaptor.options,
                dest: resolvedDestination,
                resolved: resolvedGeneratorPath,
            });

            // Invokes runGenerator w/ generatorInstance + project
            await runGenerator({
                project,
                runtimeProxyAdaptor,
            });

            // Logs output
            this.log(`Generated ${generator.name}.\n`, {
                level: RuntimeLogLevels.info,
            });

            // Logs which generator is being run
        } catch (err) {
            return handleExecuteImportError(err);
        }
    }
}
