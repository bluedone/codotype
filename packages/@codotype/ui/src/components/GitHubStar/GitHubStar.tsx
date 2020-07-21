import * as React from "react";
import GitHubButton from "react-github-btn";

// // // //

export function GitHubStar() {
    return (
        <GitHubButton
            href="https://github.com/codotype/codotype"
            data-icon="octicon-star"
            data-show-count={true}
            aria-label="Star Codotype on GitHub"
        >
            Star
        </GitHubButton>
    );
}
