import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../Story";
import { GitHubStar } from "../GitHubStar";

// // // //

storiesOf("Components/GitHubStar", module).add("renders", () => {
    return (
        <Story>
            <GitHubStar />
        </Story>
    );
});
