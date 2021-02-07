import * as React from "react";
import { PluginMetadata, ProjectInput } from "@codotype/core";
import { LocalStorageProvider } from "./LocalStorageProvider";

// // // //

interface WebRuntimeProps {
    plugin: PluginMetadata;
    children: (childProps: {
        plugin: PluginMetadata;
        projectInput: ProjectInput;
        setProject: (updatedProject: ProjectInput) => void;
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
        <LocalStorageProvider plugin={props.plugin}>
            {({ projectInput, setProject, clearProject }) => (
                <React.Fragment>
                    {props.children({
                        plugin: props.plugin,
                        projectInput,
                        setProject,
                        clearProject,
                    })}
                </React.Fragment>
            )}
        </LocalStorageProvider>
    );
}
