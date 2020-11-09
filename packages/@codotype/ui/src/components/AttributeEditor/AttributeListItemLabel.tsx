import { DatatypeMeta, AttributeInput } from "@codotype/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { DatatypeIcon } from "./DatatypeIcon";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// // // //

interface AttributeListItemLabelProps {
    attribute: AttributeInput;
    datatype: DatatypeMeta;
}

export function AttributeListItemLabel(props: AttributeListItemLabelProps) {
    const { attribute } = props;
    return (
        <React.Fragment>
            {/* DatatypeIcon + Tooltip */}
            <OverlayTrigger
                placement="left"
                overlay={
                    <Tooltip id={`datatype-icon-${attribute.id}`}>
                        {props.datatype.label}
                    </Tooltip>
                }
            >
                <span className="px-1">
                    <DatatypeIcon size="xs" datatype={attribute.datatype} />
                </span>
            </OverlayTrigger>

            {/* Attribute title */}
            {/* TODO - update this to use icons from ADDONS */}
            <span className="ml-2">{attribute.identifiers.title}</span>

            {/* Required badge */}
            {/* TODO - update this to use icons from ADDONS */}
            {attribute.addons.required && (
                <span className="ml-1 text-danger">*</span>
            )}

            {/* Unique badge + tooltip */}
            {/* TODO - update this to use icons from ADDONS */}
            {attribute.addons.unique && (
                <OverlayTrigger
                    placement="right"
                    overlay={
                        <Tooltip id={`unique-badge-${attribute.id}`}>
                            Unique
                        </Tooltip>
                    }
                >
                    <span className="ml-2 badge badge-light">
                        <FontAwesomeIcon icon={faSnowflake} />
                    </span>
                </OverlayTrigger>
            )}
        </React.Fragment>
    );
}
