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
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={props.onClose}>
                    Close
                </button>
                <button className="btn btn-danger" onClick={props.onConfirm}>
                    Delete Relation
                </button>
            </Modal.Footer>
        </Modal>
    );
}
