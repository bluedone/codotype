import * as React from "react";

// // // //

export function DarkModeButton(props: {
    toggleDarkMode: () => void;
    darkModeEnabled: boolean;
}) {
    const { darkModeEnabled, toggleDarkMode } = props;
    return (
        <button
            // className="focus:outline-none"
            className="focus:outline-none border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            onClick={() => {
                toggleDarkMode();
            }}
        >
            <div className="flex items-center">
                {darkModeEnabled ? (
                    <svg
                        className="w-6 h-6 md:w-6 md:h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-6 h-6 md:w-6 md:h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </svg>
                )}
                <span className="ml-2 font-light">
                    {darkModeEnabled
                        ? "Light Mode"
                        : "Dark Mode (Experimental)"}
                </span>
            </div>
        </button>
    );
}
