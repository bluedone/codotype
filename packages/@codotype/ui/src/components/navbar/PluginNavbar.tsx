import * as React from "react";
import { DarkModeButton } from "./DarkModeButton";
import { PluginMetadata } from "@codotype/core";

// // // //

export function PluginNavbar(props: {
    plugin: PluginMetadata;
    toggleDarkMode?: () => void;
    darkModeEnabled?: boolean;
}) {
    const { plugin, darkModeEnabled = false, toggleDarkMode = null } = props;
    return (
        <nav className="bg-white dark:bg-gray-900 dark:text-gray-200">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Menu open: "hidden", Menu closed: "block" */}
                            {/* Heroicon name: outline/menu */}
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            {/* Heroicon name: outline/x */}
                            {/* Menu open: "block", Menu closed: "hidden" */}
                            <svg
                                className="hidden h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center select-none">
                            <img
                                className="block lg:hidden h-8 w-auto"
                                src="https://res.cloudinary.com/codotype/image/upload/v1560045005/tech-logos/codotype.png"
                                alt="Codotype Logo"
                                draggable={false}
                            />

                            <div className="hidden lg:flex items-center h-8 w-auto">
                                <img
                                    className="h-8 w-auto"
                                    src="https://res.cloudinary.com/codotype/image/upload/v1560045005/tech-logos/codotype.png"
                                    alt="Codotype Logo"
                                    draggable={false}
                                />
                                <span className="ml-3 text-2xl">Codotype</span>
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <p className="border-transparent text-gray-900 dark:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                {plugin.content.label}
                            </p>

                            {/* <!-- Current: "border-primary-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" --> */}
                            {/* <a
                                href="#"
                                className="border-primary-500 text-gray-900 dark:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Dashboard
                            </a>
                            <a
                                href="#"
                                className="border-transparent text-gray-500 dark:text-gray-200 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Projects
                            </a> */}
                            {/* Render DarkModeButton */}
                            {toggleDarkMode !== null && (
                                <DarkModeButton
                                    darkModeEnabled={darkModeEnabled}
                                    toggleDarkMode={toggleDarkMode}
                                />
                            )}
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
                        {/* <div className="sm:hidden" id="mobile-menu"> */}
                        {/* <div className="pt-2 pb-4 space-y-1"> */}
                        {/* <!-- Current: "bg-indigo-50 border-primary-500 text-primary-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" --> */}
                        {/* <a
                                    href="#"
                                    className="bg-indigo-50 border-primary-500 dark:text-gray-200 text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                                >
                                    Dashboard
                                </a> */}
                        {/* <a
                                    href="#"
                                    className="border-transparent dark:text-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                                >
                                    Projects
                                </a> */}
                        {/* </div> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </nav>
    );
}
