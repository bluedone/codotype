import * as React from "react";
import { Modal } from "react-bootstrap";

// // // //

/**
 * SchemaDeleteModal
 * @param props.show
 * @param props.onClose
 * @param props.onConfirmDelete
 */
export function SchemaDeleteModal(props: {
    show: boolean;
    onConfirmDelete: () => void;
    onClose: () => void;
}) {
    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Schema</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this schema?</p>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.onClose} className="btn btn-secondary">
                    Close
                </button>
                <button
                    onClick={props.onConfirmDelete}
                    className="btn btn-danger"
                >
                    Delete Schema
                </button>
            </Modal.Footer>
        </Modal>
    );
}
