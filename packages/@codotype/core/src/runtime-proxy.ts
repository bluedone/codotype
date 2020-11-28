import {
    EnsureDirFunction,
    WriteFileFunction,
    CopyDirFunction,
    RenderComponentFunction,
    ComposeWithFunction,
} from "./runtime-methods";

/**
 * RuntimeProxy
 * TODO - rename this to runtime adaptor?
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
