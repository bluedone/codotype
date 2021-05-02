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
        <div className="flex items-center w-full justify-end">
            <div className="flex flex-grow items-center">
                <h2 className="flex text-3xl select-none">
                    {projectInput.identifiers.title}
                </h2>

                {/* Combine these two into a single component */}
                <ProjectEditButton onClick={() => showModal(true)} />
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
                            props.onChange({
                                ...projectInput,
                                identifiers: buildTokenCasing(sanitizedLabel),
                            });
                            showModal(false);
                        }}
                    />
                </ProjectFormModal>
            </div>
            <div className="flex justify-end items-center">
                <ExampleProjectDropdown
                    plugin={pluginMetadata}
                    loadExampleProject={exampleProject => {
                        props.onChange(exampleProject);
                    }}
                />
                <ProjectDropdown
                    projectInput={projectInput}
                    onConfirmReset={props.onConfirmReset}
                />
                <GenerateCodeButton onClick={props.onClickGenerate} />
            </div>
        </div>
    );
}
