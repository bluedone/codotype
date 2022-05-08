import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";

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
            className="generateCodeButton bg-gradient-to-r from-purple-500 to-blue-600 via-indigo-600 flex justify-center items-center px-10 py-4 text-xl font-semibold w-full opacity-80 hover:opacity-100 text-white focus:outline-none duration-200 ease-in-out rounded-full transition-all select-none"
            disabled={props.disabled}
            onClick={props.onClick}
        >
            Export Code
            <FontAwesomeIcon
                icon={faArrowCircleDown}
                size="lg"
                className="ml-2"
            />
        </button>
    );
}
