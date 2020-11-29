import {
    EnsureDirFunction,
    WriteFileFunction,
    CopyDirFunction,
    RenderComponentFunction,
    ComposeWithFunction,
} from "./runtime-methods";

/**
 * RuntimeProxy
 * TODO - rename this to RuntimeAdaptor instead?
 * TODO - rename this to RuntimeAdaptor instead?
 * TODO - rename this to RuntimeAdaptor instead?
 * TODO - rename this to RuntimeAdaptor instead?
 * Defines slimmed-down Runtime passed into each generator, fascade/proxy
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
