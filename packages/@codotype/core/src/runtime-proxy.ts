import {
    EnsureDirFunction,
    WriteFileFunction,
    CopyDirFunction,
    CopyFileFunction,
    RenderTemplateFunction,
    ComposeWithFunction,
} from "./runtime-methods";

// // // //

/**
 * RuntimeProxy
 * Defines slimmed-down + simplified Runtime methods to pass into functions defined on GeneratorProps
 * @param writeFile - @see WriteFileFunction
 * @param copyDir - @see CopyDirFunction
 * @param copyFile - @see CopyFileFunction
 * @param ensureDir - @see EnsureDirFunction
 * @param renderTemplate - @see RenderTemplateFunction
 * @param composeWith - @see ComposeWithFunction
 */

export interface RuntimeProxy {
    writeFile: WriteFileFunction;
    copyDir: CopyDirFunction;
    copyFile: CopyFileFunction;
    ensureDir: EnsureDirFunction;
    renderTemplate: RenderTemplateFunction;
    composeWith: ComposeWithFunction;
}
