import * as React from "react";
import { Modal } from "react-bootstrap";
import { Project } from "@codotype/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
const download = require("downloadjs");

// // // //

/**
 * downloadProject
 * Donwloads the Project as a JSON file
 */
function downloadProject(project: Project) {
    // Defines filename
    const filename = `codotype-project-${
        project.identifiers.snake
        }-${Date.now()}.json`;

    // Defines JSON string
    const jsonString: string = JSON.stringify(project, null, 4);

    // Downloads file
    download(jsonString, filename, "application/json");
}

// // // //

/**
 * ProjectExportModal
 * @param props.show
 * @param props.project
 * @param props.onHide
 */
export function ProjectExportModal(props: {
    show: boolean;
    project: Project;
    onHide: () => void;
}) {
    const { project } = props;

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Export Project</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className="form-text text-muted mb-2">
                    Export a Codotype Blueprint stored as a .JSON file
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
            </Modal.Body>

            <Modal.Footer>
                <button
                    className="btn btn-success"
                    onClick={() => {
                        downloadProject(project);
                        props.onHide();
                    }}
                >
                    Export Project
                </button>

                <button className="btn btn-light" onClick={props.onHide}>
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    );
}
