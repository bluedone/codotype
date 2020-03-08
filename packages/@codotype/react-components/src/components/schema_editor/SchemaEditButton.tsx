import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

// // // //

export function SchemaEditButton(props: { onClick: () => void }) {
    return (
        <button className="btn btn-link ml-2" onClick={props.onClick}>
            <FontAwesomeIcon className="ml-5-px" icon={faPencilAlt} />
        </button>
    );
}
