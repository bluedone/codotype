import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CopyToClipboard } from "../copy_to_clipboard";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { InfoTooltip } from "../info_tooltip";
import {
    Schema,
    renderSchemaJson,
    renderSchemaGrapqhQL,
    renderSchemaTypeScript,
} from "@codotype/core";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

// // // //

// TODO - move this into util
// TODO - define this as a enum + meta object that includes label + description for each export type
// TODO - update this to include optional headers? i.e. import statements when exporting JS
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

    const [copyMessage, setCopyMessage] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (copyMessage === false) {
            return;
        }

        setTimeout(() => {
            setCopyMessage(false);
        }, 1000);
    }, [copyMessage]);

    const content: string =
        schemaPreviewContent({
            schema,
            schemas,
            renderType,
        }) || "";

    return (
        <div className="row">
            {/* <div className="col-lg-12">
                <p className="mb-0 text-muted">
                    <span className="d-flex align-items-center justify-content-between mb-1">
                        <strong className="m-0">Preview</strong>
                        <InfoTooltip
                            id="schema-preview"
                            placement="left"
                            message={`The data structure of a single ${schema.identifiers.singular.label} Schema`}
                        />
                    </span>
                </p>
            </div> */}
            <div className="col-lg-12">
                <div className="rounded bg-dark" style={{ overflow: "hidden" }}>
                    <pre
                        className="px-3 pt-3 pb-3 mb-0"
                        style={{ fontSize: "1rem" }}
                    >
                        <small className="mb-0">
                            <div className="text-light">{content}</div>
                        </small>
                    </pre>

                    <div
                        className="d-flex flex-row align-items-center border-primary"
                        style={{ borderTop: "2px solid" }}
                    >
                        <div className="d-flex flex-column flex-grow-1">
                            <select
                                value={renderType}
                                onChange={e => {
                                    // @ts-ignore
                                    const value: RenderType =
                                        e.currentTarget.value;
                                    setRenderType(value);
                                }}
                                style={{ boxShadow: "none" }}
                                className="form-control form-control-sm rounded-0 bg-dark text-light border-0"
                            >
                                <option value={"typescript"}>TypeScript</option>
                                <option value={"json"}>JSON</option>
                                <option value={"graphql"}>GraphQL</option>
                            </select>
                        </div>
                        <div className="d-flex flex-column">
                            <CopyToClipboard
                                text={content}
                                onCopy={() => {
                                    setCopyMessage(true);
                                }}
                            >
                                {({ copyToClipboard }) => (
                                    <button
                                        className="btn btn-sm btn-block btn-dark rounded-0"
                                        onClick={copyToClipboard}
                                        style={{
                                            boxShadow: "none",
                                            minWidth: "6rem",
                                        }}
                                    >
                                        {copyMessage && (
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={faCheckCircle}
                                                    className="mr-2 text-success"
                                                />
                                                Copied
                                            </span>
                                        )}

                                        {!copyMessage && (
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={faCopy}
                                                    className="mr-2"
                                                />
                                                Copy
                                            </span>
                                        )}
                                    </button>
                                )}
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
