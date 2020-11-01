import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../../components/dev";
import { PluginFetcher } from "../GeneratorFetcher";

// // // //

storiesOf("Util/GeneratorFetcher", module).add("loads", () => {
    return (
        <Story>
            <PluginFetcher>
                {({ generators }) => {
                    return <pre>{JSON.stringify(generators, null, 4)}</pre>;
                }}
            </PluginFetcher>
        </Story>
    );
});
