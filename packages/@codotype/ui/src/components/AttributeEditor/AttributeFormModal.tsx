import * as React from "react";
import { AttributeInput } from "@codotype/core";
import { Modal } from "../Modal";

// // // //

/**
 * AttributeFormModal
 * @param props.show
 * @param props.children
 * @param props.onCancel
 */
export function AttributeFormModal(props: {
    show: boolean;
    disableSubmit: boolean;
    attributeInput: AttributeInput;
    children: React.ReactNode;
    errors: string[];
    onCancel: () => void;
    onSubmit: () => void;
}) {
    // Defines title based on props.isNew
    let title = "Update Attribute";
    if (props.attributeInput.id === "") {
        title = "Create Attribute";
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
                        <p className="mb-0 text-warning">{props.errors[0]}</p>
                    </div>
                    <div className="flex">
                        <button
                            className="btn btn-lg btn-primary"
                            disabled={props.disableSubmit}
                            onClick={props.onSubmit}
                        >
                            Save
                        </button>
                        {props.attributeInput.id === "" && (
                            <button
                                className="btn btn-lg btn-primary ml-3"
                                disabled={props.disableSubmit}
                                onClick={props.onSubmit}
                            >
                                Save &amp; add another
                            </button>
                        )}
                        <button
                            className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
