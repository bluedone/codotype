import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

// // // //

export function ProjectEditButton(props: { onClick: () => void }) {
    return (
        <button
            className="ml-2 text-gray-500 hover:text-blue-400 p-1 focus:outline-none"
            onClick={e => {
                e.currentTarget.blur();
                props.onClick();
            }}
        >
            <FontAwesomeIcon icon={faPencilAlt} />
        </button>
    );
}
