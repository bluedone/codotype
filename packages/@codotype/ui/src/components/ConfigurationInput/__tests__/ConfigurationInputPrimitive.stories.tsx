import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ConfigurationInputPrimitive } from "../ConfigurationInputPrimitive";
import {
    ConfigurationProperty,
    ConfigurationPropertyValue,
    testState,
    StringPropertyTransformations,
    NumberPropertyTransformations,
    PropertyTypes,
} from "@codotype/core";
const {
    ComponentBuilderConfigurationPropertySingleDropdown,
    ComponentBuilderConfigurationPropertySingleNumber,
    ComponentBuilderConfigurationPropertySingleText,
    twitterApiOption,
} = testState;
import { Story } from "../../Story";

// // // //

const stories: Array<[
    string,
    ConfigurationProperty,
    ConfigurationPropertyValue,
]> = [
    [
        "dropdown",
        ComponentBuilderConfigurationPropertySingleDropdown,
        "OPTION_01",
    ],
    [
        "radio group",
        {
            ...ComponentBuilderConfigurationPropertySingleDropdown,
            content: {
                label: "Radio Group",
                description: "This is an input for PropertyTypes.RADIO_GROUP",
                documentation: "",
                icon: "",
            },
            type: PropertyTypes.RADIO_GROUP,
            selectOptions: [
                {
                    label: "Vercel",
                    value: "vercel",
                    description: "This is the vercel description",
                    documentation: "",
                    icon:
                        "https://assets.pipedream.net/s.v0/app_1xohRm/logo/orig",
                },
                {
                    label: "Netlify",
                    value: "netlify",
                    description: "This is the netlify description",
                    documentation: "",
                    icon:
                        "https://www.netlify.com/img/press/logos/logomark.png",
                },
                {
                    label: "GitHub Pages",
                    value: "github_pages",
                    description: "This is the github_pages description",
                    documentation: "",
                    icon:
                        "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
                },
                {
                    label: "None",
                    value: "none",
                    description: "This is the none description",
                    documentation: "",
                    icon: "",
                },
            ],
        },
        "vercel",
    ],
    ["number", ComponentBuilderConfigurationPropertySingleNumber, 10],
    ["string", ComponentBuilderConfigurationPropertySingleText, "foobar"],
    ["boolean", twitterApiOption, true],
];

// // // //

const storyCollection = storiesOf(
    "Components/ProjectEditor/ConfigurationEditor/ConfigurationInputPrimitive",
    module,
);

stories.forEach(story => {
    storyCollection.add(story[0], () => {
        const [value, setValue] = React.useState<ConfigurationPropertyValue>(
            story[2],
        );
        return (
            <Story>
                <ConfigurationInputPrimitive
                    property={story[1]}
                    value={value}
                    onChange={(updatedValue: ConfigurationPropertyValue) => {
                        setValue(updatedValue);
                    }}
                />
            </Story>
        );
    });
});

// // // //

const numberPropertyFilterStories = storiesOf(
    "Components/ProjectEditor/ConfigurationEditor/ConfigurationInputPrimitive/StringPropertyFilter",
    module,
);

[
    [StringPropertyTransformations.lowercase],
    [StringPropertyTransformations.uppercase],
    [StringPropertyTransformations.titlecase],
    [StringPropertyTransformations.camelcase],
    [StringPropertyTransformations.snakecase],
    [StringPropertyTransformations.pascalcase],
    [StringPropertyTransformations.kebabcase],
    [StringPropertyTransformations.nonumbers],
    [StringPropertyTransformations.nosymbols],
    [StringPropertyTransformations.trimwhitespace],
    [StringPropertyTransformations.removewhitespace],
    [
        StringPropertyTransformations.nosymbols,
        StringPropertyTransformations.snakecase,
    ],
    [
        StringPropertyTransformations.nosymbols,
        StringPropertyTransformations.pascalcase,
    ],
    [
        StringPropertyTransformations.nosymbols,
        StringPropertyTransformations.nonumbers,
        StringPropertyTransformations.titlecase,
        StringPropertyTransformations.titlecase,
        StringPropertyTransformations.removewhitespace,
    ],
].forEach(propertyFilters => {
    numberPropertyFilterStories.add(propertyFilters.join(" + "), () => {
        const [value, setValue] = React.useState<ConfigurationPropertyValue>(
            "",
        );
        return (
            <Story>
                <pre>{propertyFilters.join(" + ")}</pre>
                <ConfigurationInputPrimitive
                    property={{
                        ...ComponentBuilderConfigurationPropertySingleText,
                        transformations: [...propertyFilters],
                    }}
                    value={value}
                    onChange={(updatedValue: ConfigurationPropertyValue) => {
                        setValue(updatedValue);
                    }}
                />
            </Story>
        );
    });
});

// // // //

const stringPropertyFilterStories = storiesOf(
    "Components/ProjectEditor/ConfigurationEditor/ConfigurationInputPrimitive/NumberPropertyFilter",
    module,
);

[
    [NumberPropertyTransformations.integerValue],
    [NumberPropertyTransformations.negativeValue],
    [NumberPropertyTransformations.positiveValue],
    [
        NumberPropertyTransformations.positiveValue,
        NumberPropertyTransformations.integerValue,
    ],
].forEach(propertyFilters => {
    stringPropertyFilterStories.add(propertyFilters.join(" + "), () => {
        const [value, setValue] = React.useState<ConfigurationPropertyValue>(
            "",
        );
        return (
            <Story>
                <pre>{propertyFilters.join(" + ")}</pre>
                <ConfigurationInputPrimitive
                    property={{
                        ...ComponentBuilderConfigurationPropertySingleNumber,
                        transformations: [...propertyFilters],
                    }}
                    value={value}
                    onChange={(updatedValue: ConfigurationPropertyValue) => {
                        setValue(updatedValue);
                    }}
                />
            </Story>
        );
    });
});
