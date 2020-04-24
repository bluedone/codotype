import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ConfigurationInput } from "../component";
import { buildConfigurationGroupValue } from "@codotype/util";
import {
    OptionValueInstance,
    testState,
    GroupLayoutVariant,
} from "@codotype/types";
const {
    ComponentBuilderConfigurationGroup,
    ApiExamplesConfigurationGroup,
    ComponentBuilderConfigurationGroupPropertySingleDropdown,
    ComponentBuilderConfigurationGroupPropertyWithInstance,
    ComponentBuilderConfigurationGroupPropertyWithInstance01,
} = testState;
import { Story } from "@src/components/dev";

// // // //

const storyCollection = storiesOf(
    "ConfigurationEditor/ConfigurationInput",
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
            properties: [
                ComponentBuilderConfigurationGroupPropertySingleDropdown,
            ],
        }),
    );

    return (
        <Story>
            <ConfigurationInput
                configurationGroup={{
                    ...ComponentBuilderConfigurationGroup,
                    properties: [],
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
            properties: [
                ComponentBuilderConfigurationGroupPropertyWithInstance,
            ],
        }),
    );

    return (
        <Story>
            <ConfigurationInput
                configurationGroup={{
                    ...ComponentBuilderConfigurationGroup,
                    properties: [
                        ComponentBuilderConfigurationGroupPropertyWithInstance,
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
            properties: [
                ComponentBuilderConfigurationGroupPropertyWithInstance01,
            ],
        }),
    );

    return (
        <Story>
            <ConfigurationInput
                configurationGroup={{
                    ...ComponentBuilderConfigurationGroup,
                    properties: [
                        ComponentBuilderConfigurationGroupPropertyWithInstance01,
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

const layoutVariantStories: [string, GroupLayoutVariant][] = [
    ["API Examples - TABS layoutVariant", GroupLayoutVariant.TABS],
    ["API Examples - LIST layoutVariant", GroupLayoutVariant.LIST],
    ["API Examples - DOCS_3x9 layoutVariant", GroupLayoutVariant.DOCS_3x9],
    ["API Examples - DOCS_4x8 layoutVariant", GroupLayoutVariant.DOCS_4x8],
    ["API Examples - DOCS_6x6 layoutVariant", GroupLayoutVariant.DOCS_6x6],
];

layoutVariantStories.forEach(testCase => {
    storyCollection.add(testCase[0], () => {
        const [count, increment] = React.useReducer(i => i + 1, 0);
        const [configurationOptionValue, setVal] = React.useState<
            OptionValueInstance
        >(buildConfigurationGroupValue(ApiExamplesConfigurationGroup));

        return (
            <Story>
                <ConfigurationInput
                    configurationGroup={{
                        ...ApiExamplesConfigurationGroup,
                        layoutVariant: testCase[1],
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
});
