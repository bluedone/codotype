import * as React from "react";
import { Modal } from "react-bootstrap";

// // // //

/**
 * RelationDeleteModal
 * @param props.show
 * @param props.onClose
 * @param props.onConfirm
 */
export function RelationDeleteModal(props: {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
}) {
    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Relation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this Relation?
            </Modal.Body>
            <Modal.Footer className="bg-light">
                <button
                    className="btn btn-lg btn-danger"
                    onClick={props.onConfirm}
                >
                    Delete Relation
                </button>
                <button
                    className="btn btn-lg btn-light ml-2"
                    onClick={props.onClose}
                >
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
}
