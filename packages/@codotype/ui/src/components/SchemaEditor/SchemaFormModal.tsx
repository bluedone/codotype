import * as React from "react";
import { Modal } from "../Modal";

// // // //

/**
 * SchemaFormModal
 * @param props.show
 * @param props.children
 * @param props.handleClose
 * @param props.onSubmit
 */
export function SchemaFormModal(props: {
    renderNewTitle?: boolean;
    show: boolean;
    children: React.ReactNode;
    handleClose: () => void;
    onSubmit: () => void;
    errors: string[];
}) {
    // Defines title + submit button labels
    let title = "Edit Schema";
    let submitLabel = "Update Schema";
    if (props.renderNewTitle) {
        title = "New Schema";
        submitLabel = "Create Schema";
    }

    const disableSubmit: boolean = props.errors.length > 0;

    return (
        <Modal
            size="lg"
            show={props.show}
            onHide={props.handleClose}
        >
            <div className="p-5 select-none">
                <h3 className="text-2xl">{title}</h3>
                {props.children}
            </div>
            <div className="modal-footer-tw select-none">
                <div className="flex items-center justify-between flex-grow">
                    <div className="flex flex-grow">
                        <p className="mb-0 text-red-400">{props.errors[0]}</p>
                    </div>
                    <div className="flex">
                        <button
                            className="btn btn-lg btn-primary"
                            disabled={disableSubmit}
                            onClick={props.onSubmit}
                        >
                            {submitLabel}
                        </button>
                        <button
                            className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={props.handleClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
