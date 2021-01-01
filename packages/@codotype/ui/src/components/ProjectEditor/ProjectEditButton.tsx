import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

// // // //

export function ProjectEditButton(props: { onClick: () => void }) {
    return (
        <button
            className="btn btn-link"
            onClick={e => {
                e.currentTarget.blur();
                props.onClick();
            }}
        >
            <FontAwesomeIcon icon={faPencilAlt} />
        </button>
    );
}
