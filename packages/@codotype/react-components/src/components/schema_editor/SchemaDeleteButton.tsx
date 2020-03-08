import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

// // // //

/**
 * SchemaDeleteButton
 * @param props.onClick
 */
export function SchemaDeleteButton(props: { onClick: () => void }) {
    return (
        <button className="btn btn-link ml-2" onClick={props.onClick}>
            <FontAwesomeIcon
                className="ml-5-px text-danger"
                icon={faTrashAlt}
            />
        </button>
    );
}
