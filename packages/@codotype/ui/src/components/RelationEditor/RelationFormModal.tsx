import * as React from "react";
import { RelationInput } from "@codotype/core";
import { Modal } from "react-bootstrap";

// // // //

/**
 * RelationFormModal
 */
export function RelationFormModal(props: {
    show: boolean;
    disableSubmit: boolean;
    relationInput: RelationInput;
    children: React.ReactNode;
    onCancel: () => void;
    onSubmit: () => void;
}) {
    // Defines title based on props.isNew
    let title = "Update Relation";
    if (props.relationInput.id === "") {
        title = "Create Relation";
    }

    return (
        <Modal size="lg" show={props.show} onHide={props.onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer className="bg-light">
                <button
                    disabled={props.disableSubmit}
                    className="btn btn-lg btn-primary"
                    onClick={props.onSubmit}
                >
                    {title}
                </button>
                <button
                    className="btn btn-lg btn-light"
                    onClick={props.onCancel}
                >
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
}
