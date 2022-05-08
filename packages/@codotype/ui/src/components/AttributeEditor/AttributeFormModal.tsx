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
    onSubmit: (submitProps: { saveAndContinue: boolean }) => void;
}) {
    // Defines title based on props.isNew
    let title = "Update Attribute";
    if (props.attributeInput.id === "") {
        title = "Create Attribute";
    }

    return (
        <Modal show={props.show} onHide={props.onCancel} size="lg">
            <div className="p-5">
                <h3 className="text-2xl font-extralight text-primary-600">
                    {title}
                </h3>
                {props.children}
            </div>
            <div className="modal-footer-tw">
                <div className="flex items-center justify-between flex-grow">
                    <div className="flex flex-grow">
                        <p className="mb-0 text-red-400">{props.errors[0]}</p>
                    </div>
                    <div className="flex">
                        <button
                            className="btn btn-lg btn-primary"
                            disabled={props.disableSubmit}
                            onClick={() =>
                                props.onSubmit({ saveAndContinue: false })
                            }
                        >
                            Save
                        </button>
                        {props.attributeInput.id === "" && (
                            <button
                                className="btn btn-lg btn-primary ml-3"
                                disabled={props.disableSubmit}
                                onClick={() =>
                                    props.onSubmit({ saveAndContinue: true })
                                }
                            >
                                Save &amp; add another
                            </button>
                        )}
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
