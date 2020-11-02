import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

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
        <OverlayTrigger
            placement={placement}
            overlay={
                <Tooltip id={`info-tooltip-${props.id}`}>
                    {props.message}
                </Tooltip>
            }
        >
            <FontAwesomeIcon icon={faExclamationCircle} />
        </OverlayTrigger>
    );
}
