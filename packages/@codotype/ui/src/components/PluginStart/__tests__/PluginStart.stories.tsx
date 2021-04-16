import * as React from "react";
import { storiesOf } from "@storybook/react";
import { PluginStart } from "../component";
import { Story } from "../../Story";
import { dummyPluginMetadata } from "../../ProjectEditor/__tests__/test_state";

// // // //

const storyCollection = storiesOf("Components/PluginStart", module);

storyCollection.add("renders w/externalLink", () => {
    return (
        <Story>
            <div className="card card-body shadow-lg">
                <PluginStart
                    externalLink={"https://google.com"}
                    plugin={dummyPluginMetadata}
                />
            </div>
        </Story>
    );
});

storyCollection.add("renders w/ buildLink", () => {
    return (
        <Story>
            <div className="card card-body shadow-lg">
                <PluginStart
                    buildLink={"https://google.com"}
                    plugin={dummyPluginMetadata}
                />
            </div>
        </Story>
    );
});

storyCollection.add("renders", () => {
    return (
        <Story>
            <div className="card card-body shadow-lg">
                <PluginStart plugin={dummyPluginMetadata} />
            </div>
        </Story>
    );
});
