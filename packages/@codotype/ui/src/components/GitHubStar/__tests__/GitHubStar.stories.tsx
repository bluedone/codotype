import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "@src/components/dev";
import { GitHubStar } from "../GitHubStar";

// // // //

storiesOf("Components/GitHubStar", module).add("renders", () => {
    return (
        <Story>
            <GitHubStar />
        </Story>
    );
});
