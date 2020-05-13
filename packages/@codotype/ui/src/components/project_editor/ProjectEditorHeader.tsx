import * as React from "react";
import { GenerateCodeButton } from "./GenerateCodeButton";
import { ProjectEditButton } from "./ProjectEditButton";
import { ProjectFormModal } from "./ProjectFormModal";
import { ProjectForm } from "./ProjectForm";
import { sanitizeLabel, buildTokenCasing } from "@codotype/util";
import { Project, GeneratorMeta } from "@codotype/types";
import { ResetProjectButton } from "./ResetProjectButton";
import { ProjectDropdown } from "./ProjectDropdown";

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
        props.project.identifiers.label,
    );
    return (
        <div className="row d-flex align-items-center">
            <div className="col-lg-6">
                <span className="d-flex align-items-center">
                    <h4 className="mb-0 mr-2 d-flex">
                        {props.project.identifiers.label}
                    </h4>
                    <ProjectEditButton onClick={() => showModal(true)} />
                    <ProjectFormModal
                        show={showingModal}
                        handleClose={() => {
                            setLabelValue(props.project.identifiers.label);
                            showModal(false);
                        }}
                        onSubmit={() => {
                            const sanitizedLabel: string = sanitizeLabel(
                                labelValue,
                            );
                            props.onChange({
                                ...props.project,
                                identifiers: buildTokenCasing(sanitizedLabel),
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
                {/* <ImportModal /> */}
                {/* <ExportModal /> */}
                <ProjectDropdown onConfirmReset={props.onConfirmReset} />
                {/* <ResetProjectButton onConfirmReset={props.onConfirmReset} /> */}
                <GenerateCodeButton onClick={props.onClickGenerate} />
            </div>
            <div className="col-lg-12">
                <hr />
            </div>
        </div>
    );
}
