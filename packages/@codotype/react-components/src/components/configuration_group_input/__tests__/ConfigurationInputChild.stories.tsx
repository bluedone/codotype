import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ConfigurationInputChild } from "../ConfigurationInputChild";
import { OptionValue, ConfigurationGroupProperty } from "@codotype/types";
import {
    ComponentBuilderConfigurationGroupPropertySingleDropdown,
    ComponentBuilderConfigurationGroupPropertySingleNumber,
    ComponentBuilderConfigurationGroupPropertySingleText,
    twitterApiOption,
} from "./test_state";
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
        return (
            <Story>
                <ConfigurationInputChild
                    property={story[1]}
                    value={story[2]}
                    onChange={(updatedVal: OptionValue) => {
                        console.log(updatedVal);
                    }}
                />
            </Story>
        );
    });
});
