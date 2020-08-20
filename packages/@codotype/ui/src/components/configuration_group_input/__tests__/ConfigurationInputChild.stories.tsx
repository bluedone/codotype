import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ConfigurationInputChild } from "../ConfigurationInputChild";
import {
    OptionValue,
    ConfigurationGroupProperty,
    testState,
} from "@codotype/core";
const {
    ComponentBuilderConfigurationGroupPropertySingleDropdown,
    ComponentBuilderConfigurationGroupPropertySingleNumber,
    ComponentBuilderConfigurationGroupPropertySingleText,
    twitterApiOption,
} = testState;

import { Story } from "@src/components/dev";

// // // //

const stories: Array<[string, ConfigurationGroupProperty, OptionValue]> = [
    [
        "dropdown",
        ComponentBuilderConfigurationGroupPropertySingleDropdown,
        "OPTION_01",
    ],
    ["number", ComponentBuilderConfigurationGroupPropertySingleNumber, 10],
    ["string", ComponentBuilderConfigurationGroupPropertySingleText, "foobar"],
    ["boolean", twitterApiOption, true],
];

const storyCollection = storiesOf(
    "ConfigurationEditor/ConfigurationInputChild",
    module,
);

// // // //

stories.forEach(story => {
    storyCollection.add(story[0], () => {
        const [value, setValue] = React.useState<OptionValue>(story[2]);
        return (
            <Story>
                <ConfigurationInputChild
                    property={story[1]}
                    value={value}
                    onChange={(updatedValue: OptionValue) => {
                        setValue(updatedValue)
                    }}
                />
            </Story>
        );
    });
});
