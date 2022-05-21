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
            className="generateCodeButton flex justify-center items-center px-10 py-4 text-xl font-semibold w-full rounded-full"
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
