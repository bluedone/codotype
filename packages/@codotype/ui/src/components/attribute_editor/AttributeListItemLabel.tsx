import { DatatypeMeta, Attribute } from "@codotype/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { DatatypeIcon } from "./DatatypeIcon";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// // // //

interface AttributeListItemLabelProps {
    attribute: Attribute;
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

            {/* Attribute label */}
            <span className="ml-2">{attribute.identifiers.label}</span>

            {/* Required badge */}
            {attribute.addons.required && (
                <span className="ml-1 text-danger">*</span>
            )}

            {/* <b-badge
                v-if="index === 0"
                className='ml-2'
                variant="light"
                title="Title Attribute"
                v-b-tooltip.hover.right
            >
              <i class="fa text-primary fa-tag" />
            </b-badge> */}

            {/* Unique badge + tooltip */}
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
