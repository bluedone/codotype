import * as React from "react";
import { Modal } from "../Modal";
import { ProjectInput } from "@codotype/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
const download = require("downloadjs");

// // // //

/**
 * downloadProject
 * Donwloads the Project as a JSON file
 */
function downloadProject(projectInput: ProjectInput) {
    // Defines filename
    const filename = `codotype-project-${projectInput.identifiers.snake
        }-${Date.now()}.json`;

    // Defines JSON string
    const jsonString: string = JSON.stringify(projectInput, null, 4);

    // Downloads file
    download(jsonString, filename, "application/json");
}

// // // //

/**
 * ProjectExportModal
 * @param props.show
 * @param props.projectInput
 * @param props.onHide
 */
export function ProjectExportModal(props: {
    show: boolean,
    projectInput: ProjectInput
    onHide: () => void;
}) {
    const { show, projectInput, onHide } = props;
    return (
        <Modal show={show} onHide={() => onHide()}>
            <h3>Export Project</h3>

            <p className="form-text text-muted mb-2">
                Export a Codotype Project stored as a .JSON file
                </p>

            <small className="text-muted">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                    The exported JSON file can be re-imported into the Codotype
                    web UI, or used directly with the
                    <a
                    href="https://github.com/codotype/codotype-cli"
                    target="_blank"
                >
                    Codotype CLI
                    </a>
            </small>

            <div className="modal-footer-tw">
                <button
                    className="btn btn-lg btn-success"
                    onClick={() => {
                        downloadProject(projectInput);
                        onHide();
                    }}
                >
                    Export Project
                    </button>

                <button
                    className="btn btn-lg btn-light"
                    onClick={() => onHide()}
                >
                    Cancel
                    </button>
            </div>
        </Modal>
    );
}
