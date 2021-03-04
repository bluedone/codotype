import * as React from "react";

// // // //

/**
 * GenerateCodeButton
 * Renders a "Generate Code" button with a spinning cog to indicate whether or not
 * @param props.disabled - enables/disabled the button
 * @param props.onClick - callback when clicked
 */
export function GenerateCodeButton(props: {
    disabled?: boolean;
    onClick: () => void;
}) {
    return (
        <button
            className="bg-yellow-400 hover:bg-yellow-500 flex justify-center items-center px-10 py-4 text-xl font-semibold w-full hover:shadow-sm text-white focus:outline-none transition-colors duration-200 ease-in-out shadow-lg rounded-full"
            disabled={props.disabled}
            onClick={props.onClick}
        >
            Export Code
        </button>
    );
}
