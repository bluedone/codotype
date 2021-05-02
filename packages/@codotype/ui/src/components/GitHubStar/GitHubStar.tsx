import * as React from "react";
import { render } from "github-buttons";
import classnames from "classnames";

// // // //

interface GitHubButtonProps {
    href?: string;
    text?: string;
    title?: string;
    size?: "large";
    icon?: "logo" | "star";
    className?: string;
    showCount?: boolean;
    children?: React.ReactNode;
}

// Doc: https://buttons.github.io/
export class GitHubButton extends React.Component<GitHubButtonProps, {}> {
    ref: React.RefObject<HTMLDivElement>;

    constructor(props: GitHubButtonProps) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        // Pull current value from this.ref
        const { current } = this.ref;

        // Returns if current === null
        if (!current) {
            return;
        }

        // If window is undefined -> return null
        // NOTE - this is necessary to prevent Next.js from blowing up when invoking `render` from `github-buttons`
        if (typeof window === "undefined") {
            return;
        }

        // Pulls values from this.props, assigns default values
        const {
            href = "https://github.com/codotype/codotype",
            text = "Star Codotype on GitHub",
            title = "",
            size = "large",
            icon = "logo",
            showCount = true,
        } = this.props;

        // Defines value for data-icon
        const dataIcon = "logo" ? "octicon-mark-github" : "octicon-star";

        // Invokes render function from github-buttons package
        render(
            {
                href,
                title,
                "data-size": size,
                "data-text": text,
                "data-show-count": showCount,
                "data-icon": dataIcon,
            },
            el => {
                current.appendChild(el);
            },
        );
    }

    render() {
        const { className = "" } = this.props;

        if (typeof window === "undefined") {
            return null;
        }

        return (
            <div
                ref={this.ref}
                className={classnames({
                    [className]: className !== "",
                })}
            />
        );
    }
}

// // // //

// Doc: https://buttons.github.io/
export function GitHubStar() {
    return (
        <GitHubButton
            text="Star"
            icon="star"
            title="Star Codotype on GitHub!"
        />
    );
}

// // // //

export function GitHubFollow() {
    return (
        <GitHubButton
            href="https://github.com/aeksco"
            text="Follow @aeksco"
            title="Follow @aeksco on GitHub"
        />
    );
}
