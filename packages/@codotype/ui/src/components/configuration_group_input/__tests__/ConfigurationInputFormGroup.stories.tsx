import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ConfigurationInputFormGroup } from "../ConfigurationInputFormGroup";
import { ConfigurationInputChild } from "../ConfigurationInputChild";
import {
    OptionValue,
    ConfigurationGroupProperty,
    PropertyLayoutVariant,
    testState,
} from "@codotype/types";
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
    [
        "dropdown (allowDisable, enabled = true)",
        {
            ...ComponentBuilderConfigurationGroupPropertySingleDropdown,
            allowDisable: true,
        },
        {
            enabled: true,
            value: "OPTION_01",
        },
    ],
    [
        "dropdown (allowDisable, enabled = false)",
        {
            ...ComponentBuilderConfigurationGroupPropertySingleDropdown,
            allowDisable: true,
        },
        {
            enabled: false,
            value: "OPTION_01",
        },
    ],
    ["number", ComponentBuilderConfigurationGroupPropertySingleNumber, 10],
    ["string", ComponentBuilderConfigurationGroupPropertySingleText, "foobar"],
    ["boolean", twitterApiOption, true],
];

const storyCollection = storiesOf(
    "ConfigurationEditor/ConfigurationInputFormGroup",
    module,
);

// // // //

stories.forEach(story => {
    storyCollection.add(story[0], () => {
        const [value, setValue] = React.useState<OptionValue>(story[2]);
        const property = story[1];
        let enabled = false;
        if (property.allowDisable && typeof value == "object") {
            // @ts-ignore
            enabled = value.enabled;
        }
        return (
            <Story>
                <ConfigurationInputFormGroup
                    card
                    property={property}
                    enabled={enabled}
                    onChangeEnabled={(updatedEnabled: boolean) => {
                        setValue({
                            // @ts-ignore
                            value: value.value,
                            enabled: updatedEnabled,
                        });
                    }}
                >
                    <ConfigurationInputChild
                        property={property}
                        value={value}
                        onChange={(updatedValue: OptionValue) => {
                            console.log(updatedValue);
                            setValue(updatedValue);
                        }}
                    />
                </ConfigurationInputFormGroup>
            </Story>
        );
    });
});
