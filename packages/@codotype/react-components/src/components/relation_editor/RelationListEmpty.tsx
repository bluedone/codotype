import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// // // //

interface RelationListEmptyProps {
    onClick: () => void;
}

export function RelationListEmpty(props: RelationListEmptyProps) {
    return (
        <div className="card-body text-center">
            <strong className="mb-0 mt-1 text-muted d-block">
                No Relations added yet
            </strong>
            <small className="text-muted mt-2">
                Relations define properties on this Schema
            </small>
            <div className="row d-flex justify-content-center mt-2">
                <div className="col-lg-6">
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={props.onClick}
                    >
                        <FontAwesomeIcon className="mr-2" icon={faPlus} />
                        Add Relation
                    </button>
                </div>
            </div>
        </div>
    );
}
