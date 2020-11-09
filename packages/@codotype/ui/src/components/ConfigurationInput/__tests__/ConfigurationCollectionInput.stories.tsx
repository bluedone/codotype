import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ConfigurationCollectionInput } from "../ConfigurationCollectionInput";
import {
    testState,
    ConfigurationGroup,
    OptionValue,
    buildConfigurationPropertyValue,
    buildTokenPluralization,
    PropertyTypes,
    PropertyLayoutVariants,
    StringPropertyTransformations,
    PropertyPreviewLayoutVariant,
    PropertyPreviewActionTypes,
    PropertyPreviewConstraintTypes,
    Primatives,
} from "@codotype/core";
const { LambdaBuilderConfigurationGroup } = testState;
import { Story } from "../../Story";
import { ConfigurationInputFormGroup } from "../ConfigurationInputFormGroup";

// // // //

// CHORE - move into `test_data`
const ApiActionConfigurationGroup: ConfigurationGroup = new Primatives.ConfigurationGroup(
    {
        content: {
            label: "API Actions",
            description: "Define individual REST API actions for your API",
        },
        identifier: "api_actions",
        properties: [
            new Primatives.ConfigurationProperty({
                content: {
                    label: "Actions",
                },
                identifier: "actions",
                type: PropertyTypes.COLLECTION,
                preview: {
                    rules: [
                        {
                            constraint: {
                                dataProperty: "function_name",
                                type: PropertyPreviewConstraintTypes.equals,
                                value: "",
                            },
                            action: {
                                type: PropertyPreviewActionTypes.literal,
                                template: "",
                            },
                        },
                        {
                            constraint: {
                                dataProperty: "route",
                                type: PropertyPreviewConstraintTypes.equals,
                                value: "",
                            },
                            action: {
                                type: PropertyPreviewActionTypes.literal,
                                template: "",
                            },
                        },
                        {
                            constraint: {
                                dataProperty: "scope",
                                type: PropertyPreviewConstraintTypes.equals,
                                value: "COLLECTION",
                            },
                            action: {
                                type: PropertyPreviewActionTypes.stringTemplate,
                                template:
                                    "{{data.verb}} /api/schema-scope/{{data.route}} -> {{data.function_name}}",
                            },
                        },
                        {
                            constraint: {
                                dataProperty: "scope",
                                type: PropertyPreviewConstraintTypes.equals,
                                value: "MODEL",
                            },
                            action: {
                                type: PropertyPreviewActionTypes.stringTemplate,
                                template:
                                    "{{data.verb}} /api/schema-scope/:id/{{data.route}} -> {{data.function_name}}",
                            },
                        },
                    ],
                    variant: PropertyPreviewLayoutVariant.CODE_DARK,
                },
                properties: [
                    new Primatives.ConfigurationProperty({
                        content: {
                            label: "Verb",
                            description: "Verify",
                        },
                        identifier: "verb",
                        defaultValue: "GET",
                        type: PropertyTypes.DROPDOWN,
                        layoutVariant: PropertyLayoutVariants.COL_6,
                        dropdownOptions: [
                            { value: "GET", label: "GET" },
                            { value: "POST", label: "POST" },
                            { value: "PUT", label: "PUT" },
                            { value: "DELETE", label: "DELETE" },
                        ],
                    }),
                    new Primatives.ConfigurationProperty({
                        content: {
                            label: "Route",
                            description: "Route",
                        },
                        identifier: "route",
                        defaultValue: "verify",
                        type: PropertyTypes.STRING,
                        layoutVariant: PropertyLayoutVariants.COL_6,
                        transformations: [
                            StringPropertyTransformations.nonumbers,
                            StringPropertyTransformations.trimwhitespace,
                            StringPropertyTransformations.removewhitespace,
                        ],
                    }),
                    new Primatives.ConfigurationProperty({
                        content: {
                            label: "Function Name",
                            description: "function_name",
                        },
                        identifier: "function_name",
                        defaultValue: "verify",
                        layoutVariant: PropertyLayoutVariants.COL_6,
                        type: PropertyTypes.STRING,
                        transformations: [
                            StringPropertyTransformations.camelcase,
                            StringPropertyTransformations.nonumbers,
                            StringPropertyTransformations.nosymbols,
                            StringPropertyTransformations.trimwhitespace,
                            StringPropertyTransformations.removewhitespace,
                        ],
                    }),
                    new Primatives.ConfigurationProperty({
                        content: {
                            label: "Scope",
                            description: "scope",
                        },
                        identifier: "scope",
                        defaultValue: "COLLECTION",
                        layoutVariant: PropertyLayoutVariants.COL_6,
                        type: PropertyTypes.DROPDOWN,
                        dropdownOptions: [
                            { value: "COLLECTION", label: "Collection" },
                            { value: "MODEL", label: "Model" },
                        ],
                    }),
                ],
            }),
        ],
    },
);

const stories: [string, ConfigurationGroup, OptionValue][] = [
    [
        "render",
        LambdaBuilderConfigurationGroup,
        buildConfigurationPropertyValue(
            LambdaBuilderConfigurationGroup.properties[0],
        ),
    ],
    [
        "render w/ props.value",
        LambdaBuilderConfigurationGroup,
        [{ id: "123", lambdaName: "Foobar", language: "typescript" }],
    ],
    ["API Actions", ApiActionConfigurationGroup, []],
];

const storyCollection = storiesOf(
    "Components/ProjectEditor/ConfigurationEditor/ConfigurationCollectionInput",
    module,
);

// // // //

stories.forEach(story => {
    storyCollection.add(story[0], () => {
        const [value, setValue] = React.useState<OptionValue>(story[2]);

        // TODO - fix this, including extra value by default
        console.log("DEFAULT VALUE");
        console.log(buildConfigurationPropertyValue(story[1].properties[0]));

        return (
            <Story>
                <ConfigurationInputFormGroup property={story[1].properties[0]}>
                    <ConfigurationCollectionInput
                        identifiers={buildTokenPluralization("Lambda")}
                        properties={story[1].properties[0].properties}
                        propertyPreview={story[1].properties[0].preview}
                        value={value}
                        onChange={(updatedVal: OptionValue) => {
                            setValue(updatedVal);
                        }}
                    />
                </ConfigurationInputFormGroup>
                <hr />
                <pre className="bg-dark rounded p-2 text-light">
                    {JSON.stringify({ value }, null, 4)}
                </pre>
            </Story>
        );
    });
});
