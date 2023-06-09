import { Relation } from "./";
import { Project } from "./project";
import { Schema } from "./schema";
import { RuntimeProxy } from "./runtime-proxy";

// // // //

/**
 * PrettifyParser
 * Defines the type of available parsers for PrettifyOptions
 */
export type PrettifyParser =
    | "babel"
    | "babel-flow"
    | "babel-ts"
    | "flow"
    | "typescript"
    | "css"
    | "less"
    | "scss"
    | "json"
    | "json5"
    | "json-stringify"
    | "graphql"
    | "markdown"
    | "vue"
    | "html"
    | "angular"
    | "mdx"
    | "yaml"
    | "lwc";
export enum PrettifyParsers {
    babel = "babel",
    babelFlow = "babel-flow",
    babelTs = "babel-ts",
    flow = "flow",
    typescript = "typescript",
    css = "css",
    less = "less",
    scss = "scss",
    json = "json",
    json5 = "json5",
    jsonStringify = "json-stringify",
    graphql = "graphql",
    markdown = "markdown",
    vue = "vue",
    html = "html",
    angular = "angular",
    mdx = "mdx",
    yaml = "yaml",
    lwc = "lwc",
}
/**
 * PrettifyOptions
 * Supported options for Prettier integration
 * Doc: https://prettier.io/docs/en/options.html
 */
export interface PrettifyOptions {
    parser: PrettifyParser;
    semi?: boolean;
    printWidth?: number;
    tabWidth?: number;
    useTabs?: boolean;
    singleQuote?: boolean;
    jsxSingleQuote?: boolean;
    trailingComma?: "es5" | "none" | "all";
    bracketSpacing?: boolean;
    arrowParens?: "always" | "avoid";
    endOfLine?: "lf" | "crlf" | "cr" | "auto";
}

// // // //
// RuntimeProxy Methods

/**
 * WriteFileFunction
 * Writes a single file to the destination directory
 */
export type WriteFileFunction = (
    destinationPath: string,
    compiledTemplate: string,
    options?: { prettify?: PrettifyOptions },
) => Promise<boolean>;

/**
 * CopyDirFunction
 * Used by the Runtime to copy a directory of files from src to dest
 */
export type CopyDirFunction = (params: {
    src: string;
    dest: string;
}) => Promise<boolean>;

/**
 * CopyFileFunction
 * Used by the runtime to copy a single file from src to dest
 * If only a string is passed, the src + dest will be the same
 */
export type CopyFileFunction = (
    params:
        | string
        | {
              src: string;
              dest: string;
          },
) => Promise<boolean>;

/**
 * EnsureDirFunction
 * Used by the Runtime to ensure the presence of a directory
 */
export type EnsureDirFunction = (dir: string) => Promise<boolean>;

/**
 * RenderTemplateFunction
 * Renders a template located at params.src, compiled it with params.data, and writes it to params.dest
 */
export type RenderTemplateFunction = (params: {
    src: string;
    dest: string;
    data?: { [key: string]: any };
    options?: { prettify?: PrettifyOptions };
}) => Promise<boolean>;

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
 * ComposeWithFunction
 * Exposed by the RuntimeProxy to allow a Generator to "compose" another generator module
 * QUESTION - should this use the modulePath / relativePath / absolutePath pattern? or should that pattern be updated?
 */
export type ComposeWithFunction = (
    generatorModule: string,
    options?: ComposeWithOptions,
) => Promise<void>;

// // // //
// RuntimeAdapter + GeneratorProps Methods

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

export type ForEachReferencedByFunction = (params: {
    schema: Schema;
    relation: Relation;
    project: Project;
    runtime: RuntimeProxy;
}) => Promise<void>;
