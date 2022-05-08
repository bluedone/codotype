import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// // // //

interface SortableListEmptyProps {
    title: string;
    body: string;
    cta: string;
    locked: boolean;
    onClick: () => void;
}

export function SortableListEmpty(props: SortableListEmptyProps) {
    const { title, body, cta, locked } = props;
    return (
        <div className="card-body text-center">
            <h5 className="mb-0 mt-1 text-gray-600 dark:text-gray-200 text-lg">
                {title}
            </h5>
            <p className="text-gray-600 dark:text-gray-200 mt-2 mb-0">{body}</p>
            {!locked && (
                <div className="row flex justify-center mt-2">
                    <div className="col-lg-12">
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={props.onClick}
                        >
                            <FontAwesomeIcon className="mr-2" icon={faPlus} />
                            {cta}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
