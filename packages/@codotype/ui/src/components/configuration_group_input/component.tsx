import * as React from "react";
import {
    OptionType,
    OptionValue,
    OptionValueInstance,
    ConfigurationGroupProperty,
    ConfigurationGroup,
    GroupLayoutVariant,
    EMPTY_TOKEN_CASING,
} from "@codotype/types";
import { ConfigurationInputChild } from "./ConfigurationInputChild";
import { ConfigurationGroupVariant } from "./ConfigurationGroupVariant";
import { ConfigurationGroupHeader } from "./ConfigurationGroupHeader";
import { ConfigurationInputFormGroup } from "./ConfigurationInputFormGroup";
import { ConfigurationInstanceInput } from "./ConfigurationInstanceInput";
import { ConfigurationCollectionInput } from "./ConfigurationCollectionInput";

// // // //

/**
 * shouldRenderDocumentationModal
 * Determines whether or not the DocumentationModal should render for this ConfigurationGroup
 * Depends on the LayoutVariant
 * @param configurationGroup
 */
export function shouldRenderDocumentationModal(
    configurationGroup: ConfigurationGroup,
): boolean {
    const { layoutVariant, documentation } = configurationGroup;

    // Return false if documentation is not defined
    if (!documentation) {
        return false;
    }

    // Return false for DOCS_* layout variants
    if (
        [
            GroupLayoutVariant.DOCS_3x9,
            GroupLayoutVariant.DOCS_4x8,
            GroupLayoutVariant.DOCS_6x6,
        ].includes(layoutVariant)
    ) {
        return false;
    }

    // Return true for all others
    return true;
}

// // // //

interface ConfigurationInputProps {
    value: OptionValueInstance;
    configurationGroup: ConfigurationGroup;
    onChange: (updatedVal: OptionValueInstance) => void;
}
// TODO - add prop here to adjust styles when rendered for a schema instead of a project
export function ConfigurationInput(props: ConfigurationInputProps) {
    const { configurationGroup } = props;

    if (!configurationGroup.properties) {
        console.log("WARNING - NO CONFIGURATION GROUP PROPERTIES DEFINED");
        return null;
    }
    return (
        <div className="row mt-3">
            <div className="col-lg-12">
                {/* ConfigurationGroupHeader */}
                <ConfigurationGroupHeader
                    configurationGroup={configurationGroup}
                    enableDocumentationModal={shouldRenderDocumentationModal(
                        configurationGroup,
                    )}
                />

                {/* Renders ConfigurationGroup variants */}
                {/* QUESTION - maybe rename to `layout`? */}
                <ConfigurationGroupVariant
                    configurationGroup={configurationGroup}
                >
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
                </ConfigurationGroupVariant>
            </div>
        </div>
    );
}
