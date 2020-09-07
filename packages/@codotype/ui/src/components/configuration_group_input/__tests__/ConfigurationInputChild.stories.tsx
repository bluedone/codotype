import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ConfigurationInputChild } from "../ConfigurationInputChild";
import {
    ConfigurationGroupProperty,
    OptionValue,
    testState,
    StringValueFilter,
    NumberValueFilter,
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
    ["number", ComponentBuilderConfigurationGroupPropertySingleNumber, 10],
    ["string", ComponentBuilderConfigurationGroupPropertySingleText, "foobar"],
    ["boolean", twitterApiOption, true],
];

// // // //

const storyCollection = storiesOf(
    "ConfigurationEditor/ConfigurationInputChild",
    module,
);

stories.forEach(story => {
    storyCollection.add(story[0], () => {
        const [value, setValue] = React.useState<OptionValue>(story[2]);
        return (
            <Story>
                <ConfigurationInputChild
                    property={story[1]}
                    value={value}
                    onChange={(updatedValue: OptionValue) => {
                        setValue(updatedValue);
                    }}
                />
            </Story>
        );
    });
});

// // // //

const numberPropertyFilterStories = storiesOf(
    "ConfigurationEditor/ConfigurationInputChild/StringPropertyFilter",
    module,
);

[
    [StringValueFilter.lowercase],
    [StringValueFilter.uppercase],
    [StringValueFilter.titlecase],
    [StringValueFilter.camelcase],
    [StringValueFilter.snakecase],
    [StringValueFilter.pascalcase],
    [StringValueFilter.kebabcase],
    [StringValueFilter.nonumbers],
    [StringValueFilter.nosymbols],
    [StringValueFilter.trimwhitespace],
    [StringValueFilter.removewhitespace],
    [StringValueFilter.nosymbols, StringValueFilter.snakecase],
    [StringValueFilter.nosymbols, StringValueFilter.pascalcase],
    [
        StringValueFilter.nosymbols,
        StringValueFilter.nonumbers,
        StringValueFilter.titlecase,
        StringValueFilter.titlecase,
        StringValueFilter.removewhitespace,
    ],
].forEach(propertyFilters => {
    numberPropertyFilterStories.add(propertyFilters.join(" + "), () => {
        const [value, setValue] = React.useState<OptionValue>("");
        return (
            <Story>
                <pre>{propertyFilters.join(" + ")}</pre>
                <ConfigurationInputChild
                    property={{
                        ...ComponentBuilderConfigurationGroupPropertySingleText,
                        filters: [...propertyFilters],
                    }}
                    value={value}
                    onChange={(updatedValue: OptionValue) => {
                        setValue(updatedValue);
                    }}
                />
            </Story>
        );
    });
});

// // // //

const stringPropertyFilterStories = storiesOf(
    "ConfigurationEditor/ConfigurationInputChild/NumberPropertyFilter",
    module,
);

[
    [NumberValueFilter.integerValue],
    [NumberValueFilter.negativeValue],
    [NumberValueFilter.positiveValue],
    [NumberValueFilter.positiveValue, NumberValueFilter.integerValue],
].forEach(propertyFilters => {
    stringPropertyFilterStories.add(propertyFilters.join(" + "), () => {
        const [value, setValue] = React.useState<OptionValue>("");
        return (
            <Story>
                <pre>{propertyFilters.join(" + ")}</pre>
                <ConfigurationInputChild
                    property={{
                        ...ComponentBuilderConfigurationGroupPropertySingleNumber,
                        filters: [...propertyFilters],
                    }}
                    value={value}
                    onChange={(updatedValue: OptionValue) => {
                        setValue(updatedValue);
                    }}
                />
            </Story>
        );
    });
});
