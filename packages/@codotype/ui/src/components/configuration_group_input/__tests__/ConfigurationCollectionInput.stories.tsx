import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ConfigurationCollectionInput } from "../ConfigurationCollectionInput";
import {
    OptionValueInstance,
    testState,
    ConfigurationGroup,
    OptionValue,
    buildConfigurationGroupValue,
    buildConfigurationGroupPropertyValue,
    buildTokenPluralization,
    Codotype,
    OptionType,
    PropertyLayoutVariant,
} from "@codotype/core";
const { LambdaBuilderConfigurationGroup } = testState;
import { Story } from "@src/components/dev";
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
                    }),
                    new Codotype.ConfigurationGroupProperty({
                        label: "Function Name",
                        identifier: "function_name",
                        description: "function_name",
                        defaultValue: "verify",
                        layoutVariant: PropertyLayoutVariant.COL_6,
                        type: OptionType.STRING,
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
