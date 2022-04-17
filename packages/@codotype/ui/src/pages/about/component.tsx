import React from "react";
import { GitHubFollow } from "../../components/GitHubStar";
import { AboutAttribution } from "./AboutAttribution";
import { AboutBody } from "./AboutBody";
import { AboutJumbotron } from "./AboutJumbotron";

// // // //

export function AboutPageLayout() {
    return (
        <React.Fragment>
            <AboutJumbotron />
            <AboutBody />
            <AboutAttribution>
                <GitHubFollow />
            </AboutAttribution>
        </React.Fragment>
    );
}
