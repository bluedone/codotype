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
    const { pluginMetadata: PluginMetadata } = props;
    const [showingModal, showModal] = React.useState<boolean>(false);
    const [labelValue, setLabelValue] = React.useState<string>(
        props.projectInput.identifiers.title,
    );
    return (
        <div className="row d-flex align-items-end">
            <div className="col-sm-12 col-md-6">
                <span className="d-flex align-items-center">
                    <h2 className="mb-0 mr-2 d-flex">
                        {props.projectInput.identifiers.title}
                    </h2>
                    <ProjectEditButton onClick={() => showModal(true)} />
                    <ExampleProjectDropdown
                        plugin={PluginMetadata}
                        loadExampleProject={exampleProject => {
                            props.onChange(exampleProject);
                        }}
                    />
                    <ProjectFormModal
                        show={showingModal}
                        handleClose={() => {
                            setLabelValue(props.projectInput.identifiers.title);
                            showModal(false);
                        }}
                        onSubmit={() => {
                            const sanitizedLabel: string = sanitizeTitle(
                                labelValue,
                            );
                            props.onChange({
                                ...props.projectInput,
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
                        />
                    </ProjectFormModal>
                </span>
            </div>
            <div className="col-sm-12 col-md-6 d-flex justify-content-end mt-2 mt-md-0">
                {/* <HelpButton /> */}
                {/* <TourButton /> */}
                {/* <ImportModal /> */}
                {/* <ExportModal /> */}

                <ProjectDropdown
                    projectInput={props.projectInput}
                    onConfirmReset={props.onConfirmReset}
                />
                {/* <ResetProjectButton onConfirmReset={props.onConfirmReset} /> */}
                <GenerateCodeButton onClick={props.onClickGenerate} />
            </div>
        </div>
    );
}
