import * as React from "react";
import { Modal } from "../Modal";

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
            <h3>Delete Relation</h3>
            Are you sure you want to delete this Relation?
            <div className="modal-footer-tw">
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
            </div>
        </Modal>
    );
}
