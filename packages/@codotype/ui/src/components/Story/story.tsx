import * as React from "react";
import classnames from "classnames";
import { AppNavbar } from "../navbar";
import "./tailwind.css";

// // // //

interface StoryProps {
    children: React.ReactNode;
}

export function Story(props: StoryProps) {
    const [dark, setDark] = React.useState(false);
    // const [dark, setDark] = React.useState(true);

    return (
        <div
            className={classnames("h-full", {
                dark: dark,
            })}
        >
            <AppNavbar />
            <div
                // className="px-6 md:px-12 lg:px-64 pb-32 pt-5 h-full dark:bg-gray-800 bg-gray-200 dark:text-gray-200"
                className="px-6 md:px-12 lg:px-32 xl:px-48 2xl:px-64 pb-32 pt-5 h-full dark:bg-gray-800 bg-gray-200 dark:text-gray-200"
            // style={{ backgroundColor: "#f5f6f9", }}
            >
                <button
                    onClick={() => {
                        setDark(!dark);
                    }}
                >
                    Toggle Dark
                </button>
                {/* TODO - add max width to layout here */}
                <div className="grid grid-cols-1">
                    <div className="col-span-1">{props.children}</div>
                </div>
            </div>
        </div>
    );
}
