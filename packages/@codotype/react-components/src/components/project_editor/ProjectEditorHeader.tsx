import * as React from "react";
import { GenerateCodeButton } from "./GenerateCodeButton";
import { ProjectEditButton } from "./ProjectEditButton";
import { ProjectFormModal } from "./ProjectFormModal";
import { ProjectForm } from "./ProjectForm";
import { sanitizeLabel, makeIdentifier } from "@codotype/util";
import { Project, GeneratorMeta } from "../types";
import { ResetProjectButton } from "./ResetProjectButton";

// // // //

export function ProjectEditorHeader(props: {
    generatorMeta: GeneratorMeta;
    project: Project;
    onChange: (updatedProject: Project) => void;
    onClickGenerate: () => void;
    onConfirmReset: () => void;
}) {
    const [showingModal, showModal] = React.useState<boolean>(false);
    const [labelValue, setLabelValue] = React.useState<string>(
        props.project.label,
    );
    return (
        <div className="row d-flex align-items-center">
            <div className="col-lg-6">
                <span className="d-flex align-items-center">
                    <h4 className="mb-0 mr-2 d-flex">{props.project.label}</h4>
                    <ProjectEditButton onClick={() => showModal(true)} />
                    <ProjectFormModal
                        show={showingModal}
                        handleClose={() => {
                            setLabelValue(props.project.label);
                            showModal(false);
                        }}
                        onSubmit={() => {
                            const sanitizedLabel: string = sanitizeLabel(
                                labelValue,
                            );
                            props.onChange({
                                ...props.project,
                                label: sanitizedLabel,
                                // identifier: makeIdentifier(sanitizedLabel),
                            });
                            showModal(false);
                        }}
                    >
                        <ProjectForm
                            value={labelValue}
                            onChange={(updatedLabel: string) => {
                                const sanitizedLabel: string = sanitizeLabel(
                                    updatedLabel,
                                );
                                setLabelValue(sanitizedLabel);
                            }}
                        />
                    </ProjectFormModal>
                </span>
            </div>
            <div className="col-lg-6 d-flex justify-content-end">
                {/* <HelpButton /> */}
                {/* <TourButton /> */}
                {/* <ProjectDropdown /> */}
                <ResetProjectButton onConfirmReset={props.onConfirmReset} />
                <GenerateCodeButton onClick={props.onClickGenerate} />
                {/* <ImportModal /> */}
                {/* <ExportModal /> */}
            </div>
            <div className="col-lg-12">
                <hr />
            </div>
        </div>
    );
}
