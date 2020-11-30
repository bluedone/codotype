import { PluginMetadata } from "./plugin";
import { Project } from "./project";
import { RuntimeProxy } from "./runtime-proxy";
import {
    WriteFileFunction,
    RenderTemplateFunction,
    WriteFunction,
    ForEachSchemaFunction,
    ForEachRelationFunction,
    ForEachReferencedByFunction,
    ComposeWithFunction,
    EnsureDirFunction,
    CopyDirFunction,
} from "./runtime-methods";
import { Runtime } from "./runtime";

// // // //

/**
 * RuntimeAdapter
 * TODO - rename some of these functions
 * Used to create an interface between a Generator and Runtime configured to work around that Generator's module location on the file system
 * This layer of abstraction allows easy-to-use relative path declarations for source templates + file destinations,
 * without the burden of needing to pass around references to the current directory in the Generator definitions
 */
export interface RuntimeAdapter {
    // RuntimeAdaptorProps
    props: RuntimeAdapterProps;
    // RuntimeProxy state
    runtimeProxy: RuntimeProxy;
    // RuntimeProxy Methods
    ensureDir: EnsureDirFunction;
    writeFile: WriteFileFunction;
    copyDir: CopyDirFunction;
    renderTemplate: RenderTemplateFunction;
    composeWith: ComposeWithFunction;
    // Generator props methods
    write: WriteFunction;
    forEachSchema: ForEachSchemaFunction;
    forEachRelation: ForEachRelationFunction;
    forEachReferencedBy: ForEachReferencedByFunction;
    compileTemplatesInPlace: () => Promise<Array<unknown>>;
}

// TODO - RENAME THIS
// CONTEXT - these are passed into the "CodotypeGeneratorRunner" component
// WHAT DO THEY DO - provide runtime + plugin + project + filepath + destination TO the RuntimeAdaptor
export interface RuntimeAdapterProps {
    project: Project;
    runtime: Runtime;
    plugin: PluginMetadata;
    destinationPath: string;
    generatorResolvedPath: string;
}
