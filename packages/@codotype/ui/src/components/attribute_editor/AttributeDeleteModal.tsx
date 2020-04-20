import * as React from "react";
import { Modal } from "react-bootstrap";

// // // //

/**
 * AttributeDeleteModal
 * @param props.show
 * @param props.onClose
 * @param props.onConfirm
 */
export function AttributeDeleteModal(props: {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
}) {
    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Attribute</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this Attribute?
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={props.onClose}>
                    Close
                </button>
                <button className="btn btn-danger" onClick={props.onConfirm}>
                    Delete Attribute
                </button>
            </Modal.Footer>
        </Modal>
    );
}
