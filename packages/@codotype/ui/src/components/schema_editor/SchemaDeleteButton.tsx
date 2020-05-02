import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Schema } from "@codotype/types";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styled from "styled-components";

// // // //

const StyledButton = styled.button`
    transition: color 0.25s ease-in-out;
    cursor: pointer;
    color: #adb5bd;
    box-shadow: none;
    &.hasReverse {
        &:hover {
            color: #adb5bd !important;
            cursor: not-allowed;
        }
    }
    &:hover {
        color: #d9534f;
    }
`;

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
                    <strong>{props.schema.identifiers.singular.label}</strong>{" "}
                    Schema.
                </Tooltip>
            }
        >
            <StyledButton
                className="btn btn-link ml-2 py-0"
                onClick={props.onClick}
            >
                <FontAwesomeIcon className="ml-5-px" icon={faTrashAlt} />
            </StyledButton>
        </OverlayTrigger>
    );
}
