import * as React from "react";
import { storiesOf } from "@storybook/react";
import { PluginCard } from "../GeneratorCard";
import { PluginListItem } from "../GeneratorListItem";
import { PluginMetadata, testState } from "@codotype/core";
import { Story } from "../../dev";
const { cdkPluginMeta, dummyPluginMetadata } = testState;

// // // //

const stories: [string, PluginMetadata][] = [
    ["w/ schemas", dummyPluginMetadata],
    ["w/o schemas", cdkPluginMeta],
];

// // // //

const storyCollection = storiesOf("Components/GeneratorCard", module);

stories.forEach(story => {
    storyCollection.add(story[0], () => {
        return (
            <Story>
                <div className="row d-flex justify-content-center">
                    <div className="col-sm-4">
                        <PluginCard plugin={story[1]} />
                    </div>
                </div>
            </Story>
        );
    });
});

// // // //
const storyCollectionListItem = storiesOf("Components/PluginListItem", module);

stories.forEach(story => {
    storyCollectionListItem.add(story[0], () => {
        return (
            <Story>
                <div className="row">
                    <div className="col-sm-12">
                        <PluginListItem plugin={story[1]} />
                    </div>
                </div>
            </Story>
        );
    });
});
