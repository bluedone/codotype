import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { SchemaInput, CreatedByValues } from "@codotype/core";
import { Tooltip } from "../Tooltip/component";

// // // //

export function SchemaEditButton(props: {
    schema: SchemaInput;
    onClick: () => void;
}) {
    const { schema } = props;
    if (schema.createdBy === CreatedByValues.plugin && schema.locked) {
        return null;
    }

    return (
        <Tooltip
            position="right"
            tooltipContent={
                <p className="font-light">
                    Rename the{" "}
                    <span className="font-semibold">
                        {schema.identifiers.singular.title}
                    </span>{" "}
                    data model
                </p>
            }
        >
            <button className="btn-icon" onClick={props.onClick}>
                <FontAwesomeIcon icon={faPencilAlt} />
            </button>
        </Tooltip>
    );
}
