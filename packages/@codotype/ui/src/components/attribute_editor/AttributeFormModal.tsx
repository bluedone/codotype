import * as React from "react";
import { Datatype, Attribute } from "@codotype/types";
import { Modal } from "react-bootstrap";

// // // //

export interface AttributeInput extends Attribute {
    datatype: Datatype | null;
}

/**
 * AttributeFormModal
 * @param props.show
 * @param props.children
 * @param props.onCancel
 */
export function AttributeFormModal(props: {
    show: boolean;
    disableSubmit: boolean;
    attributeInput: AttributeInput;
    children: React.ReactNode;
    errors: string[];
    onCancel: () => void;
    onSubmit: () => void;
}) {
    // Defines title based on props.isNew
    let title = "Update Attribute";
    if (props.attributeInput.id === "") {
        title = "Create Attribute";
    }

    return (
        <Modal size="lg" show={props.show} onHide={props.onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <pre>{JSON.stringify(props.errors, null, 4)}</pre>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={props.onCancel}>
                    Close
                </button>
                <button
                    disabled={props.disableSubmit}
                    className="btn btn-primary"
                    onClick={props.onSubmit}
                >
                    {title}
                </button>
            </Modal.Footer>
        </Modal>
    );
}
