import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ConfigurationInput } from "../component";
import {
    buildConfigurationGroupValue,
    OptionValueInstance,
    testState,
    GroupLayoutVariants,
    ConfigurationGroup,
} from "@codotype/core";
const {
    ComponentBuilderConfigurationGroup,
    ApiExamplesConfigurationGroup,
    ComponentBuilderConfigurationPropertySingleDropdown,
    ComponentBuilderConfigurationPropertyWithInstance,
    ComponentBuilderConfigurationPropertyWithInstance01,
} = testState;
import { Story } from "../../dev";

// // // //

const storyCollection = storiesOf(
    "ProjectEditor/ConfigurationEditor/ConfigurationInput",
    module,
);

storyCollection.add("renders", () => {
    const [count, increment] = React.useReducer(i => i + 1, 0);
    const [configurationOptionValue, setVal] = React.useState<
        OptionValueInstance
    >(buildConfigurationGroupValue(ComponentBuilderConfigurationGroup));

    return (
        <Story>
            <ConfigurationInput
                configurationGroup={ComponentBuilderConfigurationGroup}
                value={configurationOptionValue}
                onChange={(updatedVal: OptionValueInstance) => {
                    setVal(updatedVal);
                    increment();
                }}
            />
            <p>{count}</p>
            <pre>{JSON.stringify(configurationOptionValue, null, 4)}</pre>
        </Story>
    );
});

storyCollection.add("single dropdown", () => {
    const [count, increment] = React.useReducer(i => i + 1, 0);
    const [configurationOptionValue, setVal] = React.useState<
        OptionValueInstance
    >(
        buildConfigurationGroupValue({
            ...ComponentBuilderConfigurationGroup,
            layoutVariant: GroupLayoutVariants.LIST,
            properties: [ComponentBuilderConfigurationPropertySingleDropdown],
        }),
    );

    return (
        <Story>
            <ConfigurationInput
                configurationGroup={{
                    ...ComponentBuilderConfigurationGroup,
                    layoutVariant: GroupLayoutVariants.LIST,
                    properties: [
                        ComponentBuilderConfigurationPropertySingleDropdown,
                    ],
                }}
                value={configurationOptionValue}
                onChange={(updatedVal: OptionValueInstance) => {
                    setVal(updatedVal);
                    increment();
                }}
            />
            <p>{count}</p>
            <pre>{JSON.stringify(configurationOptionValue, null, 4)}</pre>
        </Story>
    );
});

storyCollection.add("nested instance", () => {
    const [count, increment] = React.useReducer(i => i + 1, 0);
    const [configurationOptionValue, setVal] = React.useState<
        OptionValueInstance
    >(
        buildConfigurationGroupValue({
            ...ComponentBuilderConfigurationGroup,
            properties: [ComponentBuilderConfigurationPropertyWithInstance],
        }),
    );

    return (
        <Story>
            <ConfigurationInput
                configurationGroup={{
                    ...ComponentBuilderConfigurationGroup,
                    properties: [
                        ComponentBuilderConfigurationPropertyWithInstance,
                    ],
                }}
                value={configurationOptionValue}
                onChange={(updatedVal: OptionValueInstance) => {
                    setVal(updatedVal);
                    increment();
                }}
            />
            <p>{count}</p>
            <pre>{JSON.stringify(configurationOptionValue, null, 4)}</pre>
        </Story>
    );
});

storyCollection.add("instance", () => {
    const [count, increment] = React.useReducer(i => i + 1, 0);
    const [configurationOptionValue, setVal] = React.useState<
        OptionValueInstance
    >(
        buildConfigurationGroupValue({
            ...ComponentBuilderConfigurationGroup,
            properties: [ComponentBuilderConfigurationPropertyWithInstance01],
        }),
    );

    return (
        <Story>
            <ConfigurationInput
                configurationGroup={{
                    ...ComponentBuilderConfigurationGroup,
                    properties: [
                        ComponentBuilderConfigurationPropertyWithInstance01,
                    ],
                }}
                value={configurationOptionValue}
                onChange={(updatedVal: OptionValueInstance) => {
                    setVal(updatedVal);
                    increment();
                }}
            />
            <p>{count}</p>
            <pre>{JSON.stringify(configurationOptionValue, null, 4)}</pre>
        </Story>
    );
});

// // // //
// Build test cases programatically from allowDisableOptions + groupVariants
const allowDisableOptions = [false, true];

const groupVariants = [
    GroupLayoutVariants.TABS,
    GroupLayoutVariants.LIST,
    GroupLayoutVariants.DOCS_3x9,
    GroupLayoutVariants.DOCS_4x8,
    GroupLayoutVariants.DOCS_6x6,
    GroupLayoutVariants.DETAIL_3x9,
    GroupLayoutVariants.DETAIL_4x8,
    GroupLayoutVariants.DETAIL_6x6,
];

const layoutVariantStories: [
    string, // Story Collection name
    string, // Story name
    GroupLayoutVariants,
    boolean,
][] = [];

allowDisableOptions.forEach(allowDisable => {
    groupVariants.forEach(layoutVariant => {
        layoutVariantStories.push([
            `ProjectEditor/ConfigurationEditor/ConfigurationInput/${layoutVariant}`,
            `allowDisable: ${allowDisable}`,
            layoutVariant,
            allowDisable,
        ]);
    });
});

layoutVariantStories.forEach(testCase => {
    const storyCollection = storiesOf(testCase[0], module);

    // Defines configurationGroup from test case
    const configurationGroup: ConfigurationGroup = {
        ...ComponentBuilderConfigurationGroup,
        content: {
            ...ComponentBuilderConfigurationGroup.content,
            documentation: ApiExamplesConfigurationGroup.content.documentation,
        },
        layoutVariant: testCase[2],
        allowDisable: testCase[3],
    };

    storyCollection.add(testCase[1], () => {
        const [count, increment] = React.useReducer(i => i + 1, 0);
        const [configurationOptionValue, setVal] = React.useState<
            OptionValueInstance
        >(buildConfigurationGroupValue(configurationGroup));

        return (
            <Story>
                <ConfigurationInput
                    configurationGroup={configurationGroup}
                    value={configurationOptionValue}
                    onChange={(updatedVal: OptionValueInstance) => {
                        setVal(updatedVal);
                        increment();
                    }}
                />
                <pre className="p-4 bg-dark text-light rounded mt-4">
                    {JSON.stringify(configurationOptionValue, null, 4)}
                </pre>
                <pre className="p-4 bg-dark text-light rounded mt-4">
                    {JSON.stringify(configurationGroup, null, 4)}
                </pre>
            </Story>
        );
    });
});
