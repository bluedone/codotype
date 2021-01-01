import * as React from "react";
import { GenerateCodeButton } from "./GenerateCodeButton";
import { ProjectEditButton } from "./ProjectEditButton";
import { ProjectFormModal } from "./ProjectFormModal";
import { ProjectForm } from "./ProjectForm";
import {
    sanitizeTitle,
    buildTokenCasing,
    ProjectInput,
    PluginMetadata,
} from "@codotype/core";
import { ProjectDropdown } from "./ProjectDropdown";
import { ExampleProjectDropdown } from "./ExampleProjectDropdown";

// // // //

export function ProjectEditorHeader(props: {
    pluginMetadata: PluginMetadata;
    projectInput: ProjectInput;
    onChange: (updatedProject: ProjectInput) => void;
    onClickGenerate: () => void;
    onConfirmReset: () => void;
}) {
    const { pluginMetadata, projectInput } = props;
    const [showingModal, showModal] = React.useState<boolean>(false);
    const [labelValue, setLabelValue] = React.useState<string>(
        projectInput.identifiers.title,
    );
    return (
        <div className="row d-flex align-items-end">
            <div className="col-sm-12 col-md-6">
                <div className="d-flex align-items-center">
                    <h2 className="mb-0 mr-2 d-flex">
                        {projectInput.identifiers.title}
                    </h2>
                    <ProjectEditButton onClick={() => showModal(true)} />
                    <ExampleProjectDropdown
                        plugin={pluginMetadata}
                        loadExampleProject={exampleProject => {
                            props.onChange(exampleProject);
                        }}
                    />
                    <ProjectFormModal
                        show={showingModal}
                        handleClose={() => {
                            setLabelValue(projectInput.identifiers.title);
                            showModal(false);
                        }}
                        disabled={labelValue.trim().length === 0}
                        onSubmit={() => {
                            const sanitizedLabel: string = sanitizeTitle(
                                labelValue,
                            );
                            props.onChange({
                                ...projectInput,
                                identifiers: buildTokenCasing(sanitizedLabel),
                            });
                            showModal(false);
                        }}
                    >
                        <ProjectForm
                            value={labelValue}
                            onChange={(updatedLabel: string) => {
                                const sanitizedLabel: string = sanitizeTitle(
                                    updatedLabel,
                                );
                                setLabelValue(sanitizedLabel);
                            }}
                            onSubmit={updatedLabel => {
                                const sanitizedLabel: string = sanitizeTitle(
                                    updatedLabel,
                                );
                                if (sanitizedLabel.length === 0) {
                                    return;
                                }
                                setLabelValue(sanitizedLabel);
                            }}
                        />
                    </ProjectFormModal>
                </div>
            </div>
            <div className="col-sm-12 col-md-6 d-flex justify-content-end mt-2 mt-md-0">
                <ProjectDropdown
                    projectInput={projectInput}
                    onConfirmReset={props.onConfirmReset}
                />
                <GenerateCodeButton onClick={props.onClickGenerate} />
            </div>
        </div>
    );
}
