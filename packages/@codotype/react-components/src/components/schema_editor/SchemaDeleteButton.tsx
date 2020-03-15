import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Schema } from "../types";
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
                    Remove the <strong>{props.schema.tokens.label}</strong>{" "}
                    Schema.
                </Tooltip>
            }
        >
            <button className="btn btn-link ml-2 py-0" onClick={props.onClick}>
                <FontAwesomeIcon
                    className="ml-5-px text-danger"
                    icon={faTrashAlt}
                />
            </button>
        </OverlayTrigger>
    );
}
