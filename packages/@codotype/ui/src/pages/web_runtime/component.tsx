import * as React from "react";
import { PluginMetadata, ProjectInput } from "@codotype/core";
import { LocalStorageProvider } from "./LocalStorageProvider";

// // // //

interface WebRuntimeProps {
    generator: PluginMetadata;
    children: (childProps: {
        generator: PluginMetadata;
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
        <LocalStorageProvider plugin={props.generator}>
            {({ projectInput, setProject, clearProject }) => (
                <React.Fragment>
                    {props.children({
                        generator: props.generator,
                        projectInput,
                        setProject,
                        clearProject,
                    })}
                </React.Fragment>
            )}
        </LocalStorageProvider>
    );
}
