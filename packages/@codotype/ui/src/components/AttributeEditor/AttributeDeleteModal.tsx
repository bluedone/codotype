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
            <div className="modal-footer-tw">
                <button
                    className="btn btn-lg btn-danger"
                    onClick={props.onConfirm}
                >
                    Delete Attribute
                </button>
                <button
                    className="btn btn-lg btn-light"
                    onClick={props.onClose}
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}
