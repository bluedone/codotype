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
    let title = "Edit Data Model";
    let submitLabel = "Update Data Model";
    if (props.renderNewTitle) {
        title = "New Data Model";
        submitLabel = "Create Data Model";
    }

    const disableSubmit: boolean = props.errors.length > 0;

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <div className="p-5 select-none">
                <h3 className="modal-header">{title}</h3>
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
                            className="modal-close-btn"
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
