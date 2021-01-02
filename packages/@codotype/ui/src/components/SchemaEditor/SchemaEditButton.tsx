import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { SchemaInput, CreatedByValues } from "@codotype/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// // // //

export function SchemaEditButton(props: {
    schema: SchemaInput;
    onClick: () => void;
}) {
    const { schema } = props;
    if (schema.createdBy === CreatedByValues.plugin && schema.locked) {
        return null;
    }

    return (
        <OverlayTrigger
            placement="right"
            overlay={
                <Tooltip id="edit-button-tooltip">
                    Edit the{" "}
                    <strong>{schema.identifiers.singular.title}</strong> Schema
                </Tooltip>
            }
        >
            <button
                className="btn-icon"
                onClick={props.onClick}
            >
                <FontAwesomeIcon className="ml-2" icon={faPencilAlt} />
            </button>
        </OverlayTrigger>
    );
}
