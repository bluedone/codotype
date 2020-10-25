import {
    RelationReference,
    InflatedProject,
    InflatedSchema,
    Project,
    GeneratorMeta,
} from "@codotype/core";

// // // //

export enum RuntimeLogLevel {
    debug = "debug",
    error = "error",
    info = "info",
    success = "success",
    verbose = "verbose",
    warning = "warning",
}

export enum RuntimeErrorCodes {
    MODULE_NOT_FOUND = "MODULE_NOT_FOUND",
}

export interface PluginMetadata extends GeneratorMeta {}

/**
 * ProjectBuild
 * Encapsulates the data required to build a single Project
 * TODO - add timestamps here?
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
// Generator function type aliases
// TODO - move most of this into `@codotype/core`

type WriteFileFunction = (
    destinationPath: string,
    compiledTemplate: string,
) => Promise<boolean>;

type RenderComponentFunction = (params: {
    src: string;
    dest: string;
    data: { [key: string]: any };
}) => Promise<boolean>;

type WriteFunction = (params: {
    project: InflatedProject;
    runtime: RuntimeProxy;
}) => Promise<void>;

type ForEachSchemaFunction = (params: {
    schema: InflatedSchema;
    project: InflatedProject;
    runtime: RuntimeProxy;
}) => Promise<void>;

type ForEachRelationFunction = (params: {
    schema: InflatedSchema;
    relation: RelationReference;
    project: InflatedProject;
    runtime: RuntimeProxy;
}) => Promise<void>;

type ForEachReverseRelationFunction = (params: {
    schema: InflatedSchema; // TODO - rename `Schema` to `SchemaInput`, `InflatedSchema` to `Schema`
    relation: RelationReference;
    project: InflatedProject;
    runtime: RuntimeProxy;
}) => Promise<void>;

// TODO - move this into @codotype/types
// TODO - add type aliases for these functions since their APIs don't change between (runtime -> runtime injector -> generator) layers
export interface CodotypeRuntime {
    templatePath: (resolvedPath: string, templatePath: string) => string;
    ensureDir: (dirPath: string) => Promise<boolean>;
    copyDir: (dirPath: string, destinationDirPath: string) => Promise<boolean>;
    renderTemplate: (
        generatorInstance: RuntimeAdaptor,
        src: string,
        options: any,
    ) => Promise<string>;
    fileExists: (filepath: string) => Promise<boolean>;
    compareFile: (
        destinationPath: string,
        compiledTemplate: string,
    ) => Promise<boolean>;
    writeFile: WriteFileFunction;
    destinationPath: (destination: string, filename: string) => string;
    composeWith: (generator: any, generatorModule: any, options: any) => any; // wtf is generatorModule
    log: (message: any, options: { level: RuntimeLogLevel }) => void;
    registerPlugin: (props: {
        modulePath?: string;
        relativePath?: string;
        absolutePath?: string;
    }) => Promise<PluginRegistration | null>;
    execute: (props: { build: ProjectBuild }) => Promise<void>;
}

// TODO - rename this? GeneratorProperties? GeneratorParameters?
export interface GeneratorConfiguration {
    name: string;
    compileInPlace?: any;
    write: WriteFunction;
    forEachRelation?: ForEachRelationFunction;
    forEachReverseRelation?: ForEachReverseRelationFunction;
    forEachSchema?: ForEachSchemaFunction;
}

// CONTEXT - these are passed into the "CodotypeGeneratorRunner" component
// WHAT DO THEY DO - provide runtime + plugin + project + filepath + destination
export interface RuntimeInjectorProps {
    resolved: string; // What's this?
    project: InflatedProject; // TODO - rename `InflatedProject` to `Project`, rename `Project` to `ProjectInput`
    dest: string; // What's this?
    plugin: PluginMetadata;
    runtime: CodotypeRuntime;
}

// // // //

// TODO - rename this to
// - GeneratorAgent?
// - GeneratorInitiator?
// - GeneratorInvoker? -> It ALSO exposes a RuntimeAdaptor
// - GeneratorLauncher?
// - GeneratorLoader?
// - GeneratorRunner?
// - GeneratorStarter?
// - GeneratorWrapper?
// - RuntimeAdaptorInjector?
// - RuntimeAgent?
// - RuntimeBroker?
// - RuntimeConnector?
// - RuntimeDelegate?
// - RuntimeInjector?
// - RuntimeInvoker?
// - RuntimeMediator?
export interface RuntimeAdaptor {
    runtimeProxy: RuntimeProxy;
    options: RuntimeInjectorProps;
    write: WriteFunction;
    forEachSchema: ForEachSchemaFunction;
    forEachRelation: ForEachRelationFunction;
    forEachReverseRelation: ForEachReverseRelationFunction;
    ensureDir: (dir: string) => Promise<boolean>;
    writeFile: WriteFileFunction;
    copyDir: ({ src, dest }: { src: string; dest: string }) => Promise<boolean>;
    compileTemplatesInPlace: () => Promise<Array<unknown>>;
    renderComponent: RenderComponentFunction;
    copyTemplate: (src: string, dest: string, options: object) => Promise<any>;
    templatePath: (template_path: string) => string;
    destinationPath: (destination_path: string) => string;
    composeWith: (generatorModule: string, options?: any) => Promise<any>;
}

// // // //

// Defines slimmed-down Runtime passed into each generator, fascade/proxy
export interface RuntimeProxy {
    ensureDir: (dir: string) => Promise<boolean>;
    writeFile: WriteFileFunction;
    copyDir: ({ src, dest }: { src: string; dest: string }) => Promise<boolean>;
    renderComponent: RenderComponentFunction;
    copyTemplate: (src: string, dest: string, options: object) => Promise<any>;
    templatePath: (template_path: string) => string;
    destinationPath: (destination_path: string) => string;
    composeWith: (generatorModule: string, options?: any) => Promise<any>;
}
