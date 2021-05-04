import * as React from "react";
import { RelationInput } from "@codotype/core";
import { Modal } from "../Modal";

// // // //

/**
 * RelationFormModal
 */
export function RelationFormModal(props: {
    show: boolean;
    disableSubmit: boolean;
    relationInput: RelationInput;
    children: React.ReactNode;
    errors: string[];
    onCancel: () => void;
    onSubmit: () => void;
}) {
    // Defines title based on props.isNew
    let title = "Update Relation";
    if (props.relationInput.id === "") {
        title = "Create Relation";
    }

    return (
        <Modal show={props.show} onHide={props.onCancel} size="lg">
            <div className="p-5">
                <h3 className="text-xl">{title}</h3>
                {props.children}
            </div>
            <div className="modal-footer-tw">
                <div className="flex items-center justify-between flex-grow">
                    <div className="flex flex-grow">
                        <p className="mb-0 text-red-400">{props.errors[0]}</p>
                    </div>
                    <div className="flex">
                        <button
                            disabled={props.disableSubmit}
                            className="btn btn-lg btn-primary"
                            onClick={props.onSubmit}
                        >
                            {title}
                        </button>
                        <button
                            className="modal-close-btn"
                            onClick={props.onCancel}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
