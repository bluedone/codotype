import * as React from "react";
import { Modal } from "react-bootstrap";

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
        <Modal size="lg" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <div className="modal-footer-tw">
                <div className="d-flex align-items-center justify-content-between flex-grow-1">
                    <div className="d-flex flex-grow-1">
                        <p className="mb-0 text-warning">{props.errors[0]}</p>
                    </div>
                    <div className="d-flex">
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
