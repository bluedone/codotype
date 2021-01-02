import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

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
            className="btn btn-lg bg-yellow-400 hover:bg-yellow-500 flex items-center"
            disabled={props.disabled}
            onClick={props.onClick}
        >
            <FontAwesomeIcon className="mr-1" icon={faCode} />
            Export Code
        </button>
    );
}
