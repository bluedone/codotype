import * as React from "react";
import { ConfigurationGroupSelector } from "./ConfigurationGroupSelector";
import { ProjectEditorHeader } from "./ProjectEditorHeader";
import { PluginMetadata, ProjectInput } from "@codotype/core";

// // // //

interface ProjectEditorProps {
    generator: PluginMetadata;
    projectInput: ProjectInput;
    onChange: (updatedProject: ProjectInput) => void;
    onClickGenerate: () => void;
    onResetProject: () => void;
    // enableImport?: boolean;
    // enableExport?: boolean;
}

export function ProjectEditor(props: ProjectEditorProps) {
    const { generator, projectInput } = props;
    return (
        <div className="row">
            <div className="col-sm-12">
                {/* Render ProjectEditorHeader */}
                <ProjectEditorHeader
                    PluginMetadata={generator}
                    projectInput={projectInput}
                    onChange={props.onChange}
                    onClickGenerate={props.onClickGenerate}
                    onConfirmReset={props.onResetProject}
                />

                <div className="col-lg-12">
                    <hr />
                </div>

                {/* Render ConfigurationGroupSelector */}
                <ConfigurationGroupSelector
                    projectInput={projectInput}
                    pluginMetadata={generator}
                    onChange={(updatedProject: ProjectInput) => {
                        // Invokes props.onChange with the updated project
                        console.log("UPDATED PROJECT");

                        props.onChange(updatedProject);
                    }}
                />
            </div>
        </div>
    );
}
