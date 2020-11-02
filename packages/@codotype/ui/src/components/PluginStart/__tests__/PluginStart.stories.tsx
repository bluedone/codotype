import * as React from "react";
import { storiesOf } from "@storybook/react";
import { PluginStart } from "../component";
import { Story } from "../../dev";
import { dummyPluginMetadata } from "../../project_editor/__tests__/test_state";

// // // //

storiesOf("Components/PluginStart", module).add("renders in card", () => {
    return (
        <Story>
            <div className="card card-body">
                <PluginStart
                    externalLink={"https://google.com"}
                    plugin={dummyPluginMetadata}
                />
            </div>
        </Story>
    );
});

storiesOf("Components/PluginStart", module).add("renders", () => {
    return (
        <Story>
            <PluginStart
                buildLink={"https://google.com"}
                plugin={dummyPluginMetadata}
            />
        </Story>
    );
});
