import React, { FunctionComponent } from "react";
import "./styles.scss";
import {
    OptionType,
    OptionValue,
    OptionValueInstance,
    ConfigurationGroupProperty,
    ConfigurationGroup,
} from "../types";
import { ConfigurationInputChild } from "./ConfigurationInputChild";
import { ConfigurationGroupVariant } from "./ConfigurationGroupVariant";
import { ConfigurationGroupHeader } from "./ConfigurationGroupHeader";
import { ConfigurationInputFormGroup } from "./ConfigurationInputFormGroup";
import { ConfigurationInstanceInput } from "./ConfigurationInstanceInput";
import { MoreInfoLink } from "../more_info_link";
import { ConfigurationCollectionInput } from "./ConfigurationCollectionInput";

// // // //

/**
 * buildConfigurationGroupPropertyValue
 * Accepts a single ConfigurationGroupProperty and recursively produces its associated OptionValue instance
 * @param property - the single ConfigurationGroupProperty for which the OptionValue is being produced
 */
export function buildConfigurationGroupPropertyValue(
    property: ConfigurationGroupProperty,
): OptionValue {
    if (property.type === OptionType.STRING) {
        return property.defaultValue || "";
    }
    if (property.type === OptionType.BOOLEAN) {
        return property.defaultValue || false;
    }
    if (property.type === OptionType.DROPDOWN) {
        return property.defaultValue || "";
    }
    if (property.type === OptionType.COLLECTION) {
        return [buildConfigurationGroupValue(property.properties)];
        // Should return this:
        // return [];
    }
    if (property.type === OptionType.INSTANCE) {
        return buildConfigurationGroupValue(property.properties);
    }
    return "";
}

/**
 * buildConfigurationGroupValue
 * Builds the top-level OptionValueInstance for a single ConfigurationGroup
 * @param properties - array of ConfigurationGroupProperty
 */
export function buildConfigurationGroupValue(
    properties: ConfigurationGroupProperty[],
): OptionValueInstance {
    const initialValue: OptionValueInstance = {};

    // Defines empty ConfigurationGroupValue
    // Iterates over each property in the group and assigns values
    const configurationGroupValue: any = properties.reduce(
        (val, property: ConfigurationGroupProperty) => {
            // Updates val with data for ConfigurationGroupProperty
            if (property.allowDisable && !property.required) {
                val[property.identifier] = {
                    enabled: property.enabled,
                    value: buildConfigurationGroupPropertyValue(property),
                };
            } else {
                val[property.identifier] = buildConfigurationGroupPropertyValue(
                    property,
                );
            }
            // Returns val
            return val;
        },
        initialValue, // Passes in empty OptionValueInstance
    );

    // Returns ConfigurationGroupValue
    return configurationGroupValue;
}

// // // //

interface ConfigurationInputProps {
    value: OptionValueInstance;
    configurationGroup: ConfigurationGroup;
    onChange: (updatedVal: OptionValueInstance) => void;
}
export const ConfigurationInput: FunctionComponent<ConfigurationInputProps> = (
    props: ConfigurationInputProps,
) => {
    return (
        <div className="row mt-3">
            <div className="col-lg-12">
                {/* ConfigurationGroupHeader */}
                <ConfigurationGroupHeader
                    configurationGroup={props.configurationGroup}
                />

                {/* Renders ConfigurationGroup variants */}
                {/* QUESTION - maybe rename to `layout`? */}
                <ConfigurationGroupVariant
                    configurationGroup={props.configurationGroup}
                >
                    {props.configurationGroup.properties.map(
                        (property: ConfigurationGroupProperty) => {
                            if (property.type === OptionType.COLLECTION) {
                                return (
                                    <ConfigurationCollectionInput
                                        label={property.label}
                                        properties={property.properties}
                                        onChange={(updatedVal: OptionValue) => {
                                            props.onChange({
                                                ...props.value,
                                                // [property.identifier]: updatedVal,
                                            });
                                        }}
                                        value={props.value}
                                    />
                                );
                            }

                            // Handle instance input
                            if (property.type === OptionType.INSTANCE) {
                                const val =
                                    // @ts-ignore
                                    props.value[property.identifier];
                                return (
                                    <div
                                        className="card card-body mb-4 mt-2 mx-2"
                                        key={property.identifier}
                                    >
                                        <ConfigurationInstanceInput
                                            label={property.label}
                                            properties={property.properties}
                                            onChange={(
                                                updatedVal: OptionValueInstance,
                                            ) => {
                                                if (property.allowDisable) {
                                                    props.onChange({
                                                        ...props.value,
                                                        [property.identifier]: {
                                                            enabled: true,
                                                            value: updatedVal,
                                                        },
                                                    });
                                                } else {
                                                    props.onChange({
                                                        ...props.value,
                                                        [property.identifier]: updatedVal,
                                                    });
                                                }
                                            }}
                                            value={val}
                                        />
                                        {/* <p>{property.identifier}</p> */}
                                        {/* <p>{JSON.stringify(property)}</p> */}
                                        {/* Debugging */}
                                        {/* {JSON.stringify(val)} */}
                                    </div>
                                );
                            }

                            // Handle all simple inputs
                            // @ts-ignore
                            const value = props.value[property.identifier];
                            return (
                                <ConfigurationInputFormGroup
                                    card
                                    property={property}
                                    key={property.identifier}
                                >
                                    <ConfigurationInputChild
                                        value={value}
                                        property={property}
                                        onChange={(
                                            updatedValue: OptionValue,
                                        ) => {
                                            props.onChange({
                                                ...props.value,
                                                [property.identifier]: updatedValue,
                                            });
                                        }}
                                    />
                                    {/* Debugging */}
                                    {/* {JSON.stringify(props.value)} */}
                                </ConfigurationInputFormGroup>
                            );
                        },
                    )}
                </ConfigurationGroupVariant>
            </div>
        </div>
    );
};
