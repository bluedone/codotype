import * as React from "react";
import { GeneratorMeta, Project } from "@codotype/core";
import { LocalStorageProvider } from "./LocalStorageProvider";

// // // //

interface WebRuntimeProps {
    generator: GeneratorMeta;
    children: (childProps: {
        generator: GeneratorMeta;
        project: Project;
        setProject: (updatedProject: Project) => void;
        clearProject: () => void;
    }) => React.ReactNode;
}

/**
 * WebRuntime
 * TODO - this component can likely be retired...? Been replaced by LocalStorageProvider
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
