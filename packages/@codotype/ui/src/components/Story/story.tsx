import * as React from "react";
import classnames from "classnames";
import { AppNavbar } from "../navbar";
import "./tailwind.css";

// // // //

interface StoryProps {
    slim?: boolean;
    darkMode?: boolean;
    children: React.ReactNode;
}

export function Story(props: StoryProps) {
    const { slim = false, darkMode = false } = props;
    const [dark, setDark] = React.useState(darkMode);

    if (slim) {
        return (
            <div
                className={classnames("h-full pb-32", {
                    dark: dark,
                    // "bg-gray-800": dark,
                    "bg-gray-900": dark,
                    "bg-light-background": !dark,
                })}
            >
                <button
                    onClick={() => {
                        setDark(!dark);
                    }}
                >
                    Toggle Dark Mode
                </button>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full dark:bg-gray-900 bg-light-background text-gray-700 dark:text-gray-200">
                    <div className="grid grid-cols-1">
                        <div className="col-span-1 mt-5">{props.children}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={classnames("min-h-screen pb-32", {
                dark: dark,
                "bg-gray-900": dark,
                "bg-light-background": !dark,
            })}
        >
            <AppNavbar
                darkModeEnabled={dark}
                toggleDarkMode={() => {
                    setDark(!dark);
                }}
            />
            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full bg-body text-body"
                // style={{ backgroundColor: "#f5f6f9" }}>
            >
                <div className="grid grid-cols-1">
                    <div className="col-span-1 mt-5">{props.children}</div>
                </div>
            </div>
        </div>
    );
}

export function CodotypeStoryDecorator(WrappedStory: any) {
    return (
        <Story>
            <WrappedStory />
        </Story>
    );
}
