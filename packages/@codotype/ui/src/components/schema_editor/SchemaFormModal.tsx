import * as React from "react";
import { Modal } from "react-bootstrap";

// // // //

/**
 * SchemaFormModal
 * @param props.show
 * @param props.children
 * @param props.handleClose
 * @param props.disableSubmit
 * @param props.onSubmit
 */
export function SchemaFormModal(props: {
    renderNewTitle?: boolean;
    show: boolean;
    children: React.ReactNode;
    handleClose: () => void;
    disableSubmit: boolean;
    onSubmit: () => void;
}) {
    // Defines title + submit button labels
    let title = "Edit Schema";
    let submitLabel = "Update Schema";
    if (props.renderNewTitle) {
        title = "New Schema";
        submitLabel = "Create Schema";
    }

    return (
        <Modal size="lg" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-primary"
                    disabled={props.disableSubmit}
                    onClick={props.onSubmit}
                >
                    {submitLabel}
                </button>
                <button className="btn btn-light" onClick={props.handleClose}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
}
