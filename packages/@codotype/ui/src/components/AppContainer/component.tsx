import * as React from "react";
import classnames from "classnames";
import { PluginNavbar } from "../navbar/PluginNavbar";
import { PluginMetadata } from "@codotype/core";
// import { Head } from "next/document";
// import { SocialMeta } from "../Meta";

// // // //

export function AppContainer(props: {
    plugin: PluginMetadata;
    children: React.ReactNode;
}) {
    const [dark, setDark] = React.useState(false);
    const { plugin } = props;

    // <Head>
    //     <title>Codotype - {plugin.content.label}</title>
    //     <SocialMeta />
    // </Head>
    return (
        <div
            className={classnames("h-full pb-32", {
                dark: dark,
                "bg-gray-800": dark,
                "bg-gray-100": !dark,
            })}
        >
            <PluginNavbar
                plugin={plugin}
                darkModeEnabled={dark}
                toggleDarkMode={() => {
                    setDark(!dark);
                }}
            />
            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full dark:bg-gray-800 bg-gray-100 dark:text-gray-200"
                // style={{ backgroundColor: "#f5f6f9" }}>
            >
                <div className="grid grid-cols-1">
                    <div className="col-span-1 mt-5">{props.children}</div>
                </div>
            </div>
        </div>
    );
}
