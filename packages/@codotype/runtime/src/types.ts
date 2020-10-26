import { Runtime, InflatedProject, PluginMetadata } from "@codotype/core";

// // // //

// CONTEXT - these are passed into the "CodotypeGeneratorRunner" component
// WHAT DO THEY DO - provide runtime + plugin + project + filepath + destination
export interface RuntimeInjectorProps {
    resolved: string; // What's this?
    project: InflatedProject; // TODO - rename `InflatedProject` to `Project`, rename `Project` to `ProjectInput`
    dest: string; // What's this?
    plugin: PluginMetadata;
    runtime: Runtime;
}
