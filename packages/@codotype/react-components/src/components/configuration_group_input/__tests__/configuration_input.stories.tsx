import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
    ConfigurationInput,
    buildConfigurationGroupValue,
    OptionValueInstance,
} from "../component";
import {
    ComponentBuilderConfigurationGroup,
    ComponentBuilderConfigurationGroupPropertySingleDropdown,
    ComponentBuilderConfigurationGroupPropertyWithInstance,
    ComponentBuilderConfigurationGroupPropertyWithInstance01,
} from "./test_state";

import { Story } from "@src/components/dev";

// // // //

storiesOf("ConfigurationInput", module).add("renders", () => {
    const [count, increment] = React.useReducer(i => i + 1, 0);
    const [configurationOptionValue, setVal] = React.useState<
        OptionValueInstance
    >(
        buildConfigurationGroupValue(
            ComponentBuilderConfigurationGroup.properties,
        ),
    );

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

storiesOf("ConfigurationInput", module).add("single dropdown", () => {
    const [count, increment] = React.useReducer(i => i + 1, 0);
    const [configurationOptionValue, setVal] = React.useState<
        OptionValueInstance
    >(
        buildConfigurationGroupValue([
            ComponentBuilderConfigurationGroupPropertySingleDropdown,
        ]),
    );

    return (
        <Story>
            <ConfigurationInput
                configurationGroup={{
                    ...ComponentBuilderConfigurationGroup,
                    properties: [
                        ComponentBuilderConfigurationGroupPropertySingleDropdown,
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

storiesOf("ConfigurationInput", module).add("nested instance", () => {
    const [count, increment] = React.useReducer(i => i + 1, 0);
    const [configurationOptionValue, setVal] = React.useState<
        OptionValueInstance
    >(
        buildConfigurationGroupValue([
            ComponentBuilderConfigurationGroupPropertyWithInstance,
        ]),
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

storiesOf("ConfigurationInput", module).add("instance", () => {
    const [count, increment] = React.useReducer(i => i + 1, 0);
    const [configurationOptionValue, setVal] = React.useState<
        OptionValueInstance
    >(
        buildConfigurationGroupValue([
            ComponentBuilderConfigurationGroupPropertyWithInstance01,
        ]),
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
