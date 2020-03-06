import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

// // // //

export function SchemaDeleteButton() {
    return (
        <button className="btn btn-link ml-2">
            <FontAwesomeIcon
                className="ml-5-px text-danger"
                icon={faTrashAlt}
            />
        </button>
    );
}
