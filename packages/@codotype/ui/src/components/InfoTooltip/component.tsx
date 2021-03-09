import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "../Tooltip";

// // // //

/**
 * InfoTooltip
 * @param props.id
 * @param props.placement
 * @param props.message
 */
export function InfoTooltip(props: {
    id: string;
    placement?: "right" | "left";
    message: string;
}) {
    // Defines default placement
    const { placement = "right" } = props;

    return (
        <Tooltip position={placement} tooltipContent={<>{props.message}</>}>
            <FontAwesomeIcon icon={faExclamationCircle} />
        </Tooltip>
    );
}
