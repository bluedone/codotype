import { Relation } from "./";
import { PluginMetadata } from "./plugin";
import { Project, ProjectInput } from "./project";
import { Schema } from "./schema";

// // // //

/**
 * RuntimeLogLevel
 * Designates different levels of logging for a CodotypeRuntime.
 * @variation info - displays runtime status (always prints)
 * @variation warning - displays runtime warnings (always prints)
 * @variation error - displays errors (always prints)
 * @variation verbose - displays detailed play-by-play of ProjectBuild execution. Helpful when developing.
 * @variation suppress - supresses all logs
 */
export type RuntimeLogLevel =
    | "info"
    | "warning"
    | "error"
    | "verbose"
    | "suppress";
export enum RuntimeLogLevels {
    info = "info",
    warning = "warning",
    error = "error",
    verbose = "verbose",
    suppress = "suppress",
}

/**
 * RuntimeErrorCode
 * Used to differentiate between various errors in a CodotypeRuntime
 */
export type RuntimeErrorCode = "MODULE_NOT_FOUND" | "UNKNOWN";
export enum RuntimeErrorCodes {
    moduleNotFound = "MODULE_NOT_FOUND",
    unknownd = "UNKNOWN",
}

/**
 * FileOverwriteBehavior
 * Used to determine behavior when a CodotypeRuntime needs to overwrite an existing file
 * @variation force - always overwrites the existing file with the newer one. This is used most of the time.
 * @variation skip - skips the new file and keeps the old one.
 * @variation ask - asks the user if they want to keep or override the file (@codotype/cli ONLY, will block server)
 */
export type FileOverwriteBehavior = "force" | "skip" | "ask";
export enum FileOverwriteBehaviors {
    force = "force",
    skip = "skip",
    ask = "ask",
}

/**
 * RuntimeConstructorParams
 * Options accepted when constructing a new CodotypeRuntime
 * @param cwd - The absolute path representing the "current working directory" (i.e. `/path/to/dir`), usually value from `process.cwd()`.
 *              Used by the CodotypeRuntime to determine where a a ProjectBuild output should belong
 * @param logLevel - The level of logging permitted by the Runtime's `log` function. See `RuntimeLogLevel`
 * @param fileOverwriteBehavior - Sets FileOverwriteBehavior for the Runtime. @see FileOverwriteBehavior
 */
export interface RuntimeConstructorParams {
    cwd: string;
    logLevel: RuntimeLogLevel;
    fileOverwriteBehavior: FileOverwriteBehavior;
    fileSystemAdapter: FileSystemAdapter;
}

/**
 * ProjectBuild
 * Encapsulates the data required to build a single Project
 * @todo - add start/finish timestamps to ProjectBuild?
 * @param id - (optional) The UUID of the build - used to determine the output directory for a ProjectBuild (i.e. OUTPUT_DIRECTORY/ProjectBuild.id/my_project).
 *             Value of `undefined` simply sends ProjectBuild output to OUTPUT_DIRECTORY/my_project
 * @param projectInput - The ProjectInput for a specific Codotype Plugin that's available in the Runtime.
 */
export interface ProjectBuild {
    id?: string;
    projectInput: ProjectInput;
}

/**
 * PluginRegistration
 * Used by the Runtime to internally keep a record of which Plugins have been registered with the runtime
 * @param id - the ID of the Plugin (value from PluginMetadata.id)
 * @param pluginPath - the absolute path that points to the Plugin's dist/ directory
 * @param pluginDynamicImportPath - the absolute path that points to the Plugin's entry Generator
 * @param pluginMetadata - The data pulled from the Plugin's `src/meta.ts` file - @see PluginMetadata
 */
export interface PluginRegistration {
    id: string;
    pluginPath: string;
    pluginDynamicImportPath: string;
    pluginMetadata: PluginMetadata;
}

/**
 * RuntimeProxy
 * Defines slimmed-down Runtime passed into each generator, fascade/proxy
 * @param ensureDir - TODO - this should be removed from RuntimeProxy and handled automatically in Runtime
 * @param writeFile - write a string to a file in OUTPUT_DIRECTORY/my_project
 * @param copyDir - See CopyDirFunction
 * @param renderComponent - See RenderComponentFunction
 * @param composeWith - See ComposeWithFunction
 * @param templatePath - TODO - these might not need to be exposed at all
 * @param destinationPath - TODO - these might not need to be exposed at all
 */
export interface RuntimeProxy {
    ensureDir: EnsureDirFunction;
    writeFile: WriteFileFunction;
    copyDir: CopyDirFunction;
    renderComponent: RenderComponentFunction;
    copyTemplate: (src: string, dest: string, options: object) => Promise<any>;
    composeWith: ComposeWithFunction;
    templatePath: (template_path: string) => string;
    destinationPath: (destination_path: string) => string;
}

/**
 * ComposeWithOptions
 * Optional parameters accepted by RuntimeAdapter.composeWith()
 * Used when composing one generator inside another
 * @param outputDirectoryScope - dictates the output directory of the composed generator.
 *      Helpful when working with generators (i.e. located in NPM an package) that writes to the root of OUTPUT_DIRECTORY/my_project.
 *      Allows Plugin authors to render the output of another plugin in a different subdirectory.
 */
export interface ComposeWithOptions {
    outputDirectoryScope?: string;
}

/**
 * RuntimeAdapter
 * TODO - annotate this
 */
export interface RuntimeAdapter {
    runtimeProxy: RuntimeProxy;
    options: RuntimeInjectorProps;
    write: WriteFunction;
    forEachSchema: ForEachSchemaFunction;
    forEachRelation: ForEachRelationFunction;
    forEachReverseRelation: ForEachReverseRelationFunction;
    ensureDir: EnsureDirFunction;
    writeFile: WriteFileFunction;
    copyDir: CopyDirFunction;
    compileTemplatesInPlace: () => Promise<Array<unknown>>;
    renderComponent: RenderComponentFunction;
    copyTemplate: (src: string, dest: string, options: object) => Promise<any>;
    templatePath: (template_path: string) => string;
    destinationPath: (destination_path: string) => string;
    composeWith: ComposeWithFunction;
}

// CONTEXT - these are passed into the "CodotypeGeneratorRunner" component
// WHAT DO THEY DO - provide runtime + plugin + project + filepath + destination
export interface RuntimeInjectorProps {
    resolved: string; // What's this?
    project: Project;
    dest: string; // What's this?
    plugin: PluginMetadata;
    runtime: Runtime;
}

// // // //
// Runtime function types

export type WriteFileFunction = (
    destinationPath: string,
    compiledTemplate: string,
) => Promise<boolean>;

/**
 * RenderComponentFunction
 * Renders a template located at params.src, compiled it with params.data, and writes it to params.dest
 */
export type RenderComponentFunction = (params: {
    src: string;
    dest: string;
    data: { [key: string]: any };
}) => Promise<boolean>;

export type WriteFunction = (params: {
    project: Project;
    runtime: RuntimeProxy;
}) => Promise<void>;

export type ForEachSchemaFunction = (params: {
    schema: Schema;
    project: Project;
    runtime: RuntimeProxy;
}) => Promise<void>;

export type ForEachRelationFunction = (params: {
    schema: Schema;
    relation: Relation;
    project: Project;
    runtime: RuntimeProxy;
}) => Promise<void>;

export type ForEachReverseRelationFunction = (params: {
    schema: Schema;
    relation: Relation;
    project: Project;
    runtime: RuntimeProxy;
}) => Promise<void>;

/**
 * ComposeWithFunction
 * Exposed by the RuntimeProxy to allow a Generator to "compose" another generator module
 * TODO - should this use the modulePath / relativePath / absolutePath pattern? or should that pattern be updated?
 */
export type ComposeWithFunction = (
    generatorModule: string,
    options?: ComposeWithOptions,
) => Promise<void>;

/**
 * EnsureDirFunction
 * Used by the Runtime to ensure the presence of a directory
 * NOTE - we SHOULD remove this from RuntimeProxy and just have the Runtime handle this part entirely
 */
export type EnsureDirFunction = (dir: string) => Promise<boolean>;

/**
 * CopyDirFunction
 * Used by the Runtime to copy a directory of files from src to dest
 */
export type CopyDirFunction = (params: {
    src: string;
    dest: string;
}) => Promise<boolean>;

// // // //

/**
 * Runtime
 * TODO - clean this up a bit more - how many of these methods are needed / need to be exposed?
 * TODO - annotate
 */
export interface Runtime {
    templatePath: (resolvedPath: string, templatePath: string) => string;
    destinationPath: (destination: string, filename: string) => string;
    ensureDir: (dirPath: string) => Promise<boolean>;
    copyDir: CopyDirFunction;
    renderTemplate: (
        runtimeAdapter: RuntimeAdapter,
        src: string,
        options: any,
    ) => Promise<string>;
    fileExists: (filepath: string) => Promise<boolean>;
    compareFile: (
        destinationPath: string,
        compiledTemplate: string,
    ) => Promise<boolean>;
    writeFile: WriteFileFunction;
    log: (message: any, options: { level: RuntimeLogLevel }) => void;
    registerPlugin: (props: {
        modulePath?: string;
        relativePath?: string;
        absolutePath?: string;
    }) => Promise<PluginRegistration | null>;
    execute: (props: { build: ProjectBuild }) => Promise<void>;
    composeWith: (
        parentRuntimeAdapter: RuntimeAdapter,
        generatorModulePath: string,
        options: ComposeWithOptions,
    ) => Promise<void>;
}

// // // //

/**
 * FileSystemAdapter
 * Defines an interface between the Runtime and the FileSystem
 * Allows the Runtime to write Plugin output to local filesystem, in-memory cache, or alterative output destination like an S3 bucket
 */
export interface FileSystemAdapter {
    writeFile: WriteFileFunction;
    ensureDir: (dirPath: string) => Promise<boolean>;
    fileExists: (filepath: string) => Promise<boolean>;
    readFile: (filepath: string) => Promise<string | null>;
}

// // // //
// CHORE - add examples to test_data module

// const myOpts: CodotypeRuntimeConstructorOptions = {
//     cwd: "string",
//     logLevel: RuntimeLogLevels.verbose,
//     fileOverwriteBehavior: FileOverwriteBehaviors.skip,
// };

// const myOpts2: CodotypeRuntimeConstructorOptions = {
//     cwd: "string",
//     logLevel: "verbose",
//     fileOverwriteBehavior: "skip",
// };
