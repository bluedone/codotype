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
            <div className="p-5 select-none">
                <h3 className="modal-header">Delete Relation</h3>
                <p>Are you sure you want to delete this Relation?</p>
            </div>
            <div className="modal-footer-tw">
                <button
                    className="btn btn-lg btn-primary"
                    onClick={props.onConfirm}
                >
                    Delete Relation
                </button>
                <button
                    className="modal-close-btn"
                    onClick={props.onClose}
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}
