import {
    RelationReference,
    InflatedProject,
    InflatedSchema,
    Project,
    GeneratorMeta,
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

// // // //
// // // //
// // // //

// TODO - move this into @codotype/runtime - or @codotype/types?
// TODO - add CodotypeRuntime constructor to @codotype/core
// Should accept `RuntimeConstructorOptions` -> return `CodotypeRuntime`
export interface CodotypeRuntime {
    templatePath: (resolvedPath: string, templatePath: string) => string;
    ensureDir: (dirPath: string) => Promise<boolean>;
    copyDir: (dirPath: string, destinationDirPath: string) => Promise<boolean>;
    renderTemplate: any;
    existsSync: (path: string) => boolean;
    compareFile: (
        destinationPath: string,
        compiledTemplate: string,
    ) => Promise<any>;
    writeFile: (
        destinationPath: string,
        compiledTemplate: string,
    ) => Promise<boolean>;
    destinationPath: (destination: string, filename: string) => string;
    composeWith: (generator: any, generatorModule: any, options: any) => any; // wtf is generatorModule
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
// // // //
// // // //
// // // //

export class RuntimeBuilder implements CodotypeRuntime {
    templatePath: (resolvedPath: string, templatePath: string) => string;
    ensureDir: (dirPath: string) => Promise<boolean>;
    copyDir: (dirPath: string, destinationDirPath: string) => Promise<boolean>;
    renderTemplate: any;
    existsSync: (path: string) => boolean;
    compareFile: (
        destinationPath: string,
        compiledTemplate: string,
    ) => Promise<any>;
    writeFile: (
        destinationPath: string,
        compiledTemplate: string,
    ) => Promise<boolean>;
    destinationPath: (destination: string, filename: string) => string;
    composeWith: (generator: any, generatorModule: any, options: any) => any; // wtf is generatorModule

    constructor(params: CodotypeRuntime) {
        this.templatePath = params.templatePath;
        this.ensureDir = params.ensureDir;
        this.copyDir = params.copyDir;
        this.renderTemplate = params.renderTemplate;
        this.existsSync = params.existsSync;
        this.compareFile = params.compareFile;
        this.writeFile = params.writeFile;
        this.destinationPath = params.destinationPath;
        this.composeWith = params.composeWith;
    }
}

// This should all be pretty managable
// TODO - make sure that `this.x` is bound to each function passed in props
// - [ ] registerPlugin: () => void; (registerPlugin) -> currently accepts strings, could be updated to accept others!
// - [ ] getPlugins() => PluginRegistration[] (EASY)
// - [ ] execute: => Promise<void> (EASY)
// - [ ] fileExists (EASY)
// - [ ] log (EASY) <------ this should NOT be implemented individually
// - [ ] prepareProjectBuildDestination() <------ this should NOT be implemented individually
// - [X] ensureDir
// - [X] templatePath
// - [X] destinationPath
// - [X] renderTemplate
// - [X] compareFile
// - [X] writeFile
// - [X] copyDir
// - [X] composeWith
