import * as React from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Hotkey } from "../Hotkey";

// // // //

export function SchemaNewButton(props: { onClick: () => void }) {
    return (
        <button
            className="px-3 py-4 text-xl font-light w-full mb-3 hover:shadow-sm text-white focus:outline-none transition-colors duration-200 ease-in-out bg-primary-500 hover:bg-primary-600 shadow-lg rounded-full select-none"
            onClick={props.onClick}
        >
            <FontAwesomeIcon className="mr-2" icon={faPlusCircle} />
            Add Data Model
        </button>
    );
}
