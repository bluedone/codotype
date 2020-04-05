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
            <Modal.Header closeButton>
                <Modal.Title>Project Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={props.onSubmit}>
                    Update Project Name
                </button>
                <button className="btn btn-light" onClick={props.handleClose}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
}
