import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "../Tooltip";
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
            <Tooltip
                position="left"
                tooltipContent={
                    <>
                        The&nbsp;
                        <strong>
                            {schemaInput.identifiers.singular.title}
                        </strong>&nbsp;
                        Schema is auto-generated and may not be edited.
                    </>
                }
            >
                <span
                    className="badge bg-green-500 cursor-default"
                >
                    <FontAwesomeIcon className="mr-2" icon={faInfoCircle} />
                    Auto-Generated
                </span>
            </Tooltip>
        );
    }

    // Render different layout + tooltip if disableSubmit
    return (
        <Tooltip
            position="left"
            tooltipContent={
                <React.Fragment>
                    Remove the&nbsp;<strong>{schemaInput.identifiers.singular.title}</strong>&nbsp;Schema.
            </React.Fragment>
            }
        >
            <button
                className={
                    "text-gray-500 hover:text-red-500 p-1 focus:outline-none transition-colors duration-150 ease-in-out"
                }
                onClick={() => {
                    props.onClick();
                }}
            >
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
        </Tooltip>
    );
}
