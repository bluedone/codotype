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
                    className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={props.onClose}
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}
