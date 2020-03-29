import * as React from "react";
import { Story } from "@src/components/dev";
import { MarkdownRenderer } from "../component";
import { stories } from "./test_state";

// // // //

describe("MarkdownRenderer", () => {
    stories.forEach(story => {
        test(story[0], () => {
            return (
                <Story>
                    <MarkdownRenderer source={story[1]} />
                </Story>
            );
        });
    });
});
