import * as React from "react";
import { Modal } from "react-bootstrap";

// // // //

/**
 * SchemaFormModal
 * @param props.show
 * @param props.children
 * @param props.handleClose
 */
export function SchemaFormModal(props: {
    show: boolean;
    children: React.ReactNode;
    handleClose: () => void;
}) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create / Update Schema</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <button onClick={props.handleClose}>Close</button>
                <button onClick={props.handleClose}>
                    Create / Update Schema
                </button>
            </Modal.Footer>
        </Modal>
    );
}
