import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { InfoTooltip } from "../info_tooltip";
import { Schema } from "../types";

// // // //

/**
 * SchemaPreview
 */
export function SchemaPreview(props: { schema: Schema }) {
    const obj = {
        label: "string",
        score: 0,
    };

    return (
        <div className="row">
            <div className="col-lg-12">
                <p className="mb-0 text-muted">
                    <span className="d-flex align-items-center justify-content-between mb-1 mx-1">
                        <span>
                            <FontAwesomeIcon className="mr-2" icon={faEye} />
                            <strong className="m-0">Preview</strong>
                        </span>
                        <InfoTooltip
                            id="schema-preview"
                            placement="left"
                            message={`The data structure of a single ${props.schema.tokens.label} Schema`}
                        />
                    </span>
                    <small className="mb-0 text-muted">
                        <pre className="rounded bg-dark text-light px-3 py-2">
                            {JSON.stringify(obj, null, 4)}
                        </pre>
                    </small>
                </p>
            </div>
        </div>
    );
}
