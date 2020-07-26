import * as React from "react";
import {
    ConfigurationGroup,
    ConfigurationGroupProperty,
    OptionType,
    OptionValue,
    OptionValueInstance,
    EMPTY_TOKEN_CASING,
} from "@codotype/types";
import { ConfigurationInputChild } from "./ConfigurationInputChild";
import { ConfigurationInputFormGroup } from "./ConfigurationInputFormGroup";
import { ConfigurationInstanceInput } from "./ConfigurationInstanceInput";
import { ConfigurationCollectionInput } from "./ConfigurationCollectionInput";

// // // //

/**
 * CongifurationGroupPropertiesInputs
 * @param props 
 */
export function CongifurationGroupPropertiesInputs(props: {
    configurationGroup: ConfigurationGroup;
    value: OptionValueInstance;
    onChange: (updatedVal: OptionValueInstance) => void;
}) {
    const { configurationGroup } = props;
    return (
        <React.Fragment>
            {configurationGroup.properties.map(
                (property: ConfigurationGroupProperty) => {
                    if (property.type === OptionType.COLLECTION) {
                        return (
                            <ConfigurationCollectionInput
                                label={property.label}
                                identifiers={{
                                    singular: {
                                        ...EMPTY_TOKEN_CASING,
                                    },
                                    plural: {
                                        ...EMPTY_TOKEN_CASING,
                                    },
                                }}
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
                            enabled={true}
                            property={property}
                            key={property.identifier}
                            onChangeEnabled={() => {
                                console.log("onChangeEnabled");
                            }}
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
        </React.Fragment>
    )
}
