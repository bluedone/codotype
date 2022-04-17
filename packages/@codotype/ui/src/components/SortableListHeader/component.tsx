import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "../Tooltip";

// // // //

interface SortableListHeaderProps {
    label: string;
    onClick: () => void;
    tooltip?: React.ReactNode;
    rounded?: boolean;
    locked?: boolean;
}

/**
 * SortableListHeader
 * Renders the card-header for AttributeEditor and RelationEditor
 * @param props - see `SortableListHeaderProps`
 */
export function SortableListHeader(props: SortableListHeaderProps) {
    const { tooltip = "", rounded = true, locked = false } = props;

    const buttonContent = (
        <button
            disabled={locked}
            className={classnames(
                "bg-primary-500 text-white px-3 py-2 text-lg w-full",
                {
                    "rounded-tl-2xl rounded-tr-2xl": rounded,
                    "cursor-not-allowed opacity-80": locked,
                    "hover:bg-primary-600": !locked,
                },
            )}
            onClick={e => {
                e.currentTarget.blur();
                props.onClick();
            }}
        >
            <div className="flex items-center">
                <FontAwesomeIcon icon={faPlusCircle} />
                <p className="mb-0 ml-2 font-light">Add {props.label}</p>
            </div>
        </button>
    );

    if (locked) {
        return buttonContent;
    }

    return (
        <Tooltip position="right" tooltipContent={<>{tooltip}</>}>
            {buttonContent}
        </Tooltip>
    );
}
