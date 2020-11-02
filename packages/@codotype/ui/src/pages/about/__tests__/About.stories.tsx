import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../../components/Story";
import { AboutAttribution } from "../AboutAttribution";
import { AboutBody } from "../AboutBody";
import { AboutJumbotron } from "../AboutJumbotron";
import { GitHubFollow } from "../../../components/GitHubStar/GitHubStar";

// // // //

storiesOf("Pages/www/About/Layout", module).add("renders", () => {
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

storiesOf("Pages/www/About/AboutAttribution", module).add("renders", () => {
    return (
        <Story>
            <AboutAttribution>
                <GitHubFollow />
            </AboutAttribution>
        </Story>
    );
});

storiesOf("Pages/www/About/AboutBody", module).add("renders", () => {
    return (
        <Story>
            <AboutBody />
        </Story>
    );
});

storiesOf("Pages/www/About/AboutJumbotron", module).add("renders", () => {
    return (
        <Story>
            <AboutJumbotron />
        </Story>
    );
});
