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
} from "@codotype/core";
const { LambdaBuilderConfigurationGroup } = testState;
import { Story } from "@src/components/dev";
import { ConfigurationInputFormGroup } from "../ConfigurationInputFormGroup";

// // // //

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
            buildConfigurationGroupPropertyValue(
                LambdaBuilderConfigurationGroup.properties[0],
            ),
        );

        return (
            <Story>
                <ConfigurationInputFormGroup
                    property={LambdaBuilderConfigurationGroup.properties[0]}
                >
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
