import * as React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Hotkey } from "../Hotkey";

// // // //

export function SchemaNewButton(props: { onClick: () => void }) {
    return (
        <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="edit-button-tooltip">shift+s</Tooltip>}
        >
            <button
                className="btn btn-lg btn-primary btn-block mb-3 shadow-sm"
                onClick={props.onClick}
            >
                <Hotkey keyName="shift+s" onKeyDown={props.onClick} />
                <FontAwesomeIcon className="mr-2" icon={faPlus} />
                New Schema
            </button>
        </OverlayTrigger>
    );
}
