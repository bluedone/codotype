import * as React from "react";
import { storiesOf } from "@storybook/react";
import { GeneratorCard } from "../GeneratorCard";
import { GeneratorListItem } from "../GeneratorListItem";
import { PluginMetadata, testState } from "@codotype/core";
import { Story } from "../../dev";
const { cdkPluginMetadata, dummyPluginMetadata } = testState;

// // // //

const stories: [string, PluginMetadata][] = [
    ["w/ schemas", dummyPluginMetadata],
    ["w/o schemas", cdkPluginMetadata],
];

// // // //

const storyCollection = storiesOf("Components/GeneratorCard", module);

stories.forEach(story => {
    storyCollection.add(story[0], () => {
        return (
            <Story>
                <div className="row d-flex justify-content-center">
                    <div className="col-sm-4">
                        <GeneratorCard generator={story[1]} />
                    </div>
                </div>
            </Story>
        );
    });
});

// // // //
const storyCollectionListItem = storiesOf(
    "Components/GeneratorListItem",
    module,
);

stories.forEach(story => {
    storyCollectionListItem.add(story[0], () => {
        return (
            <Story>
                <div className="row">
                    <div className="col-sm-12">
                        <GeneratorListItem generator={story[1]} />
                    </div>
                </div>
            </Story>
        );
    });
});
