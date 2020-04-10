import * as React from "react";
import { RelationType } from "@codotype/types";
import { Modal } from "react-bootstrap";

// // // //

export interface RelationInput {
    id: string;
    type: RelationType | null;
    required: boolean;
    schema_id: string;
    related_schema_id: string;
    reverse_relation_id: string;
    as: string; // TODO - rename 'as' to something else?
    reverse_as: string; // TODO - rename 'reverse_as' to something else?
}

/**
 * RelationFormModal
 * @param props.show
 * @param props.children
 * @param props.onCancel
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
