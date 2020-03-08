import * as React from "react";
import { Modal } from "react-bootstrap";

// // // //

/**
 * AttributeFormModal
 * @param props.show
 * @param props.children
 * @param props.handleClose
 */
export function AttributeFormModal(props: {
    show: boolean;
    children: React.ReactNode;
    handleClose: () => void;
}) {
    return (
        <Modal size="lg" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create / Update Attribute</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <button onClick={props.handleClose}>Close</button>
                <button onClick={props.handleClose}>
                    Create / Update Attribute
                </button>
            </Modal.Footer>
        </Modal>
    );
}
