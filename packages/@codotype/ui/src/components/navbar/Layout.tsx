import * as React from "react";
import { DarkModeButton } from "./DarkModeButton";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faBook,
//     faQuestionCircle,
//     faDollarSign,
// } from "@fortawesome/free-solid-svg-icons";
// import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
// import Link from "next/link";

// // // //

export function AppNavbar(props: {
    homeUrl?: string;
    toggleDarkMode?: () => void;
    darkModeEnabled?: boolean;
}) {
    const { darkModeEnabled = false, toggleDarkMode = null } = props;
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
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
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
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="block lg:hidden h-8 w-auto"
                                src="https://res.cloudinary.com/codotype/image/upload/v1560045005/tech-logos/codotype.png"
                                alt="Codotype Logo"
                            />

                            <div className="hidden lg:flex items-center h-8 w-auto">
                                <img
                                    className="h-8 w-auto"
                                    src="https://res.cloudinary.com/codotype/image/upload/v1560045005/tech-logos/codotype.png"
                                    alt="Codotype Logo"
                                />
                                <span className="ml-3 text-2xl">Codotype</span>
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {/* Render DarkModeButton */}
                            {toggleDarkMode !== null && (
                                <DarkModeButton
                                    darkModeEnabled={darkModeEnabled}
                                    toggleDarkMode={toggleDarkMode}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
