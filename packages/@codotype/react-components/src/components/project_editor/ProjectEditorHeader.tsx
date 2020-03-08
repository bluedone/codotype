import * as React from "react";
import { GenerateCodeButton } from "./GenerateCodeButton";
import { ProjectEditButton } from "./ProjectEditButton";
import { ProjectFormModal } from "./ProjectFormModal";
import { Project, GeneratorMeta } from "../types";

// // // //

export function ProjectEditorHeader(props: {
    generatorMeta: GeneratorMeta;
    project: Project;
    onChange: (updatedProject: Project) => void;
    onClickGenerate: () => void;
}) {
    const [showingModal, showModal] = React.useState(false);
    return (
        <div className="row d-flex align-items-center">
            <div className="col-lg-6">
                <span className="d-flex align-items-center">
                    <h4 className="mb-0 mr-2 d-flex">{props.project.label}</h4>
                    <ProjectEditButton onClick={() => showModal(true)} />
                    <ProjectFormModal
                        show={showingModal}
                        handleClose={() => showModal(false)}
                    >
                        <p>Project Form</p>
                    </ProjectFormModal>
                    {/* <HelpPopover /> */}
                </span>
            </div>
            <div className="col-lg-6 d-flex justify-content-end">
                {/* <HelpButton /> */}
                {/* <TourButton /> */}
                {/* <ProjectDropdown /> */}
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
