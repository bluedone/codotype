import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
    ConfigurationInput,
    buildConfigurationGroupValue,
    OptionValueInstance,
} from "../component";
import { ComponentBuilderConfigurationGroup } from "./test_state";

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
