import * as React from "react";
import {
    OptionType,
    OptionValue,
    OptionValueInstance,
    ConfigurationGroupProperty,
    ConfigurationGroup,
    GroupLayoutVariant,
} from "@codotype/types";
import { ConfigurationInputChild } from "./ConfigurationInputChild";
import { ConfigurationGroupVariant } from "./ConfigurationGroupVariant";
import { ConfigurationGroupHeader } from "./ConfigurationGroupHeader";
import { ConfigurationInputFormGroup } from "./ConfigurationInputFormGroup";
import { ConfigurationInstanceInput } from "./ConfigurationInstanceInput";
import { ConfigurationCollectionInput } from "./ConfigurationCollectionInput";

// // // //

interface ConfigurationInputProps {
    value: OptionValueInstance;
    configurationGroup: ConfigurationGroup;
    onChange: (updatedVal: OptionValueInstance) => void;
}
export function ConfigurationInput(props: ConfigurationInputProps) {
    if (!props.configurationGroup.properties) {
        console.log("WARNING - NO CONFIGURATION GROUP PROPERTIES DEFINED");
        return null;
    }
    return (
        <div className="row mt-3">
            <div className="col-lg-12">
                {/* ConfigurationGroupHeader */}
                <ConfigurationGroupHeader
                    configurationGroup={props.configurationGroup}
                    enableDocumentationModal={
                        props.configurationGroup.layoutVariant !==
                        GroupLayoutVariant.DOCS_4x8
                    }
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
                                        className="card card-body mb-4 mt-2"
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
}
