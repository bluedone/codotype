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
}) {
    // Defines title + submit button labels
    let title = "Update Schema";
    if (props.renderNewTitle) {
        title = "Create Schema";
    }

    return (
        <Modal size="lg" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-light" onClick={props.handleClose}>
                    Close
                </button>
                <button className="btn btn-success" onClick={props.onSubmit}>
                    {title}
                </button>
            </Modal.Footer>
        </Modal>
    );
}
