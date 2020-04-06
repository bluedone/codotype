import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { InfoTooltip } from "../info_tooltip";
import { Schema } from "@codotype/types";
import { buildDefault } from "@codotype/util";

// // // //

/**
 * SchemaPreview
 * TODO - this should support switching between different preview types - JSON, GraphQL, TypeScript, JavaScript
 * TODO - when hovering over a relation, it should display a tooltip with a preview of the related Schema
 * TODO - when clicking a relation it should allow the user to
 */
export function SchemaPreview(props: { schema: Schema; schemas: Schema[] }) {
    const { schema, schemas } = props;
    const obj = buildDefault({ schema, schemas });

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
                            message={`The data structure of a single ${schema.tokens.label} Schema`}
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
