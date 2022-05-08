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

    if (
        schemaInput.createdBy === CreatedByValues.plugin &&
        schemaInput.locked
    ) {
        return (
            <Tooltip
                position="left"
                tooltipContent={
                    <p>
                        The{" "}
                        <span className="font-semibold">
                            {schemaInput.identifiers.singular.title}
                        </span>{" "}
                        Data Model is auto-generated and may not be edited.
                    </p>
                }
            >
                <div className="inline-flex border-green-600 text-green-600 border rounded-full py-3 px-2 h-6 text-sm font-extralight justify-center items-center">
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
                <p className="font-light">
                    Remove the{" "}
                    <span className="font-semibold">
                        {schemaInput.identifiers.singular.title}
                    </span>{" "}
                    Data Model.
                </p>
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
