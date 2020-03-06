import React, { FunctionComponent } from "react";
import "./styles.scss";
import { ConfigurationGroupSelector } from "./ConfigurationGroupSelector";
import { ProjectEditorHeader } from "./ProjectEditorHeader";
import { GeneratorMeta, Project, ProjectConfiguration } from "../types";

// // // //

interface ProjectEditorProps {
    label: string;
    generator: GeneratorMeta;
    project: Project;
    onChange: (updatedProject: Project) => void;
    onClickGenerate: () => void;
    // enableImport?: boolean;
    // enableExport?: boolean;
}

export const ProjectEditor: FunctionComponent<ProjectEditorProps> = (
    props: ProjectEditorProps,
) => {
    const { generator, project } = props;
    return (
        <div className="card card-body">
            <div className="row">
                <div className="col-sm-12">
                    {/* Render ProjectEditorHeader */}
                    <ProjectEditorHeader
                        generatorMeta={generator}
                        project={project}
                        onChange={props.onChange}
                        onClickGenerate={props.onClickGenerate}
                    />

                    {/* Render ConfigurationGroupSelector */}
                    <ConfigurationGroupSelector
                        project={project}
                        generatorMeta={generator}
                        onChange={(
                            updatedProjectConfiguration: ProjectConfiguration,
                        ) => {
                            // Defines the updated project
                            const updatedProject: Project = {
                                ...project,
                                configuration: updatedProjectConfiguration,
                            };

                            // Invokes props.onChange with the updated project
                            props.onChange(updatedProject);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
