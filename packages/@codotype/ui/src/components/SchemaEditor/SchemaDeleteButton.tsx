import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
    Schema,
    CreatedByValues,
    inflateSchema,
    SchemaInput,
    ProjectInput,
    buildRelations,
} from "@codotype/core";

// // // //

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
                    className="badge bg-green-500 ml-2"
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
            <button
                className={
                    "ml-2 text-gray-500 hover:text-red-400 p-1 focus:outline-none transition-colors duration-150 ease-in-out"
                }
                onClick={() => {
                    props.onClick();
                }}
            >
                <FontAwesomeIcon className="ml-1" icon={faTrashAlt} />
            </button>
        </OverlayTrigger>
    );
}
