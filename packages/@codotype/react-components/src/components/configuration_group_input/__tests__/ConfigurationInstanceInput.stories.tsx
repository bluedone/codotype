import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ConfigurationInstanceInput } from "../ConfigurationInstanceInput";
import { OptionValueInstance, ConfigurationGroupProperty } from "../../types";
import {
    ComponentBuilderConfigurationGroupPropertySingleDropdown,
    ComponentBuilderConfigurationGroupPropertySingleNumber,
    ComponentBuilderConfigurationGroupPropertySingleText,
    twitterApiOption,
} from "./test_state";
import { Story } from "@src/components/dev";

// // // //

const stories: [string, ConfigurationGroupProperty[], OptionValueInstance][] = [
    [
        "dropdown",
        [
            ComponentBuilderConfigurationGroupPropertySingleDropdown,
            ComponentBuilderConfigurationGroupPropertySingleNumber,
        ],
        {},
    ],
    ["number", [ComponentBuilderConfigurationGroupPropertySingleNumber], {}],
    ["string", [ComponentBuilderConfigurationGroupPropertySingleText], {}],
    ["boolean", [twitterApiOption], {}],
];

const storyCollection = storiesOf(
    "ConfigurationEditor/ConfigurationInstanceInput",
    module,
);

// // // //

stories.forEach(story => {
    storyCollection.add(story[0], () => {
        return (
            <Story>
                <ConfigurationInstanceInput
                    label="Instance Label"
                    properties={story[1]}
                    value={{}}
                    onChange={(updatedVal: OptionValueInstance) => {
                        console.log(updatedVal);
                    }}
                />
            </Story>
        );
    });
});
