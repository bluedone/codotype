import {
    DatatypeMeta,
    AttributeAddon,
    AttributeInput,
    AddonPropertyInlineIcons,
    PropertyTypes,
} from "@codotype/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import {
    faSnowflake,
    faAsterisk,
    faStar,
    faTag,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { DatatypeIcon } from "./DatatypeIcon";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Tooltip } from "../Tooltip";

// // // //

interface AttributeListItemLabelProps {
    attribute: AttributeInput;
    datatype: DatatypeMeta;
    addons: AttributeAddon[];
}

// Maps AddonPropertyInlineIcon to associated FontAwesome IconDefinition
const mapAddonIconToFontAwesome: {
    [key in AddonPropertyInlineIcons]: IconDefinition | null;
} = {
    [AddonPropertyInlineIcons.none]: null,
    [AddonPropertyInlineIcons.snowflake]: faSnowflake,
    [AddonPropertyInlineIcons.asterisk]: faAsterisk,
    [AddonPropertyInlineIcons.star]: faStar,
    [AddonPropertyInlineIcons.tag]: faTag,
    [AddonPropertyInlineIcons.check]: faCheck,
};

// AddonPropertyInlineIcons;

export function AttributeListItemLabel(props: AttributeListItemLabelProps) {
    const { attribute, addons } = props;
    return (
        <React.Fragment>
            {/* DatatypeIcon + Tooltip */}
            <Tooltip
                position="left"
                tooltipContent={
                    <>
                        {props.datatype.label}
                    </>
                }
            >
                <span className="px-1">
                    <DatatypeIcon size="xs" datatype={attribute.datatype} />
                </span>
            </Tooltip>

            {/* Attribute title */}
            {/* TODO - update this to use icons from ADDONS */}
            <span className="ml-2">{attribute.identifiers.title}</span>

            {/* Render Addon badges */}
            {props.addons
                .filter(
                    a =>
                        attribute.datatype !== null &&
                        a.supportedDatatypes.includes(attribute.datatype),
                )
                .map(addon => {
                    const icon =
                        mapAddonIconToFontAwesome[addon.property.inlineIcon];

                    if (icon === null) {
                        return null;
                    }

                    if (
                        attribute.addons[addon.property.identifier] ===
                        undefined
                    ) {
                        return null;
                    }

                    // Return null for boolean addon with falsey property
                    if (
                        addon.property.propertyType === PropertyTypes.BOOLEAN &&
                        attribute.addons[addon.property.identifier] === false
                    ) {
                        return null;
                    }

                    return (
                        <Tooltip
                            position="right"
                            tooltipContent={
                                <>
                                    {addon.property.content.label}
                                </>
                            }
                        >
                            <span className="ml-2 badge bg-gray-300">
                                <FontAwesomeIcon icon={icon} />
                            </span>
                        </Tooltip>
                    );
                })}
        </React.Fragment>
    );
}
