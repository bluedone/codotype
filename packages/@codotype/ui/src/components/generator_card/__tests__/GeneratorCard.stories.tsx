import * as React from "react";
import { storiesOf } from "@storybook/react";
import { GeneratorCard } from "../GeneratorCard";
import { GeneratorListItem } from "../GeneratorListItem";
import { GeneratorMeta, testState } from "@codotype/core";
import { Story } from "../../dev";
const { cdkGeneratorMeta, dummyGeneratorMeta } = testState;

// // // //

const stories: [string, GeneratorMeta][] = [
    ["w/ schemas", dummyGeneratorMeta],
    ["w/o schemas", cdkGeneratorMeta],
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
