import * as React from "react";
import { Datatype } from "../types";
import { Modal } from "react-bootstrap";

// // // //

export interface AttributeInput {
    id: string;
    label: string;
    identifier: string;
    required: boolean;
    unique: boolean;
    description: string;
    datatype: Datatype | null;
    default_value: null | string | boolean | number;
    datatypeOptions: { [key: string]: any };
    locked: boolean;
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
