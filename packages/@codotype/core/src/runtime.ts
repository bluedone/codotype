import { PluginMetadata } from "./plugin";
import { Project, ProjectInput } from "./project";
import { RuntimeProxy } from "./runtime-proxy";
import { RuntimeLogLevel } from "./runtime-log-level";
import {
    WriteFileFunction,
    RenderComponentFunction,
    WriteFunction,
    ForEachSchemaFunction,
    ForEachRelationFunction,
    ForEachReferencedByFunction,
    ComposeWithFunction,
    EnsureDirFunction,
    CopyDirFunction,
    ComposeWithOptions,
} from "./runtime-methods";
import { PrettifyOptions } from ".";

/**
 * RuntimeErrorCode
 * Used to differentiate between various errors in a CodotypeRuntime
 */
export type RuntimeErrorCode = "MODULE_NOT_FOUND" | "UNKNOWN";
export enum RuntimeErrorCodes {
    moduleNotFound = "MODULE_NOT_FOUND",
    unknown = "UNKNOWN",
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
 * @param fileSystemAdapter - The FileSystemAdaptor @see FileSystemAdapter
 */
export interface RuntimeProps {
    cwd: string;
    logLevel: RuntimeLogLevel;
    fileOverwriteBehavior: FileOverwriteBehavior;
    fileSystemAdapter: FileSystemAdapter;
}

/**
 * ProjectBuild
 * Encapsulates the data required to build a single Project
 * @param id - (optional) The UUID of the build - used to determine the output directory for a ProjectBuild (i.e. OUTPUT_DIRECTORY/ProjectBuild.id/my_project).
 *             Value of `undefined` simply sends ProjectBuild output to OUTPUT_DIRECTORY/my_project
 * @param projectInput - The ProjectInput for a specific Codotype Plugin that's available in the Runtime.
 * @param startTime - The start timestamp of the build
 * @param endTime - The end timestamp of the build
 * @param logs - any logs that we want to track
 */
export interface ProjectBuild {
    id?: string;
    projectInput: ProjectInput;
    startTime: string;
    endTime: string;
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

// // // //
// // // //
// TODO - finalize separation between Runtime + RuntimeAdapter + RuntimeProxy

/**
 * RuntimeAdapter
 * TODO - annotate this
 * TODO - rename some of these functions
 * RuntimeProxyAdapter -> what is this implementation in @codotype/runtime package?
 */
export interface RuntimeAdapter {
    runtimeProxy: RuntimeProxy;
    options: RuntimeAdapterProps;
    write: WriteFunction;
    forEachSchema: ForEachSchemaFunction;
    forEachRelation: ForEachRelationFunction;
    forEachReferencedBy: ForEachReferencedByFunction;
    ensureDir: EnsureDirFunction;
    writeFile: WriteFileFunction;
    copyDir: CopyDirFunction;
    compileTemplatesInPlace: () => Promise<Array<unknown>>;
    renderComponent: RenderComponentFunction;
    composeWith: ComposeWithFunction;
}

// TODO - RENAME THIS
// CONTEXT - these are passed into the "CodotypeGeneratorRunner" component
// WHAT DO THEY DO - provide runtime + plugin + project + filepath + destination
export interface RuntimeAdapterProps {
    generatorResolvedPath: string; // What's this?
    project: Project;
    dest: string; // What's this?
    plugin: PluginMetadata;
    runtime: Runtime;
}

// // // //
// // // //

/**
 * Runtime
 * TODO - clarify the distinction between Runtime + RuntimeProxy + RuntimeAdapter + FileSystemAdapter
 * TODO - clean this up a bit more - how many of these methods are needed / need to be exposed?
 * TODO - annotate
 * TODO - rename some of these functions
 * @function getTemplatePath Gets the path to the template, relative to the RuntimeProxyAdaptor (RENAME PENDING)
 * @function getDestinationPath Gets the path to the template, relative to the RuntimeProxyAdaptor (RENAME PENDING)
 */
export interface Runtime {
    getTemplatePath: (
        generatorResolvedPath: string,
        templateRelativePath: string,
    ) => string;
    getDestinationPath: (
        outputDirAbsolutePath: string,
        destinationRelativePath: string,
    ) => string;
    ensureDir: (dirPath: string) => Promise<boolean>;
    copyDir: CopyDirFunction;
    renderTemplate: (
        runtimeAdapter: RuntimeAdapter,
        src: string,
        data?: { [key: string]: any },
        options?: { prettify?: PrettifyOptions },
    ) => Promise<string>;
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
    //////////
    writeTemplateToFile: (
        runtimeAdapter: RuntimeAdapter,
        src: string,
        dest: string,
        data?: { [key: string]: any },
        options?: { prettify?: PrettifyOptions },
    ) => Promise<boolean>;
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
