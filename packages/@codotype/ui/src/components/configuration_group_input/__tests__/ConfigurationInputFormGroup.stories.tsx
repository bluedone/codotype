import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ConfigurationInputFormGroup } from "../ConfigurationInputFormGroup";
import { ConfigurationInputChild } from "../ConfigurationInputChild";
import {
    OptionValue,
    ConfigurationProperty,
    PropertyLayoutVariants,
    testState,
} from "@codotype/core";
const {
    ComponentBuilderConfigurationPropertySingleDropdown,
    ComponentBuilderConfigurationPropertySingleNumber,
    ComponentBuilderConfigurationPropertySingleText,
    twitterApiOption,
} = testState;

import { Story } from "../../dev";

// // // //

const stories: Array<[string, ConfigurationProperty, OptionValue]> = [
    [
        "dropdown",
        ComponentBuilderConfigurationPropertySingleDropdown,
        "OPTION_01",
    ],
    [
        "dropdown (allowDisable, enabled = true)",
        {
            ...ComponentBuilderConfigurationPropertySingleDropdown,
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
            ...ComponentBuilderConfigurationPropertySingleDropdown,
            allowDisable: true,
        },
        {
            enabled: false,
            value: "OPTION_01",
        },
    ],
    ["number", ComponentBuilderConfigurationPropertySingleNumber, 10],
    ["string", ComponentBuilderConfigurationPropertySingleText, "foobar"],
    ["boolean", twitterApiOption, true],
    // PropertyLayoutVariant Stories
    [
        "PropertyLayoutVariants.COL_3",
        {
            ...ComponentBuilderConfigurationPropertySingleText,
            layoutVariant: PropertyLayoutVariants.COL_3,
        },
        "foobar",
    ],
    [
        "PropertyLayoutVariants.CARD_COL_3",
        {
            ...ComponentBuilderConfigurationPropertySingleText,
            layoutVariant: PropertyLayoutVariants.CARD_COL_3,
        },
        "foobar",
    ],
    [
        "PropertyLayoutVariants.COL_4",
        {
            ...ComponentBuilderConfigurationPropertySingleText,
            layoutVariant: PropertyLayoutVariants.COL_4,
        },
        "foobar",
    ],
    [
        "PropertyLayoutVariants.CARD_COL_4",
        {
            ...ComponentBuilderConfigurationPropertySingleText,
            layoutVariant: PropertyLayoutVariants.CARD_COL_4,
        },
        "foobar",
    ],

    [
        "PropertyLayoutVariants.COL_6",
        {
            ...ComponentBuilderConfigurationPropertySingleText,
            layoutVariant: PropertyLayoutVariants.COL_6,
        },
        "foobar",
    ],
    [
        "PropertyLayoutVariants.CARD_COL_6",
        {
            ...ComponentBuilderConfigurationPropertySingleText,
            layoutVariant: PropertyLayoutVariants.CARD_COL_6,
        },
        "foobar",
    ],

    [
        "PropertyLayoutVariants.COL_8",
        {
            ...ComponentBuilderConfigurationPropertySingleText,
            layoutVariant: PropertyLayoutVariants.COL_8,
        },
        "foobar",
    ],
    [
        "PropertyLayoutVariants.CARD_COL_8",
        {
            ...ComponentBuilderConfigurationPropertySingleText,
            layoutVariant: PropertyLayoutVariants.CARD_COL_8,
        },
        "foobar",
    ],

    [
        "PropertyLayoutVariants.COL_12",
        {
            ...ComponentBuilderConfigurationPropertySingleText,
            layoutVariant: PropertyLayoutVariants.COL_12,
        },
        "foobar",
    ],
    [
        "PropertyLayoutVariants.CARD_COL_12",
        {
            ...ComponentBuilderConfigurationPropertySingleText,
            layoutVariant: PropertyLayoutVariants.CARD_COL_12,
        },
        "foobar",
    ],
];

const storyCollection = storiesOf(
    "ProjectEditor/ConfigurationEditor/ConfigurationInputFormGroup",
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
