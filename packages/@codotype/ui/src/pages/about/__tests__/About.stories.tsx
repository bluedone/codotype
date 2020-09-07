import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../../components/dev";
import { AboutAttribution } from "../AboutAttribution";
import { AboutBody } from "../AboutBody";
import { AboutJumbotron } from "../AboutJumbotron";
import { GitHubFollow } from "../../../components/GitHubStar/GitHubStar";

// // // //

storiesOf("Pages/About/Layout", module).add("renders", () => {
    return (
        <Story>
            <AboutJumbotron />
            <AboutBody />
            <AboutAttribution>
                <GitHubFollow />
            </AboutAttribution>
        </Story>
    );
});

storiesOf("Pages/About/AboutAttribution", module).add("renders", () => {
    return (
        <Story>
            <AboutAttribution>
                <GitHubFollow />
            </AboutAttribution>
        </Story>
    );
});

storiesOf("Pages/About/AboutBody", module).add("renders", () => {
    return (
        <Story>
            <AboutBody />
        </Story>
    );
});

storiesOf("Pages/About/AboutJumbotron", module).add("renders", () => {
    return (
        <Story>
            <AboutJumbotron />
        </Story>
    );
});
