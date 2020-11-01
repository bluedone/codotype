import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../../components/dev";
import { PluginListPage } from "../component";
import { testState } from "@codotype/core";

// // // //

storiesOf("Pages/www/PluginListPage", module).add("renders", () => {
    return (
        <Story>
            <PluginListPage
                plugins={[
                    testState.cdkPluginMeta,
                    testState.dummyPluginMetadata,
                ]}
            />
        </Story>
    );
});
