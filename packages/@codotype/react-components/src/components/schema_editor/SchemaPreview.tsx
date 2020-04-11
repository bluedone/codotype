import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faClipboard, faCopy } from "@fortawesome/free-solid-svg-icons";
import { InfoTooltip } from "../info_tooltip";
import { Schema } from "@codotype/types";
import {
    renderSchemaJson,
    renderSchemaGrapqhQL,
    renderSchemaTypeScript,
} from "@codotype/util";

// // // //

// TODO - move this into util
type RenderType = "json" | "typescript" | "graphql";

export function schemaPreviewContent(props: {
    schema: Schema;
    schemas: Schema[];
    renderType: RenderType;
}) {
    const { schema, schemas, renderType } = props;

    if (renderType === "json") {
        return renderSchemaJson({ schema, schemas });
    }

    if (renderType === "typescript") {
        return renderSchemaTypeScript({ schema, schemas });
    }

    if (renderType === "graphql") {
        return renderSchemaGrapqhQL({ schema, schemas });
    }

    // Return null if no match
    return null;
}

// // // //

/**
 * SchemaPreview
 * TODO - this should support switching between different preview types - JSON, GraphQL, TypeScript, JavaScript
 * TODO - add "Copy to Clipboard" button for different preview types - use https://clipboardjs.com/
 * TODO - when hovering over a relation, it should display a tooltip with a preview of the related Schema
 * TODO - when clicking a relation it should jump to the corresponding schema
 * QUESTION - should generators be able to configure which is the default preview type?
 */
export function SchemaPreview(props: { schema: Schema; schemas: Schema[] }) {
    const { schema, schemas } = props;

    const [renderType, setRenderType] = React.useState<RenderType>(
        "typescript",
    );

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
                            message={`The data structure of a single ${schema.identifiers.singular.label} Schema`}
                        />
                    </span>
                </p>
            </div>
            <div className="col-lg-12">
                <div className="row d-flex align-items-center">
                    <div className="col-sm-8">
                        <select
                            value={renderType}
                            onChange={e => {
                                // @ts-ignore
                                const value: RenderType = e.currentTarget.value;
                                setRenderType(value);
                            }}
                            className="form-control form-control-sm"
                        >
                            <option value={"typescript"}>TypeScript</option>
                            <option value={"json"}>JSON</option>
                            <option value={"graphql"}>GraphQL</option>
                        </select>
                    </div>
                    <div className="col-sm-4">
                        <button className="btn btn-sm btn-block btn-secondary">
                            <FontAwesomeIcon icon={faCopy} className="mr-2" />
                            Copy
                        </button>
                    </div>
                </div>
                <pre className="rounded bg-dark mt-2">
                    <small className="mb-0 text-muted">
                        <div className="px-3 py-2 text-light">
                            {schemaPreviewContent({
                                schema,
                                schemas,
                                renderType,
                            })}
                        </div>
                    </small>
                </pre>
            </div>
        </div>
    );
}
