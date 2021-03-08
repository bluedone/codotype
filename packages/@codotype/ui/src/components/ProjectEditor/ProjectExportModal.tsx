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
            <div className="p-5">
                <h3 className="text-2xl select-none">Export Project</h3>

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
            </div>

            <div className="modal-footer-tw">
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        downloadProject(projectInput);
                        onHide();
                    }}
                >
                    Export Project
                    </button>

                <button
                    className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => onHide()}
                >
                    Cancel
                    </button>
            </div>
        </Modal>
    );
}
