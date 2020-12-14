import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styled from "styled-components";
import classnames from "classnames";
import {
    Schema,
    CreatedByValues,
    inflateSchema,
    SchemaInput,
    ProjectInput,
    buildRelations,
} from "@codotype/core";

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
    schemaInput: SchemaInput;
    projectInput: ProjectInput;
    onClick: () => void;
}) {
    const { schemaInput, projectInput } = props;

    const inflatedSchema: Schema = inflateSchema({
        schemaInput,
        relations: buildRelations({
            schemaInputs: projectInput.schemas,
            relationInputs: projectInput.relations,
        }),
    });

    // Defines boolean indicating whether or not the schema can be removed
    const disableSubmit: boolean =
        inflatedSchema.referencedBy.filter(
            r => r.sourceSchemaID !== schemaInput.id,
        ).length > 0;

    if (
        schemaInput.createdBy === CreatedByValues.plugin &&
        schemaInput.locked
    ) {
        return (
            <OverlayTrigger
                placement="left"
                overlay={
                    <Tooltip id="auto-generated-schema-tooltip">
                        The{" "}
                        <strong>
                            {schemaInput.identifiers.singular.title}
                        </strong>{" "}
                        Schema is auto-generated and may not be edited.
                    </Tooltip>
                }
            >
                <span
                    className="badge badge-success ml-2"
                    style={{ cursor: "default" }}
                >
                    <FontAwesomeIcon className="mr-2" icon={faInfoCircle} />
                    Auto-Generated
                </span>
            </OverlayTrigger>
        );
    }

    let tooltipContent = (
        <React.Fragment>
            Remove the <strong>{schemaInput.identifiers.singular.title}</strong>{" "}
            Schema.
        </React.Fragment>
    );

    if (disableSubmit) {
        tooltipContent = (
            <React.Fragment>
                You cannot remove the{" "}
                <strong>{schemaInput.identifiers.singular.title}</strong> Schema
                because it is referenced by a relation on another Schema.
            </React.Fragment>
        );
    }

    // Render different layout + tooltip if disableSubmit
    return (
        <OverlayTrigger
            placement="left"
            overlay={
                <Tooltip id={`delete-button-tooltip-${schemaInput.id}`}>
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
                <FontAwesomeIcon className="ml-1" icon={faTrashAlt} />
            </StyledButton>
        </OverlayTrigger>
    );
}
