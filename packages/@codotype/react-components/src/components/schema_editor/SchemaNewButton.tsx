import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// // // //

export function SchemaNewButton() {
    return (
        <button className="btn btn-lg btn-primary btn-block mb-2">
            <FontAwesomeIcon className="mr-2" icon={faPlus} />
            New Schema
        </button>
    );
}
