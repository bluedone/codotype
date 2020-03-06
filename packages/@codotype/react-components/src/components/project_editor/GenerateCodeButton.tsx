import * as React from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

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
            // className="btn btn-sm btn-yellow d-flex align-items-center"
            className="btn btn-yellow d-flex align-items-center"
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.disabled ? (
                <FontAwesomeIcon className="mr-1" icon={faCog} />
            ) : (
                <FontAwesomeIcon className="mr-1" icon={faCog} spin />
            )}
            Generate Code
        </button>
    );
}
