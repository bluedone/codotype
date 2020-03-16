import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Schema } from "../types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// // // //

export function SchemaEditButton(props: {
    schema: Schema;
    onClick: () => void;
}) {
    return (
        <OverlayTrigger
            placement="right"
            overlay={
                <Tooltip id="edit-button-tooltip">
                    Edit the <strong>{props.schema.tokens.label}</strong> Schema
                </Tooltip>
            }
        >
            <button
                className="btn btn-sm btn-link ml-2 py-0"
                style={{ color: "#adb5bd" }}
                onClick={props.onClick}
            >
                <FontAwesomeIcon className="ml-5-px" icon={faPencilAlt} />
            </button>
        </OverlayTrigger>
    );
}
