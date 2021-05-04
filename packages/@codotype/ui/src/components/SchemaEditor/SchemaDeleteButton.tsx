import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "../Tooltip";
import { CreatedByValues, SchemaInput } from "@codotype/core";

// // // //

/**
 * SchemaDeleteButton
 * @param props.onClick
 */
export function SchemaDeleteButton(props: {
    schemaInput: SchemaInput;
    onClick: () => void;
}) {
    const { schemaInput } = props;

    // TODO - add support for schemaInput.removable
    // TODO - add support for schemaInput.removable
    // TODO - add support for schemaInput.removable
    // TODO - add support for schemaInput.removable
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
                        </strong>
                        &nbsp; Schema is auto-generated and may not be edited.
                    </>
                }
            >
                <div className="inline-flex bg-green-500 text-white leading-none rounded-full py-3 px-2 h-6 shadow text-sm justify-center items-center">
                    <FontAwesomeIcon className="mr-1" icon={faInfoCircle} />
                    Auto-Generated
                </div>
            </Tooltip>
        );
    }

    // Render different layout + tooltip if disableSubmit
    return (
        <Tooltip
            position="left"
            tooltipContent={
                <React.Fragment>
                    Remove the&nbsp;
                    <span className="text-semibold">
                        {schemaInput.identifiers.singular.title}
                    </span>
                    &nbsp;Data Model.
                </React.Fragment>
            }
        >
            <button
                className={
                    "text-red-500 hover:text-red-600 p-1 focus:outline-none transition-colors duration-150 ease-in-out"
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
