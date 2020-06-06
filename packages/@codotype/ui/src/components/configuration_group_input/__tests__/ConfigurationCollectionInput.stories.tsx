import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ConfigurationCollectionInput } from "../ConfigurationCollectionInput";
import {
    OptionValueInstance,
    testState,
    ConfigurationGroup,
    OptionValue,
} from "@codotype/types";
const { LambdaBuilderConfigurationGroup } = testState;
import { Story } from "@src/components/dev";
import {
    buildConfigurationGroupValue,
    buildConfigurationGroupPropertyValue,
} from "@codotype/util";

// // // //

const stories: [string, ConfigurationGroup, OptionValueInstance][] = [
    ["render", LambdaBuilderConfigurationGroup, {}],
];

const storyCollection = storiesOf(
    "ConfigurationEditor/ConfigurationCollectionInput",
    module,
);

// // // //

stories.forEach(story => {
    storyCollection.add(story[0], () => {
        const [value, setValue] = React.useState<OptionValue>(
            buildConfigurationGroupPropertyValue(story[1].properties[0]),
        );
        return (
            <Story>
                <ConfigurationCollectionInput
                    label="Lambda Functions"
                    identifiers={{
                        singular: {
                            label: "Lambdasss",
                            snake: "lambdasss",
                            camel: "lambdasss",
                            pascal: "Lambdasss",
                            kebab: "lambdasss",
                        },
                        plural: {
                            label: "Lambdassss",
                            snake: "lambdassss",
                            camel: "lambdassss",
                            pascal: "Lambdassss",
                            kebab: "lambdassss",
                        },
                    }}
                    properties={story[1].properties[0].properties}
                    value={value}
                    onChange={(updatedVal: OptionValue) => {
                        setValue(updatedVal);
                    }}
                />
            </Story>
        );
    });
});
