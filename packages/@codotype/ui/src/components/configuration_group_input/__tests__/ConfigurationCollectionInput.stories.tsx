import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ConfigurationCollectionInput } from "../ConfigurationCollectionInput";
import {
    testState,
    ConfigurationGroup,
    OptionValue,
    buildConfigurationGroupPropertyValue,
    buildTokenPluralization,
    Codotype,
    OptionType,
    PropertyLayoutVariant,
    StringValueFilter,
    DataPreviewLayoutVariant,
    DataPreviewActionType,
    DataPreviewConstraintType,
} from "@codotype/core";
const { LambdaBuilderConfigurationGroup } = testState;
import { Story } from "../../dev";
import { ConfigurationInputFormGroup } from "../ConfigurationInputFormGroup";

// // // //

// TODO - move into `test_data`
// TODO - export StringValueFilter + NumberValueFilter + Validations from @codotype/type (and include constructors as well!)
const ApiActionConfigurationGroup: ConfigurationGroup = new Codotype.ConfigurationGroup(
    {
        label: "API Actions",
        identifier: "api_actions",
        description: "Define individual REST API actions for your API",
        properties: [
            new Codotype.ConfigurationGroupProperty({
                label: "Actions",
                identifier: "actions",
                type: OptionType.COLLECTION,
                dataPreview: {
                    rules: [
                        {
                            constraint: {
                                dataProperty: "function_name",
                                type: DataPreviewConstraintType.equals,
                                value: "",
                            },
                            action: {
                                type: DataPreviewActionType.literal,
                                template: "",
                            },
                        },
                        {
                            constraint: {
                                dataProperty: "route",
                                type: DataPreviewConstraintType.equals,
                                value: "",
                            },
                            action: {
                                type: DataPreviewActionType.literal,
                                template: "",
                            },
                        },
                        {
                            constraint: {
                                dataProperty: "scope",
                                type: DataPreviewConstraintType.equals,
                                value: "COLLECTION",
                            },
                            action: {
                                type: DataPreviewActionType.stringTemplate,
                                template:
                                    "{{data.verb}} /api/schema-scope/{{data.route}} -> {{data.function_name}}",
                            },
                        },
                        {
                            constraint: {
                                dataProperty: "scope",
                                type: DataPreviewConstraintType.equals,
                                value: "MODEL",
                            },
                            action: {
                                type: DataPreviewActionType.stringTemplate,
                                template:
                                    "{{data.verb}} /api/schema-scope/:id/{{data.route}} -> {{data.function_name}}",
                            },
                        },
                    ],
                    variant: DataPreviewLayoutVariant.CODE_DARK,
                },
                properties: [
                    new Codotype.ConfigurationGroupProperty({
                        label: "Verb",
                        identifier: "verb",
                        description: "Verify",
                        defaultValue: "GET",
                        type: OptionType.DROPDOWN,
                        layoutVariant: PropertyLayoutVariant.COL_6,
                        dropdownOptions: [
                            { value: "GET", label: "GET" },
                            { value: "POST", label: "POST" },
                            { value: "PUT", label: "PUT" },
                            { value: "DELETE", label: "DELETE" },
                        ],
                    }),
                    new Codotype.ConfigurationGroupProperty({
                        label: "Route",
                        identifier: "route",
                        description: "Route",
                        defaultValue: "verify",
                        type: OptionType.STRING,
                        layoutVariant: PropertyLayoutVariant.COL_6,
                        filters: [
                            StringValueFilter.nonumbers,
                            StringValueFilter.trimwhitespace,
                            StringValueFilter.removewhitespace,
                        ],
                    }),
                    new Codotype.ConfigurationGroupProperty({
                        label: "Function Name",
                        identifier: "function_name",
                        description: "function_name",
                        defaultValue: "verify",
                        layoutVariant: PropertyLayoutVariant.COL_6,
                        type: OptionType.STRING,
                        filters: [
                            StringValueFilter.camelcase,
                            StringValueFilter.nonumbers,
                            StringValueFilter.nosymbols,
                            StringValueFilter.trimwhitespace,
                            StringValueFilter.removewhitespace,
                        ],
                    }),
                    new Codotype.ConfigurationGroupProperty({
                        label: "Scope",
                        identifier: "scope",
                        description: "scope",
                        defaultValue: "COLLECTION",
                        layoutVariant: PropertyLayoutVariant.COL_6,
                        type: OptionType.DROPDOWN,
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
        buildConfigurationGroupPropertyValue(
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
    "ConfigurationEditor/ConfigurationCollectionInput",
    module,
);

// // // //

stories.forEach(story => {
    storyCollection.add(story[0], () => {
        const [value, setValue] = React.useState<OptionValue>(story[2]);

        // TODO - fix this, including extra value by default
        console.log("DEFAULT VALUE");
        console.log(
            buildConfigurationGroupPropertyValue(story[1].properties[0]),
        );

        return (
            <Story>
                <ConfigurationInputFormGroup property={story[1].properties[0]}>
                    <ConfigurationCollectionInput
                        identifiers={buildTokenPluralization("Lambda")}
                        properties={story[1].properties[0].properties}
                        dataPreview={story[1].properties[0].dataPreview}
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
