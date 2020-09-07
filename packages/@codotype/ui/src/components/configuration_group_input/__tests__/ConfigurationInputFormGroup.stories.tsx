import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ConfigurationInputFormGroup } from "../ConfigurationInputFormGroup";
import { ConfigurationInputChild } from "../ConfigurationInputChild";
import {
    OptionValue,
    ConfigurationGroupProperty,
    PropertyLayoutVariant,
    testState,
} from "@codotype/core";
const {
    ComponentBuilderConfigurationGroupPropertySingleDropdown,
    ComponentBuilderConfigurationGroupPropertySingleNumber,
    ComponentBuilderConfigurationGroupPropertySingleText,
    twitterApiOption,
} = testState;

import { Story } from "../../dev";

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
    // PropertyLayoutVariant Stories
    [
        "PropertyLayoutVariant.COL_3",
        {
            ...ComponentBuilderConfigurationGroupPropertySingleText,
            layoutVariant: PropertyLayoutVariant.COL_3,
        },
        "foobar",
    ],
    [
        "PropertyLayoutVariant.CARD_COL_3",
        {
            ...ComponentBuilderConfigurationGroupPropertySingleText,
            layoutVariant: PropertyLayoutVariant.CARD_COL_3,
        },
        "foobar",
    ],
    [
        "PropertyLayoutVariant.COL_4",
        {
            ...ComponentBuilderConfigurationGroupPropertySingleText,
            layoutVariant: PropertyLayoutVariant.COL_4,
        },
        "foobar",
    ],
    [
        "PropertyLayoutVariant.CARD_COL_4",
        {
            ...ComponentBuilderConfigurationGroupPropertySingleText,
            layoutVariant: PropertyLayoutVariant.CARD_COL_4,
        },
        "foobar",
    ],

    [
        "PropertyLayoutVariant.COL_6",
        {
            ...ComponentBuilderConfigurationGroupPropertySingleText,
            layoutVariant: PropertyLayoutVariant.COL_6,
        },
        "foobar",
    ],
    [
        "PropertyLayoutVariant.CARD_COL_6",
        {
            ...ComponentBuilderConfigurationGroupPropertySingleText,
            layoutVariant: PropertyLayoutVariant.CARD_COL_6,
        },
        "foobar",
    ],

    [
        "PropertyLayoutVariant.COL_8",
        {
            ...ComponentBuilderConfigurationGroupPropertySingleText,
            layoutVariant: PropertyLayoutVariant.COL_8,
        },
        "foobar",
    ],
    [
        "PropertyLayoutVariant.CARD_COL_8",
        {
            ...ComponentBuilderConfigurationGroupPropertySingleText,
            layoutVariant: PropertyLayoutVariant.CARD_COL_8,
        },
        "foobar",
    ],

    [
        "PropertyLayoutVariant.COL_12",
        {
            ...ComponentBuilderConfigurationGroupPropertySingleText,
            layoutVariant: PropertyLayoutVariant.COL_12,
        },
        "foobar",
    ],
    [
        "PropertyLayoutVariant.CARD_COL_12",
        {
            ...ComponentBuilderConfigurationGroupPropertySingleText,
            layoutVariant: PropertyLayoutVariant.CARD_COL_12,
        },
        "foobar",
    ],
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
