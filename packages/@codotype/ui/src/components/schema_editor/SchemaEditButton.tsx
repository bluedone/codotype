import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Schema, CreatedByValues } from "@codotype/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// // // //

export function SchemaEditButton(props: {
    schema: Schema;
    onClick: () => void;
}) {
    const { schema } = props;
    if (schema.source === CreatedByValues.plugin && schema.locked) {
        return null;
    }

    return (
        <OverlayTrigger
            placement="right"
            overlay={
                <Tooltip id="edit-button-tooltip">
                    Edit the{" "}
                    <strong>{schema.identifiers.singular.label}</strong> Schema
                </Tooltip>
            }
        >
            <button
                className="btn btn-sm btn-link ml-2 py-0"
                style={{ color: "#adb5bd" }}
                onClick={props.onClick}
            >
                <FontAwesomeIcon className="ml-2" icon={faPencilAlt} />
            </button>
        </OverlayTrigger>
    );
}
