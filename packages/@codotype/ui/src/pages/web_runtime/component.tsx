import * as React from "react";
import { PluginMetadata, ProjectInput } from "@codotype/core";
import { LocalStorageProvider } from "./LocalStorageProvider";
import classnames from "classnames";
import { AppNavbar } from "../../components/navbar";

// // // //

interface WebRuntimeProps {
    plugin: PluginMetadata;
    children: (childProps: {
        plugin: PluginMetadata;
        projectInput: ProjectInput;
        setProject: (updatedProject: ProjectInput) => void;
        clearProject: () => void;
        darkMode: boolean;
        setDarkMode: (updatedDarkMode: boolean) => void;
    }) => React.ReactNode;
}

/**
 * WebRuntime
 * Sets up <LocalStorageProvider /> and sends to props.children
 * @param props - see `WebRuntimeProps`
 */
export function WebRuntime(props: WebRuntimeProps) {
    return (
        <LocalStorageProvider plugin={props.plugin}>
            {({
                projectInput,
                setProject,
                clearProject,
                darkMode,
                setDarkMode,
            }) => (
                <div
                    className={classnames("min-h-screen pb-32", {
                        dark: darkMode,
                        "bg-gray-900": darkMode,
                        "bg-light-background": !darkMode,
                    })}
                >
                    <AppNavbar
                        darkModeEnabled={darkMode}
                        toggleDarkMode={() => {
                            setDarkMode(!darkMode);
                        }}
                    />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full bg-body text-body">
                        <div className="grid grid-cols-1">
                            <div className="col-span-1 mt-5">
                                {props.children({
                                    plugin: props.plugin,
                                    projectInput,
                                    setProject,
                                    clearProject,
                                    darkMode,
                                    setDarkMode,
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </LocalStorageProvider>
    );
}
