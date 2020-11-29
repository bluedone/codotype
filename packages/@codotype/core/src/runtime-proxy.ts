import {
    EnsureDirFunction,
    WriteFileFunction,
    CopyDirFunction,
    RenderComponentFunction,
    ComposeWithFunction,
} from "./runtime-methods";

// // // //

/**
 * RuntimeProxy
 * Defines slimmed-down + simplified Runtime methods to pass into functions defined on GeneratorProps
 * @param writeFile - @see WriteFileFunction
 * @param copyDir - @see CopyDirFunction
 * @param ensureDir - @see EnsureDirFunction
 * @param renderComponent - @see RenderComponentFunction
 * @param composeWith - @see ComposeWithFunction
 */

export interface RuntimeProxy {
    writeFile: WriteFileFunction;
    copyDir: CopyDirFunction;
    ensureDir: EnsureDirFunction;
    renderComponent: RenderComponentFunction;
    composeWith: ComposeWithFunction;
}
