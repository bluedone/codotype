import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

// // // //

/**
 * ResetProjectButton
 * Renders a "Reset Project" button
 * @param props.disabled - enables/disabled the button
 * @param props.onClick - callback when clicked
 */
export function ResetProjectButton(props: {
    disabled?: boolean;
    onConfirmReset: () => void;
}) {
    return (
        <button
            className="btn btn-sm btn-outline-danger d-flex align-items-center mr-2"
            disabled={props.disabled}
            onClick={props.onConfirmReset}
        >
            <FontAwesomeIcon className="mr-1" icon={faCog} />
            Reset Project
        </button>
    );
}
