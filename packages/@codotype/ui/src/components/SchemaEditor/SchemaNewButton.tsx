import * as React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Hotkey } from "../Hotkey";

// // // //

export function SchemaNewButton(props: { onClick: () => void }) {
    return (
        <button
            className="px-3 py-4 text-xl font-medium w-full mb-3 hover:shadow-sm text-white focus:outline-none transition-colors duration-200 ease-in-out bg-gradient-to-r from-blue-400 to-green-500 hover:from-blue-500 hover:to-green-600 shadow-lg rounded-full"
            onClick={props.onClick}
        >
            <Hotkey keyName="shift+s" onKeyDown={props.onClick} />
            <FontAwesomeIcon className="mr-2" icon={faPlus} />
                Data Model
        </button>
    );
}
