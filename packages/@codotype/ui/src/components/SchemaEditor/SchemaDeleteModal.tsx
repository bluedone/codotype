import * as React from "react";
import { Modal } from "../Modal";

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
            <div className="p-5">
                <h3 className="modal-header">Delete Data Model</h3>
                <p>Are you sure you want to delete this data model?</p>
            </div>
            <div className="modal-footer-tw">
                <button
                    onClick={props.onConfirmDelete}
                    className="btn btn-lg btn-danger"
                >
                    Delete Data Model
                </button>
                <button className="modal-close-btn" onClick={props.onClose}>
                    Close
                </button>
            </div>
        </Modal>
    );
}
