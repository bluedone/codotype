import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";

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
            className="bg-indigo-500 hover:bg-indigo-600 flex font-mono items-center px-4 py-3 text-lg font-medium w-full mb-3 hover:shadow-sm text-white focus:outline-none transition-colors duration-200 ease-in-out shadow-lg rounded-full"
            disabled={props.disabled}
            onClick={props.onClick}
        >
            <span className="animate-pulse mx-2">
                <FontAwesomeIcon className="mr-4 ml-2" icon={faTerminal} />
                Export Code
            </span>
        </button>
    );
}
