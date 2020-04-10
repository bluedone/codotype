import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Schema } from "@codotype/types";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// // // //

/**
 * SchemaDeleteButton
 * @param props.onClick
 */
export function SchemaDeleteButton(props: {
    schema: Schema;
    onClick: () => void;
}) {
    return (
        <OverlayTrigger
            placement="left"
            overlay={
                <Tooltip id="delete-button-tooltip">
                    Remove the{" "}
                    <strong>{props.schema.identifiers.label.singular}</strong>{" "}
                    Schema.
                </Tooltip>
            }
        >
            <button
                className="btn btn-link ml-2 py-0 schema-delete-button"
                onClick={props.onClick}
            >
                <FontAwesomeIcon className="ml-5-px" icon={faTrashAlt} />
            </button>
        </OverlayTrigger>
    );
}
