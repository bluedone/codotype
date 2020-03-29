import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "@src/components/dev";
import { MarkdownRenderer } from "../component";
import { stories } from "./test_state";

// // // //

const storiesModule = storiesOf("MarkdownRenderer", module);

stories.forEach(story => {
    storiesModule.add(story[0], () => {
        return (
            <Story>
                <MarkdownRenderer source={story[1]} />
            </Story>
        );
    });
});
