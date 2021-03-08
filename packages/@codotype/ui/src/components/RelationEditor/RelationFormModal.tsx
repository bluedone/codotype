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
                <button
                    disabled={props.disableSubmit}
                    className="btn btn-lg btn-primary"
                    onClick={props.onSubmit}
                >
                    {title}
                </button>
                <button
                    className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={props.onCancel}
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}
