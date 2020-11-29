import { PluginMetadata } from "./plugin";
import { Project } from "./project";
import { RuntimeProxy } from "./runtime-proxy";
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
} from "./runtime-methods";
import { Runtime } from "./runtime";

// // // //
// TODO - finalize separation between Runtime + RuntimeAdapter + RuntimeProxy

/**
 * RuntimeAdapter
 * TODO - annotate this
 * TODO - rename some of these functions
 * RuntimeProxyAdapter -> what is this implementation in @codotype/runtime package?
 */
export interface RuntimeAdapter {
    // RuntimeAdaptorProps
    options: RuntimeAdapterProps; // TODO - rename as "props"
    // RuntimeProxy state
    runtimeProxy: RuntimeProxy;
    // RuntimeProxy Methods
    ensureDir: EnsureDirFunction;
    writeFile: WriteFileFunction;
    copyDir: CopyDirFunction;
    renderComponent: RenderComponentFunction;
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
// WHAT DO THEY DO - provide runtime + plugin + project + filepath + destination

export interface RuntimeAdapterProps {
    generatorResolvedPath: string; // What's this?
    project: Project;
    dest: string; // What's this?
    plugin: PluginMetadata;
    runtime: Runtime;
}
