import * as React from "react";
import { ConfigurationGroupSelector } from "./ConfigurationGroupSelector";
import { ProjectEditorHeader } from "./ProjectEditorHeader";
import { GeneratorMeta, Project } from "@codotype/core";

// // // //

interface ProjectEditorProps {
    generator: GeneratorMeta;
    project: Project;
    onChange: (updatedProject: Project) => void;
    onClickGenerate: () => void;
    onResetProject: () => void;
    // enableImport?: boolean;
    // enableExport?: boolean;
}

export function ProjectEditor(props: ProjectEditorProps) {
    const { generator, project } = props;
    return (
        // <div className="card card-body shadow-sm">
        <div className="row">
            <div className="col-sm-12">
                {/* Render ProjectEditorHeader */}
                <ProjectEditorHeader
                    generatorMeta={generator}
                    project={project}
                    onChange={props.onChange}
                    onClickGenerate={props.onClickGenerate}
                    onConfirmReset={props.onResetProject}
                />

                <div className="col-lg-12">
                    <hr />
                </div>

                {/* Render ConfigurationGroupSelector */}
                <ConfigurationGroupSelector
                    project={project}
                    generatorMeta={generator}
                    onChange={(updatedProject: Project) => {
                        // Invokes props.onChange with the updated project
                        console.log("UPDATED PROJECT");

                        props.onChange(updatedProject);
                    }}
                />
            </div>
        </div>
        // </div>
    );
}
