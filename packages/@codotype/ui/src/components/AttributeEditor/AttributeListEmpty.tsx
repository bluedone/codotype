import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// // // //

interface AttributeListEmptyProps {
    onClick: () => void;
}

export function AttributeListEmpty(props: AttributeListEmptyProps) {
    return (
        <div className="card-body text-center">
            <h5 className="mb-0 mt-1 text-muted">No Attributes added yet</h5>
            <p className="text-muted mt-2 mb-0">
                Define properties on this Schema
            </p>
            <div className="row d-flex justify-center mt-2">
                <div className="col-lg-12">
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={props.onClick}
                    >
                        <FontAwesomeIcon className="mr-2" icon={faPlus} />
                        Add Attribute
                    </button>
                </div>
            </div>
        </div>
    );
}
