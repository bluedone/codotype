import * as React from "react";
import { Modal } from "../Modal";
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
            <h3>Load {projectInput.identifiers.title} Project</h3>

            <p className="form-text text-muted mb-2">
                Load an example project for this Codotype Plugin.
            </p>

            <p className="form-text text-muted mb-2">
                <span className="text-red-500">WARNING: </span>This will delete
                your current project - are you sure you want to continue?
            </p>

            <div className="modal-footer-tw">
                <button
                    className="btn btn-lg btn-primary"
                    onClick={() => {
                        props.onConfirm();
                    }}
                >
                    Load Example Project
                </button>

                <button
                    className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={props.onHide}
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}
