import * as React from "react";
import {
    ConfigurationGroup,
    ConfigurationGroupProperty,
    OptionType,
    OptionValue,
    OptionValueInstance,
    EMPTY_TOKEN_CASING,
} from "@codotype/core";
import { ConfigurationInputChild } from "./ConfigurationInputChild";
import { ConfigurationInputFormGroup } from "./ConfigurationInputFormGroup";
import { ConfigurationCollectionInput } from "./ConfigurationCollectionInput";

// // // //

/**
 * ConfigurationGroupPropertiesInput
 * @param props
 */
export function ConfigurationGroupPropertiesInput(props: {
    configurationGroup?: ConfigurationGroup;
    properties?: ConfigurationGroupProperty[];
    value: OptionValueInstance;
    onChange: (updatedVal: OptionValueInstance) => void;
}) {
    const { configurationGroup } = props;

    // @ts-ignore
    const properties: ConfigurationGroupProperty[] =
        // @ts-ignore
        props.properties || configurationGroup.properties;

    return (
        <React.Fragment>
            {properties.map((property: ConfigurationGroupProperty) => {
                // Handle OptionType.COLLECTION
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
                                    [property.identifier]: updatedVal,
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
                        <ConfigurationInputFormGroup
                            card
                            enabled={!!val.enabled}
                            property={property}
                            key={property.identifier}
                            onChangeEnabled={updatedEnabled => {
                                props.onChange({
                                    ...props.value,
                                    [property.identifier]: {
                                        ...val,
                                        enabled: updatedEnabled,
                                    },
                                });
                            }}
                        >
                            <ConfigurationGroupPropertiesInput
                                properties={property.properties}
                                onChange={(updatedVal: OptionValueInstance) => {
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
                                value={property.allowDisable ? val.value : val}
                            />
                        </ConfigurationInputFormGroup>
                    );
                }

                // Handle OptionType.STRING + OptionType.NUMBER + OptionType.BOOLEAN + OptionType.BOOLEAN
                // @ts-ignore
                const value = props.value[property.identifier];
                return (
                    <ConfigurationInputFormGroup
                        card
                        enabled={!!value.enabled}
                        property={property}
                        key={property.identifier}
                        onChangeEnabled={(updatedEnabled: boolean) => {
                            props.onChange({
                                ...props.value,
                                [property.identifier]: {
                                    ...value,
                                    enabled: updatedEnabled,
                                },
                            });
                        }}
                    >
                        <ConfigurationInputChild
                            value={value}
                            property={property}
                            onChange={(updatedValue: OptionValue) => {
                                props.onChange({
                                    ...props.value,
                                    [property.identifier]: updatedValue,
                                });
                            }}
                        />
                    </ConfigurationInputFormGroup>
                );
            })}
        </React.Fragment>
    );
}
