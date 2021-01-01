import * as React from "react";
import { Modal } from "react-bootstrap";

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
    handleClose: () => void;
    onSubmit: () => void;
}) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton className="d-flex align-items-center">
                <Modal.Title>Project Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer className="bg-light">
                <button
                    className="btn btn-lg btn-primary"
                    onClick={props.onSubmit}
                >
                    Update Project
                </button>
                <button
                    className="btn btn-lg btn-light bg-white"
                    onClick={props.handleClose}
                >
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
}
