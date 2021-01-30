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
            // size="lg"
            show={props.show}
            onHide={props.handleClose}
        >
            <h3>{title}</h3>
            {props.children}
            <div className="modal-footer-tw">
                <div className="flex items-center justify-between flex-grow">
                    <div className="flex flex-grow">
                        <p className="mb-0 text-warning">{props.errors[0]}</p>
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
                            className="btn btn-lg btn-light ml-2"
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
