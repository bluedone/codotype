import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// // // //

interface SortableListHeaderProps {
    label: string;
}

/**
 * SortableListHeader
 * Renders the card-header for AttributeEditor and RelationEditor
 * @param props - see `SortableListHeaderProps`
 */
export function SortableListHeader(props: SortableListHeaderProps) {
    return (
        <div className="card-header">
            <div className="d-flex align-items-center">
                <button className="btn btn-sm btn-primary">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                <p className="mb-0 ml-2">{props.label}</p>
            </div>
        </div>
    );
}
