import {
    RelationReference,
    InflatedProject,
    InflatedSchema,
    Project,
    GeneratorMeta,
    indent,
    trailingComma,
    Datatype,
    RelationType,
} from "@codotype/core";

// // // //
// Constants

export const OUTPUT_DIRECTORY: string = ".codotype-out";
export const CODOTYPE_MANIFEST_DIRECTORY: string = ".codotype";
export const MODULES_ROOT: string = "node_modules";
export const GENERATOR_META_FILENAME: string = "generator/meta.js";
export const PLUGIN_DISTRIBUTABLE_DIR: string = "generator"; // TODO - change value to "dist", move into @codotype/core

// // // //

export enum RuntimeLogLevel {
    verbose = "verbose",
}

export enum RuntimeErrorCodes {
    MODULE_NOT_FOUND = "MODULE_NOT_FOUND",
}

export interface PluginMetadata extends GeneratorMeta {}

/**
 * ProjectBuild
 * Encapsulates the data required to build a single Project
 * TODO - add timestamps here
 */
export interface ProjectBuild {
    id: string;
    project: Project;
}

// TODO - add option for LOG_LEVEL
// TODO - add option for FORCE (overwrite existing files, or prompt user to overwrite if changes are detected)
export interface CodotypeRuntimeConstructorOptions {
    cwd: string;
    logLevel: RuntimeLogLevel;
}

export interface PluginRegistration {
    // QUESTION - should this be the generic that's passed in?
    id: string;
    pluginPath: string;
    pluginDynamicImportPath: string;
    pluginMetadata: PluginMetadata;
}

// // // //
// // // //
// // // //

// TODO - move this into @codotype/runtime - or @codotype/types?
export interface CodotypeRuntime {
    templatePath: (resolvedPath: string, templatePath: string) => string;
    ensureDir: (dirPath: string) => Promise<boolean>;
    copyDir: (dirPath: string, destinationDirPath: string) => Promise<boolean>;
    renderTemplate: any;
    fileExists: (filepath: string) => Promise<boolean>;
    compareFile: (
        destinationPath: string,
        compiledTemplate: string,
    ) => Promise<boolean>;
    writeFile: (
        destinationPath: string,
        compiledTemplate: string,
    ) => Promise<boolean>;
    destinationPath: (destination: string, filename: string) => string;
    composeWith: (generator: any, generatorModule: any, options: any) => any; // wtf is generatorModule
    log: (message: any, options: { level: RuntimeLogLevel }) => void;
    prepareProjectBuildDestination: (params: {
        build: ProjectBuild;
    }) => Promise<void>;
    registerPlugin: (props: {
        modulePath?: string;
        relativePath?: string;
        absolutePath?: string;
    }) => Promise<PluginRegistration>;
    execute: (props: { build: ProjectBuild }) => Promise<void>;
}

export interface GeneratorOptions {
    [key: string]: any;
    // runtime: CodotypeRuntime | MockRuntime;
    runtime: CodotypeRuntime; // TODO - ensure this can accept runtime + mock runtime
    resolved: string;
}

// TODO - add correct type signatures for these functions
export interface ConstructorOptions {
    name?: string;
    compileInPlace?: any;
    write?: (writeProps: { project: InflatedProject }) => Promise<void>;
    forEachRelation?: (params: {
        schema: InflatedSchema;
        relation: RelationReference;
        project: InflatedProject;
    }) => Promise<void>;
    forEachReverseRelation?: (params: {
        schema: InflatedSchema;
        relation: RelationReference;
        project: InflatedProject;
    }) => Promise<void>;
    forEachSchema?: (params: {
        schema: InflatedSchema;
        project: InflatedProject;
    }) => Promise<void>;
}

// // // //
// // // //

/**
 * CodotypeGenerator
 * Encapsulates core features exposed to user-defined components
 */
export class CodotypeGenerator {
    runtime: CodotypeRuntime;
    compileInPlace: any;
    options: GeneratorOptions;
    resolved: string;

    /**
     * constructor
     * Handles build options
     */
    constructor(
        constructorOptions: ConstructorOptions,
        options: GeneratorOptions,
    ) {
        // Throw error if options.runtime isn't defined
        if (!options.runtime) {
            throw Error("CodotypeGenerator options requires options.runtime");
            return;
        }

        // Throw error if options.resolved isn't defined
        if (!options.resolved) {
            throw Error("CodotypeGenerator options requires options.resolved");
        }

        // Validates constructorOptions
        if (
            !constructorOptions.write &&
            !constructorOptions.compileInPlace &&
            !constructorOptions.forEachSchema &&
            !constructorOptions.forEachRelation &&
            !constructorOptions.forEachReverseRelation
        ) {
            throw Error(
                "CodotypeGenerator constructorOptions requires either write, forEachSchema, forEachRelation, forEachReverseRelation, or compileInPlace properties",
            );
        }

        // Assigns this.runtime
        // this.runtime must be a compatible CodotypeRuntime class instance
        this.runtime = options.runtime;

        // Assigns constructorOptions
        this.write = constructorOptions.write || this.write;
        this.forEachSchema =
            constructorOptions.forEachSchema || this.forEachSchema;
        this.forEachRelation =
            constructorOptions.forEachRelation || this.forEachRelation;
        this.forEachReverseRelation =
            constructorOptions.forEachReverseRelation ||
            this.forEachReverseRelation;
        this.compileInPlace = constructorOptions.compileInPlace || [];

        // Assigns this.options
        this.options = options;

        // PASS this.options.resolved in from @codotype/runtime
        this.resolved = this.options.resolved;

        // Returns the instance
        return this;
    }

    /**
     * write
     * Method to write files to the filesystem
     */
    async write({ project }: { project: InflatedProject }): Promise<void> {
        // Display warning if generator doesn't implement its own write method?
        // console.warn(
        //   "NOTHING TO WRITE - this should be overwritten by a subclassed generator."
        // );
        return Promise.resolve();
    }

    /**
     * forEachSchema
     * Method to write files to the filesystem for each schema in blueprints.schemas
     * @param - see `WriteFunctionProps`
     */
    async forEachSchema({
        schema,
        project,
    }: {
        schema: InflatedSchema;
        project: InflatedProject;
    }): Promise<void> {
        // console.log('NOTHING TO WRITE - this should be overwritten by a subclassed generator.')
        return Promise.resolve();
    }

    /**
     * forEachRelation
     * @param - see `WriteFunctionProps`
     */
    async forEachRelation({
        schema,
        relation,
        project,
    }: {
        schema: InflatedSchema;
        relation: RelationReference;
        project: InflatedProject;
    }): Promise<void> {
        // console.log('NOTHING TO WRITE - this should be overwritten by a subclassed generator.')
        return Promise.resolve();
    }

    /**
     * forEachReverseRelation
     * TODO - rename this function to forEachRelationReference
     * @param - see `WriteFunctionProps`
     */
    async forEachReverseRelation({
        schema,
        relation,
        project,
    }: {
        schema: InflatedSchema;
        relation: RelationReference;
        project: InflatedProject;
    }): Promise<void> {
        // console.log('NOTHING TO WRITE - this should be overwritten by a subclassed generator.')
        return Promise.resolve();
    }

    // ensureDir
    // Ensures presence of directory for template compilation
    ensureDir(dir: string) {
        return this.runtime.ensureDir(this.destinationPath(dir));
    }

    /**
     * copDir
     * copy a directory from src to dest'copy a directory from src to dest
     * @param param0
     */
    copyDir({ src, dest }: { src: string; dest: string }) {
        return this.runtime.copyDir(
            this.templatePath(src),
            this.destinationPath(dest),
        );
    }

    /**
     * compileTemplatesInPlace
     * Compiles and writes each template defined in the `compileInPlace` property
     */
    compileTemplatesInPlace() {
        // For each inPlaceTemplate, compile and write
        return Promise.all(
            this.compileInPlace.map((template: string) => {
                return this.copyTemplate(
                    this.templatePath(template),
                    this.destinationPath(template),
                );
            }),
        );
    }

    /**
     * renderComponent
     * Compiles and writes each template defined in the `compileInPlace` property
     * @param - TODO
     */
    renderComponent({
        src,
        dest,
        data = {},
    }: {
        src: string;
        dest: string;
        data: { [key: string]: any };
    }) {
        return this.copyTemplate(
            this.templatePath(src),
            this.destinationPath(dest),
            data,
        );
    }

    /**
     * copyTemplate
     * Compiles a template and writes to the dest location
     * TODO - split this up to rely on runtime methods instead of referencing FS directly
     * @param src
     * @param dest
     * @param options
     */
    copyTemplate(
        src: string,
        dest: string,
        options: object = {},
    ): Promise<any> {
        // DEBUG
        // console.log('Copying:' + dest)

        return new Promise(async (resolve, reject) => {
            // DEBUG
            // this.runtime.log('Rendering:' + dest)

            // Compiles the template through CodotypeRuntime.renderTemplate
            const compiledTemplate: string = await this.runtime.renderTemplate(
                this,
                src,
                options,
            );

            // DEBUG
            // this.runtime.log('Rendered:' + dest)

            // TODO - DOCUMENT!!!
            // Does the destination already exist?
            const exists = this.runtime.fileExists(dest);

            // TODO - DOCUMENT!!!
            // If it doesn't exist, OKAY TO WRITE
            if (exists) {
                if (this.runtime.compareFile(dest, compiledTemplate)) {
                    return resolve();
                } else {
                    // TODO - this needs a GitHub issue
                    // If exists, and it's different, WRITE (add PROMPT option later, for safety)
                    // TODO - this should happen inside the runtime, as input checking will vary depending on environment
                }
            }

            // Writes the compiled template to the dest location
            this.runtime.writeFile(dest, compiledTemplate).then(() => {
                return resolve();
            });
        });
    }

    /**
     * templatePath
     * Generates the full path to a specific template in the `./templates` directory relative to the generator
     * @param {string} template_path
     */
    templatePath(template_path: string = "./") {
        return this.runtime.templatePath(this.resolved, template_path);
    }

    /**
     * destinationPath
     * Gets the full destination path from the CodotypeRuntime
     * @param destination_path
     */
    destinationPath(destination_path: string = "./") {
        return this.runtime.destinationPath(
            this.options.dest,
            destination_path,
        );
    }

    /**
     * composeWith
     * Enables one generator to fire off several child generators
     * @param generatorModule
     * @param options
     */
    composeWith(generatorModule: string, options?: any) {
        return this.runtime.composeWith(this, generatorModule, options);
    }
}

// // // //
// // // //

// // Defines typed generator constant
export const generator: ConstructorOptions = {
    name: "Fullstack TypeScript Generator",
    async write(this: CodotypeGenerator) {
        await this.composeWith("./base");
        await this.composeWith("./rest-api");
        await this.composeWith("./react-components");
        await this.composeWith("./react-components/form");
    },
};

// // // //
// // // //

import * as path from "path";
import * as ejs from "ejs";

// Mock CodotypeRuntime class definition
export class MockRuntime implements CodotypeRuntime {
    options: CodotypeRuntimeConstructorOptions;
    plugins: PluginRegistration[];

    _mocks_: {
        ensuredDir: string;
        copiedDirSrc: string;
        copiedDirDest: string;
        files: { [key: string]: string };
    };

    // constructor
    // Handles options to run a single generator instance
    constructor(options: CodotypeRuntimeConstructorOptions) {
        // Assigns this.options
        this.options = options;

        // Sets default mocks
        this._mocks_ = {
            ensuredDir: "",
            copiedDirDest: "",
            copiedDirSrc: "",
            files: {},
        };

        // Assigns this.plugins
        this.plugins = [];

        // Assigns this.options.cwd
        this.options.cwd = process.cwd();

        // Returns the runtime instance
        return this;
    }

    log(msg: any, options: { level: RuntimeLogLevel }): void {
        console.log(msg);
    }

    prepareProjectBuildDestination(): Promise<void> {
        return Promise.resolve();
    }

    registerPlugin(pluginRegistration): Promise<PluginRegistration> {
        return Promise.resolve(this.plugins[0]);
    }
    execute(): Promise<void> {
        return Promise.resolve();
    }

    // ensureDir
    // Ensures presence of directory for template compilation
    // TODO - this is repeated in @codotype/generator - should be abstracted, or only encapsulated in the runtime
    async ensureDir(dir): Promise<boolean> {
        this._mocks_.ensuredDir = dir;
        return new Promise((resolve, reject) => {
            return resolve(true);
        });
    }

    // templatePath
    templatePath(generatorResolved, template_path = "./") {
        // return path.join(generatorResolved, "templates", template_path);
        return path.join(generatorResolved, "templates", template_path);
    }

    // destinationPath
    destinationPath(destPath, dest = "./") {
        return path.join(destPath, dest);
    }

    // renderTemplate
    // Compiles an EJS template and returns the result
    renderTemplate(generatorInstance, src, options = {}) {
        return new Promise((resolve, reject) => {
            // default options padded into the renderFile
            let renderOptions = {};

            // // // //
            // // // //
            // TODO - document this structure
            // The `data` object is passed into each file that gets rendered
            // TODO - this should be abstracted into a separate function
            const data = {
                blueprint: generatorInstance.options.blueprint,
                meta: generatorInstance.options.meta,
                configuration: generatorInstance.options.configuration,
                helpers: {
                    // indent,
                    // trailingComma,
                },
                Datatype: Datatype,
                RelationType: RelationType,
                ...options, // QUESTION - are options ever used here?
            };
            // // // //
            // // // //

            // Compiles EJS template
            return ejs.renderFile(src, data, renderOptions, (err, str) => {
                // Handles template compilation error
                if (err) return reject(err);

                // Resolves with compiled template
                return resolve(str);
            });
        });
    }

    fileExists(dest: string): Promise<boolean> {
        // return this.fs.existsSync(dest);
        return Promise.resolve(true);
    }

    compareFile(dest, compiledTemplate): Promise<boolean> {
        return Promise.resolve(this._mocks_.files[dest] === compiledTemplate);
    }

    writeFile(dest, compiledTemplate) {
        this._mocks_ = {
            ...this._mocks_,
            files: {
                ...this._mocks_.files,
                [dest]: compiledTemplate,
            },
        };
        return Promise.resolve(true);
    }

    // copyDir
    copyDir(src: string, dest: string): Promise<boolean> {
        this._mocks_.copiedDirSrc = src;
        this._mocks_.copiedDirDest = dest;
        return new Promise((resolve, reject) => {
            return resolve(true);
        });
    }

    // composeWith
    async composeWith(parentGeneratorInstance, generatorModule, options = {}) {}
}
