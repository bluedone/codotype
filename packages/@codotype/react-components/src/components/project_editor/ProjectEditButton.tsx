import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

// // // //

export function ProjectEditButton() {
    return (
        <button className="btn btn-link">
            <FontAwesomeIcon icon={faPencilAlt} />
        </button>
    );
}
