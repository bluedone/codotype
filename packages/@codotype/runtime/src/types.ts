import { Runtime, Project, PluginMetadata } from "@codotype/core";

// // // //

// CONTEXT - these are passed into the "CodotypeGeneratorRunner" component
// WHAT DO THEY DO - provide runtime + plugin + project + filepath + destination
export interface RuntimeInjectorProps {
    resolved: string; // What's this?
    project: Project;
    dest: string; // What's this?
    plugin: PluginMetadata;
    runtime: Runtime;
}
