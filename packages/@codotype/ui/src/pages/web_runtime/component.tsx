import * as React from "react";
import { PluginMetadata, Project } from "@codotype/core";
import { LocalStorageProvider } from "./LocalStorageProvider";

// // // //

interface WebRuntimeProps {
    generator: PluginMetadata;
    children: (childProps: {
        generator: PluginMetadata;
        project: Project;
        setProject: (updatedProject: Project) => void;
        clearProject: () => void;
    }) => React.ReactNode;
}

/**
 * WebRuntime
 * Sets up <LocalStorageProvider /> and sends to props.children
 * @param props - see `WebRuntimeProps`
 */
export function WebRuntime(props: WebRuntimeProps) {
    return (
        <LocalStorageProvider generator={props.generator}>
            {({ project, setProject, clearProject }) => (
                <React.Fragment>
                    {props.children({
                        generator: props.generator,
                        project,
                        setProject,
                        clearProject,
                    })}
                </React.Fragment>
            )}
        </LocalStorageProvider>
    );
}
