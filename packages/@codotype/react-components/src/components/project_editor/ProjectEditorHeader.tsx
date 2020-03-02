import * as React from "react";
import { GenerateCodeButton } from "./GenerateCodeButton";
import { ProjectEditButton } from "./ProjectEditButton";
import { Project, GeneratorMeta } from "./component";

// // // //

export function ProjectEditorHeader(props: {
    generatorMeta: GeneratorMeta;
    project: Project;
    onChange: (updatedProject: Project) => void;
    onClickGenerate: () => void;
}) {
    return (
        <div className="row d-flex align-items-center">
            <div className="col-lg-6">
                <span className="d-flex align-items-center">
                    <h4 className="mb-0 mr-2 d-flex">{props.project.label}</h4>
                    <ProjectEditButton />
                    {/* <EditProjectModal /> */}
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
