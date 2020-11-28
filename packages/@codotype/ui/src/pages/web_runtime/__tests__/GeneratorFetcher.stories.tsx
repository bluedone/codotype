import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../../components/Story";
import { PluginFetcher } from "../GeneratorFetcher";

// // // //

storiesOf("Util/GeneratorFetcher", module).add("loads", () => {
    return (
        <Story>
            <PluginFetcher>
                {({ plugins }) => {
                    return <pre>{JSON.stringify(plugins, null, 4)}</pre>;
                }}
            </PluginFetcher>
        </Story>
    );
});
