import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import { faLock, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

// // // //

interface SortableListHeaderProps {
    label: string;
    onClick: () => void;
    rounded?: boolean;
    locked?: boolean;
}

/**
 * SortableListHeader
 * Renders the card-header for AttributeEditor and RelationEditor
 * @param props - see `SortableListHeaderProps`
 */
export function SortableListHeader(props: SortableListHeaderProps) {
    const { rounded = true, locked = false } = props;

    if (locked) {
        return (
            <div
                className={classnames(
                    "border border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-100 px-3 py-2 text-lg w-full",
                    {
                        "rounded-tl-2xl rounded-tr-2xl": rounded,
                    },
                )}
            >
                <div className="flex items-center">
                    <FontAwesomeIcon size="sm" icon={faLock} />
                    <p className="mb-0 ml-2 font-light">{props.label}</p>
                </div>
            </div>
        );
    }

    return (
        <button
            className={classnames(
                "bg-primary-500 hover:bg-primary-600 text-white px-3 py-2 text-lg w-full",
                {
                    "rounded-tl-2xl rounded-tr-2xl": rounded,
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
}
