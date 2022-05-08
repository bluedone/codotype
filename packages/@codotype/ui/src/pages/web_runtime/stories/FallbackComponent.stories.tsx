import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../../components/Story";
import { FallbackComponent } from "../ErrorBoundary";

// // // //

const stories: [string][] = [["renders"]];

// // // //

const storyCollection = storiesOf(
    "App/Pages/WebRuntime/FallbackComponent",
    module,
);

stories.forEach(story => {
    storyCollection.add(story[0], () => {
        return (
            <Story>
                <FallbackComponent
                    resetErrorBoundary={() => {
                        console.log("Reset Error Boundary");
                    }}
                />
            </Story>
        );
    });
});
