import * as fs from "fs";
import * as fsExtra from "fs-extra";
import * as path from "path";
import * as ejs from "ejs";
import {
    indent,
    trailingComma,
    inflateProject,
    Datatype,
    InflatedProject,
    RelationType,
    Project,
    InflatedSchema,
} from "@codotype/core";
import { CodotypeGenerator, GeneratorOptions } from "@codotype/generator";
import { prettify } from "./prettify";
import {
    OUTPUT_DIRECTORY,
    CODOTYPE_MANIFEST_DIRECTORY,
    MODULES_ROOT,
    GENERATOR_META_FILENAME,
    PLUGIN_DISTRIBUTABLE_DIR,
    RuntimeLogLevel,
    RuntimeErrorCodes,
    CodotypeRuntime,
    PluginMetadata,
    ProjectBuild,
    CodotypeRuntimeConstructorOptions,
    PluginRegistration,
} from "./core-updates";

// // // //

/**
 * getPluginPath
 * Gets the absolute path to a Codotype Plugin
 * Used by CodotypeNodeJsRuntime.registerPlugin
 * @param props.modulePath
 * @param props.relativePath
 * @param props.absolutePath
 */
export function getPluginPath(props: {
    modulePath?: string;
    relativePath?: string;
    absolutePath?: string;
}): string {
    // Pulls modulePath, relativePath, absolutePath from params
    const {
        modulePath = null,
        relativePath = null,
        absolutePath = null,
    } = props;

    // Generator is located in node_modules
    if (modulePath) {
        return path.join(this.options.cwd, MODULES_ROOT, modulePath);
    }

    // Generator is located relative to process.cwd()
    if (relativePath) {
        return path.join(this.options.cwd, relativePath);
    }

    // Generator path is absolute path on the filesystem, i.e. /tmp/my-generator
    if (absolutePath) {
        return absolutePath;
    }

    // Throw error
    throw new Error(
        "Codotype Plugin path is invalid - please check Codotype.registerPlugin() parameters",
    );
}

// // // //

/**
 * CodotypeNodeRuntime
 * Runtime for running Codotype plugins through Node.js
 */
export class CodotypeNodeRuntime implements CodotypeRuntime {
    options: CodotypeRuntimeConstructorOptions;
    plugins: PluginRegistration[];

    /**
     * constructor
     * Handles options to run a single generator instance
     * @param options
     */
    constructor(options: CodotypeRuntimeConstructorOptions) {
        // Assigns this.options + default values
        // Assigns this.options.cwd
        // TODO - replace this.options with something else? Do we need to keep this.options
        this.options = {
            ...options,
            cwd: process.cwd(),
            logLevel: options.logLevel || RuntimeLogLevel.verbose,
        };

        // Assigns this.plugins
        this.plugins = [];

        // Returns the runtime instance
        return this;
    }

    /**
     * registerPlugin
     * TODO - add example invocations for each parameter
     * Registers an individual Codotype Plugin with the runtime
     * This allows the runtime to execute a "BUILD" against the Plugin
     * @param props.modulePath
     * @param props.relativePath
     * @param props.absolutePath
     */
    registerPlugin(props: {
        modulePath?: string;
        relativePath?: string;
        absolutePath?: string;
    }): Promise<PluginRegistration> {
        // Resolves path to Codotype Plugin
        const pluginPath: string = getPluginPath(props);

        // Construct path to the generator module
        const pluginDynamicImportPath: string = path.join(
            pluginPath,
            PLUGIN_DISTRIBUTABLE_DIR,
        );

        // Path to GENERATOR_META
        // NOTE - this should be reworked to accept `codotype-generator.js` or `codotype-generator.ts`
        const pluginMetadataImportPath: string = path.join(
            pluginPath,
            GENERATOR_META_FILENAME,
        );

        // Debugging
        this.log(pluginDynamicImportPath, { level: RuntimeLogLevel.verbose });
        this.log(pluginMetadataImportPath, { level: RuntimeLogLevel.verbose });

        // Attempt to load up plugin import and metadata, catch error on failure
        try {
            // Import the the class dynamically
            // TODO - can these be done with `import`?
            const pluginDynamicImport = require(pluginDynamicImportPath); // eslint-disable-line import/no-dynamic-require
            const pluginMetadataImport = require(pluginMetadataImportPath); // eslint-disable-line import/no-dynamic-require

            // Destructures the default export into pluginMetadata
            const pluginMetadata: PluginMetadata = {
                ...pluginMetadataImport.default,
            };

            // Debugging PluginMetadata import
            // this.log("pluginMetadata");
            // this.log(JSON.stringify(pluginMetadata, null, 4));

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

                // Logs
                // TODO - can we improve the logging here?
                // console.info(`Registered ${GeneratorClass.name} generator`)
                this.log(`Registered Codotype Plugin`, {
                    level: RuntimeLogLevel.verbose,
                });

                return Promise.resolve(newPluginRegistration);
            }

            // Logs which generator is being run
        } catch (err) {
            // TODO - add enum of error codes
            // TODO - Improve logging here + add tests
            if (err.code === "MODULE_NOT_FOUND") {
                console.log("REGISTRATION ERROR - PLUGIN NOT FOUND");
                throw err;
            } else {
                console.log("REGISTRATION ERROR - OTHER");
                throw err;
            }
        }
    }

    /**
     * prepareProjectBuildDestination
     * Provisions the output directory and writes the Codotype Project JSON to the output directory
     * @param param.build - see ProjectBuild
     */
    async prepareProjectBuildDestination({
        build,
    }: {
        build: ProjectBuild;
    }): Promise<void> {
        // Debug log statements
        console.log("Writing build manfiest");

        // Defines directory to encapsulate build IFF build.id is defined
        let buildID: string = build.id || "";

        // Defines the destination directory for the build output
        const destRoot: string = path.join(
            this.options.cwd,
            OUTPUT_DIRECTORY,
            buildID,
            build.project.identifiers.snake,
        );

        // Ensures presence of the destination directory
        await this.ensureDir(destRoot);

        // Defines destination directory for codotype-project.json (.codotype/ by default)
        const manifestDest = path.join(destRoot, CODOTYPE_MANIFEST_DIRECTORY);

        // Ensures presence of the manifestDest directory
        await this.ensureDir(manifestDest);

        // Writes two source files into the `.codotype` directory
        return new Promise((resolve, reject) => {
            // Writes Project JSON to output directory
            fs.writeFileSync(
                path.join(
                    manifestDest +
                        `/${build.project.identifiers.kebab}-codotype-project.json`,
                ),
                JSON.stringify(build.project, null, 2),
            );

            // Debug log statement
            console.log("Wrote codotype-project.json");

            // Resolves the Promise
            return resolve();
        });
    }

    /**
     * ensureDir
     * Ensures presence of directory for template compilation
     * TODO - this is repeated in @codotype/generator - should be abstracted, or only encapsulated in the runtime
     * @param dir
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
     * execute
     * Method for write files to the filesystem
     * TODO - accept OUTPUT_DIRECTORY override
     * @param props.build - ProjectBuild
     */
    async execute({ build }: { build: ProjectBuild }): Promise<void> {
        // Logs debug statements
        console.log("CodotypeNodeRuntime - start execute({ build })");

        // Pulls attributes out of build object
        let { id, project } = build;

        // Inflates blueprint metadata
        const inflatedProject: InflatedProject = inflateProject({ project });

        // Provisions the output directory and writes the Codotype Project JSON to the output directory
        await this.prepareProjectBuildDestination({ build });

        // Pulls generator from registry runtime registry
        // TODO - conflate each stage to its respective generator,
        // skipping / throwing errors on those whos generator is missing
        const pluginRegistration:
            | PluginRegistration
            | undefined = this.plugins.find(
            (g) => g.id === project.generatorId,
        );

        // If pluginRegistration is not found, log error message and short-circuit execution
        // TODO - log error message here
        if (!pluginRegistration) return;

        // Pulls pluginDynamicImportPath from pluginRegistration
        const { pluginDynamicImportPath } = pluginRegistration;

        // Sets output_directory default to build ID by default
        const output_directory = id || "";

        // Assigns `dest` option for project output
        const dest = path.join(
            this.options.cwd,
            OUTPUT_DIRECTORY,
            output_directory,
            inflatedProject.identifiers.snake,
        );

        // Try to load up the generator from pluginDynamicImportPath, catch error
        // TODO - this final check should be abstracted into a separate function
        try {
            // const GeneratorClass = require(pluginDynamicImportPath); // eslint-disable-line import/no-dynamic-require
            const generatorPrototype = require(pluginDynamicImportPath); // eslint-disable-line import/no-dynamic-require
            const resolved = require.resolve(pluginDynamicImportPath);

            // Defines options for generator instance
            const generatorOptions: GeneratorOptions = {
                project,
                dest,
                resolved,
                meta: pluginRegistration.pluginMetadata,
                configuration: project.configuration,
                // @ts-ignore
                runtime: this, // TODO - rename to runtimeInstance?
            };

            // Logging
            // console.info(`Executing ${GeneratorClass.name} generators:`)
            console.info(`Executing generators:`);

            // Creates CodotypeGenerator instance
            // TODO - pass runtime into this constructor (in generatorOptions)
            // @ts-ignore
            const generatorInstance = new CodotypeGenerator(
                generatorPrototype,
                generatorOptions,
            );

            // Debug log statement
            console.log("Instantiated CodotypeGenerator Instance");

            // Invokes `generator.forEachSchema` once for each in inflatedProject.schemas
            await Promise.all(
                inflatedProject.schemas.map((schema) =>
                    generatorInstance.forEachSchema({
                        schema,
                        project: inflatedProject,
                    }),
                ),
            );

            // Invokes `generator.forEachRelation` once for each in inflatedProject.schemas
            await Promise.all(
                inflatedProject.schemas.map((schema) => {
                    return Promise.all(
                        schema.relations.map((relation) => {
                            return generatorInstance.forEachRelation({
                                schema: schema,
                                relation,
                                project: inflatedProject,
                            });
                        }),
                    );
                }),
            );

            // Invokes `generator.forEachReverseRelation` once for each in inflatedProject.schemas
            await Promise.all(
                inflatedProject.schemas.map((schema) => {
                    return Promise.all(
                        schema.references.map((relation) => {
                            return generatorInstance.forEachReverseRelation({
                                schema: schema,
                                relation,
                                project: inflatedProject,
                            });
                        }),
                    );
                }),
            );

            // Invokes `generator.write()` once
            await generatorInstance.write({ project: inflatedProject });

            // Invokes generator.compileTemplatesInPlace()
            await generatorInstance.compileTemplatesInPlace();

            // Logs which generator is being run
        } catch (err) {
            if (err.code === "MODULE_NOT_FOUND") {
                console.log("RUNTIME ERROR - GENERATOR NOT FOUND");
            } else {
                console.log("RUNTIME ERROR - OTHER");
                throw err;
            }
            // return reject(err)
        }

        // Thank you message
        console.log(
            "\nBuild complete\nThank you for using Codotype :)\nFollow us on github.com/codotype\n",
        );
    }

    /**
     * templatePath
     * Generates the full path to a specific template file, relative to the filepath of the generator in-which the template is compiled
     * @param {string} generatorResolved
     * @param {string} template_path
     */
    templatePath(generatorResolved: string, template_path = "./"): string {
        return path.join(generatorResolved, "templates", template_path);
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
        generatorInstance: CodotypeGenerator,
        src: string,
        options: any = {},
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            // default options padded into the renderFile
            let renderOptions = {};

            // // // //
            // // // //
            // TODO - type this object - TemplateProps interface
            // The `data` object is passed into each file that gets rendered
            // TODO - this should be abstracted into a separate function
            const data = {
                project: generatorInstance.options.project,
                meta: generatorInstance.options.meta,
                // configuration: generatorInstance.options.configuration,
                helpers: {
                    indent,
                    trailingComma,
                    // forEachSchema
                    // forEachAttribute
                    // forEachRelation
                    // forEachReverseRelation / forEachReference
                },
                RelationType,
                Datatype,
                ...options, // QUESTION - are options ever used here?
            };
            // // // //
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

    // // // //
    // // // //

    /**
     * fileExists
     * Checks to see if a file exists at the destination in the filesystem
     * @param filepath - string
     */
    fileExists(filepath: string): Promise<boolean> {
        return Promise.resolve(fsExtra.fileExists(filepath));
    }

    /**
     * compareFile
     * TODO - rename this to....?
     * @param destinationFilepath
     * @param compiledTemplate
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
                        level: RuntimeLogLevel.verbose,
                    });

                    // Rejects error
                    return reject(err);
                }

                // Logs debug statement
                this.log("writeFile: " + dest, {
                    level: RuntimeLogLevel.verbose,
                });

                // Resovles
                return resolve();
            });
        });
    }

    /**
     * copyDir
     * Copy a directory from src to dest
     * @param src
     * @param dest
     */
    async copyDir(src: any, dest: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            return fsExtra.copy(src, dest, (err: any) => {
                if (err) return reject(err);
                return resolve(true);
            });
        });
    }

    /**
     * log
     * TODO - document
     * TODO - Add `verbose` constructor option to runtime to conditionally output log statements
     * TODO - add `chalk` dependency for pretty logging
     * @param args
     */
    log(args: any, options: { level: RuntimeLogLevel }) {
        // console.log(options);
        console.log(args);
    }

    /**
     * composeWith
     * TODO - annotate, cleanup, test
     * Enables one generator to fire off several child generators
     * TODO - why doesn't this just accept the generator props?
     * @param parentGeneratorInstance
     * @param generatorModule
     * @param options
     */
    async composeWith(
        parentGeneratorInstance: CodotypeGenerator,
        generatorModule: string,
        options = {},
    ) {
        // Debug log statement
        console.log("Composing with generator");

        // Defines module path
        let modulePath: string = "";

        // // // //

        // TODO - move this into a function ( `getModulePath`, perhaps )
        // Handle relative paths
        if (
            generatorModule.startsWith("./") ||
            generatorModule.startsWith("../")
        ) {
            // TODO - document
            let base: string = "";

            // TODO - abstract into helper function?
            const stats = fsExtra.statSync(parentGeneratorInstance.resolved);

            // TODO - document
            // TODO - document
            if (stats.isDirectory()) {
                base = parentGeneratorInstance.resolved;
            } else {
                base = path.dirname(parentGeneratorInstance.resolved);
            }

            // TODO - document
            modulePath = path.join(base, generatorModule);

            // Handle absolute path
            // } else if (generatorModule.absolutePath) {
        } else if (generatorModule.startsWith("/")) {
            modulePath = path.join(generatorModule);

            // Handle module path
        } else {
            modulePath = path.join(
                parentGeneratorInstance.options.meta.engine_path,
                "node_modules",
                generatorModule,
            );
        }

        // // // //
        // // // //

        try {
            // console.log(modulePath)

            // TODO - document
            // TODO - document
            // TODO - abstract into @codotype/runtime
            const generatorPrototype = require(modulePath); // eslint-disable-line import/no-dynamic-require
            generatorPrototype.resolved = require.resolve(modulePath);

            // TODO - document
            // TODO - document
            // TODO - move into independent function, `getResolvedGeneratorPath`, perhaps
            // TODO - abstract into @codotype/runtime HELPER function
            let resolvedGeneratorPath = generatorPrototype.resolved.split("/");
            resolvedGeneratorPath.pop();
            resolvedGeneratorPath = resolvedGeneratorPath.join("/");

            // // // //
            // // // //
            // TODO - move into independent function, `resolveDestination`, perhaps
            // TODO - document
            // TODO - document
            // TODO - document
            // TODO - abstract into @codotype/runtime
            let resolvedDestination = parentGeneratorInstance.options.dest;

            // TODO - re-introduce support for options.scope
            // options.scope is super important - need it to compose packages from one generator into another
            // // @ts-ignore
            // if (options.scope) {
            //   // @ts-ignore
            //   resolvedDestination = path.resolve(
            //     parentGeneratorInstance.options.dest,
            //     options.scope
            //   );
            // }

            // // // //
            // // // //
            // TODO - add verbose logging function call here

            // console.log('\n')
            // console.log('this.options.dest')
            // console.log(this.options.dest)
            // console.log('\n')
            // console.log('RESOLVEDDESTINATION')
            // console.log(resolvedDestination)

            // // // //
            // // // //

            // Inflates project
            const inflatedProject: InflatedProject = inflateProject({
                project: parentGeneratorInstance.options.project,
            });

            // Creates new instance of generatorPrototype
            // TODO - document this a bit more
            // TODO - abstract into @codotype/runtime
            // TODO - pass in @codotype/runtime instance here
            const generator = new CodotypeGenerator(generatorPrototype, {
                ...parentGeneratorInstance.options,
                dest: resolvedDestination,
                resolved: resolvedGeneratorPath,
            });

            // Invokes `generator.forEachSchema` once for each in project.schemas
            // TODO - abstract into @codotype/runtime
            await Promise.all(
                inflatedProject.schemas.map((schema: InflatedSchema) =>
                    generator.forEachSchema({
                        schema: schema,
                        project: inflatedProject,
                    }),
                ),
            );

            // Invokes `generator.forEachRelation` once for each in project.schemas
            await Promise.all(
                inflatedProject.schemas.map((schema: InflatedSchema) => {
                    return Promise.all(
                        schema.relations.map((relation) => {
                            return generator.forEachRelation({
                                relation,
                                schema: schema,
                                project: inflatedProject,
                            });
                        }),
                    );
                }),
            );

            // Invokes `generator.forEachReverseRelation` once for each in project.schemas
            // NOTE - this is currently commented out B.C. the updated Schema interface doesn't have a property for `reverse_relations`
            // TODO - the `reverse_relations` property should be added by the inflateMeta function
            await Promise.all(
                inflatedProject.schemas.map((schema: InflatedSchema) => {
                    return Promise.all(
                        schema.references.map((relation) => {
                            return generator.forEachReverseRelation({
                                relation,
                                schema: schema,
                                project: inflatedProject,
                            });
                        }),
                    );
                }),
            );

            // Invokes `generator.write()` once
            // TODO - abstract into @codotype/runtime
            // @ts-ignore
            await generator.write(parentGeneratorInstance.options);

            // Invokes generator.compileTemplatesInPlace()
            // TODO - abstract into @codotype/runtime
            await generator.compileTemplatesInPlace();

            // Logs output
            // TODO - add --verbose flag to conditionally print this output
            // TODO - all logging should take place in @codotype/runtime
            console.log(`Generated ${generatorPrototype.name}.\n`);

            // Logs which generator is being run
        } catch (err) {
            if (err.code === "MODULE_NOT_FOUND") {
                console.log("MODULE NOT FOUND");
            } else {
                console.log("OTHER ERROR");
                console.log(err);
                throw err;
            }
        }
    }
}
