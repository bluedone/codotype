import * as React from "react";
import { Modal } from "../Modal";

// // // //

/**
 * ProjectFormModal
 * @param props.show
 * @param props.children
 * @param props.handleClose
 */
export function ProjectFormModal(props: {
    show: boolean;
    children: React.ReactNode;
    disabled: boolean;
    handleClose: () => void;
    onSubmit: () => void;
}) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <div className="p-5">
                <h3 className="text-2xl select-none">Project Name</h3>

                {props.children}
            </div>
            <div className="modal-footer-tw">
                <button
                    className="btn btn-lg btn-primary"
                    onClick={props.onSubmit}
                    disabled={props.disabled}
                >
                    Update Project Name
                </button>
                <button
                    className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={props.handleClose}
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}
