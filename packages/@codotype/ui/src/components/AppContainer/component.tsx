import * as React from "react";
import classnames from "classnames";
import { PluginNavbar } from "../navbar/PluginNavbar";
import { PluginMetadata } from "@codotype/core";
import Head from "next/head";
import { SocialMeta } from "../Meta";

// // // //

export function AppContainer(props: {
    plugin: PluginMetadata;
    children: React.ReactNode;
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}) {
    const { darkMode, setDarkMode, plugin } = props;

    return (
        <React.Fragment>
            <Head>
                <title>Codotype - {plugin.content.label}</title>
                <SocialMeta />
            </Head>
            <div
                className={classnames("min-h-screen pb-32", {
                    dark: darkMode,
                    "bg-gray-900": darkMode,
                    "bg-light-background": !darkMode,
                })}
            >
                <PluginNavbar
                    plugin={plugin}
                    darkModeEnabled={darkMode}
                    toggleDarkMode={() => {
                        setDarkMode(!darkMode);
                    }}
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full dark:bg-gray-900 bg-light-background text-gray-700 dark:text-gray-200">
                    <div className="grid grid-cols-1">
                        <div className="col-span-1 mt-5">{props.children}</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
