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
            <div className="p-5 select-none">
                <h3 className="modal-header">Delete Attribute</h3>
                <p>Are you sure you want to delete this Attribute?</p>
            </div>
            <div className="modal-footer-tw">
                <button
                    className="btn btn-lg btn-danger"
                    onClick={props.onConfirm}
                >
                    Delete Attribute
                </button>
                <button className="modal-close-btn" onClick={props.onClose}>
                    Close
                </button>
            </div>
        </Modal>
    );
}
