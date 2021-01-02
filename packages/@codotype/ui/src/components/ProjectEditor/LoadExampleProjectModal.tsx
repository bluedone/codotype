import * as React from "react";
import { Modal } from "react-bootstrap";
import { ProjectInput } from "@codotype/core";

// // // //

/**
 * LoadExampleProjectModal
 * @param props.show
 * @param props.projectInput
 * @param props.onConfirm
 * @param props.onHide
 */
export function LoadExampleProjectModal(props: {
    show: boolean;
    projectInput: ProjectInput;
    onHide: () => void;
    onConfirm: () => void;
}) {
    const { projectInput } = props;

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Load {projectInput.identifiers.title} Project
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className="form-text text-muted mb-2">
                    Load an example project for this Codotype Plugin.
                </p>

                <p className="form-text text-muted mb-2">
                    <span className="text-red-500">WARNING: </span>This will
                    delete your current project - are you sure you want to
                    continue?
                </p>
            </Modal.Body>

            <div className="modal-footer-tw">
                <button
                    className="btn btn-lg btn-primary"
                    onClick={() => {
                        props.onConfirm();
                    }}
                >
                    Load Example Project
                </button>

                <button className="btn btn-lg btn-light" onClick={props.onHide}>
                    Cancel
                </button>
            </div>
        </Modal>
    );
}
