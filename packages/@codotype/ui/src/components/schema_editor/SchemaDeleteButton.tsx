import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Schema } from "@codotype/types";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styled from "styled-components";
import classnames from "classnames";
import { inflateSchema } from "@codotype/util";

// // // //

const StyledButton = styled.button`
    transition: color 0.25s ease-in-out;
    cursor: pointer;
    color: #adb5bd;
    box-shadow: none;
    color: #d9534f;
    &.hasReverse {
        &:hover {
            color: #adb5bd !important;
            cursor: not-allowed;
        }
    }
    &:hover {
        color: #d9534f;
    }

    &.disable-submit {
        cursor: not-allowed !important;
        &:hover {
            color: #adb5bd;
        }
    }
`;

const StyledButtonDisabled = styled.button``;

/**
 * SchemaDeleteButton
 * @param props.onClick
 */
export function SchemaDeleteButton(props: {
    schema: Schema;
    schemas: Schema[];
    onClick: () => void;
}) {
    const { schema, schemas } = props;

    const inflatedSchema = inflateSchema({ schema, schemas });

    // Defines boolean indicating whether or not the schema can be removed
    const disableSubmit: boolean = inflatedSchema.references.length > 0;

    let tooltipContent = (
        <React.Fragment>
            Remove the <strong>{schema.identifiers.singular.label}</strong>{" "}
            Schema.
        </React.Fragment>
    );

    if (disableSubmit) {
        tooltipContent = (
            <React.Fragment>
                You cannot remove the{" "}
                <strong>{schema.identifiers.singular.label}</strong> Schema
                because it is referenced by a relation on another Schema.
            </React.Fragment>
        );
    }

    // Render different layout + tooltip if disableSubmit
    return (
        <OverlayTrigger
            placement="left"
            overlay={
                <Tooltip id={`delete-button-tooltip-${schema.id}`}>
                    {tooltipContent}
                </Tooltip>
            }
        >
            <StyledButton
                className={classnames("btn btn-link ml-2 py-0", {
                    "disable-submit": disableSubmit,
                })}
                onClick={() => {
                    if (disableSubmit) {
                        return;
                    }
                    props.onClick();
                }}
            >
                <FontAwesomeIcon className="ml-5-px" icon={faTrashAlt} />
            </StyledButton>
        </OverlayTrigger>
    );
}
