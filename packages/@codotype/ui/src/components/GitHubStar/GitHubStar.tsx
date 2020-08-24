import * as React from "react";
import GitHubButton from "react-github-btn";

// // // //

// Doc: https://buttons.github.io/
export function GitHubStar(props: {
    href?: string;
    label?: string;
    size?: "large";
    children?: React.ReactNode;
}) {
    const {
        children = "Star",
        href = "https://github.com/codotype/codotype",
        label = "Star Codotype on GitHub",
        size = "large",
    } = props;

    return (
        <GitHubButton
            href={href}
            data-size={size}
            data-icon="octicon-star"
            data-show-count={true}
            aria-label={label}
        >
            {children}
        </GitHubButton>
    );
}

// // // //

export function GitHubFollow() {
    return (
        <GitHubButton
            href={"https://github.com/aeksco"}
            data-size={"large"}
            data-icon="octicon-follow"
            data-show-count={true}
            aria-label={"Follow @aeksco on GitHub"}
        >
            Follow
        </GitHubButton>
    );
}
