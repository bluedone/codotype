import * as React from "react";
import { Modal } from "../Modal";

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
            <h3>Delete Attribute</h3>
            Are you sure you want to delete this Attribute?
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
