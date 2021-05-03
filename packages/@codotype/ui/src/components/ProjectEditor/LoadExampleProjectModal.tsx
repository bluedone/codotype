import * as React from "react";
import { Modal } from "../Modal";
import { ProjectInput } from "@codotype/core";

// // // //

/**
 * LoadExampleProjectModal
 * @param props.show
 * @param props.onConfirm
 * @param props.onHide
 */
export function LoadExampleProjectModal(props: {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
}) {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <div className="p-5 select-none">
                <h3 className="modal-header">Load Example Project</h3>

                <p className="form-text text-muted mb-2">
                    Load an example project for this Codotype Plugin.
                </p>

                <p className="form-text text-muted mb-2">
                    <span className="text-red-500">WARNING: </span>This will
                    delete your current project - are you sure you want to
                    continue?
                </p>
            </div>

            <div className="modal-footer-tw">
                <button
                    className="btn btn-lg btn-primary"
                    onClick={() => {
                        props.onConfirm();
                    }}
                >
                    Load Example Project
                </button>

                <button className="modal-close-btn" onClick={props.onHide}>
                    Cancel
                </button>
            </div>
        </Modal>
    );
}
