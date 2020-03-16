import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// // // //

interface SortableListHeaderProps {
    label: string;
    onClick: () => void;
}

/**
 * SortableListHeader
 * Renders the card-header for AttributeEditor and RelationEditor
 * @param props - see `SortableListHeaderProps`
 */
export function SortableListHeader(props: SortableListHeaderProps) {
    return (
        <div className="card-header p-2 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
                <button
                    className="btn btn-sm btn-primary"
                    onClick={props.onClick}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                <strong className="d-block text-muted mb-0 ml-2">
                    {props.label}
                </strong>
            </div>
        </div>
    );
}
