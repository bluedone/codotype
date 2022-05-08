import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CopyToClipboard } from "../CopyToClipboard";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import {
    SchemaInput,
    ProjectInput,
    PreviewOutputType,
    schemaPreviewContent,
    PreviewOutputTypes,
} from "@codotype/core";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FadeIn } from "../FadeIn";

// // // //

/**
 * SchemaPreview
 * FEATURE - when hovering over a relation, it should display a tooltip with a preview of the related Schema
 * FEATURE - when clicking a relation it should jump to the corresponding schema
 * QUESTION - should plugins be able to configure which is the default preview type?
 */
export function SchemaPreview(props: {
    schemaInput: SchemaInput;
    projectInput: ProjectInput;
}) {
    const { schemaInput, projectInput } = props;
    const [previewOutputType, setRenderType] = React.useState<
        PreviewOutputType
    >(PreviewOutputTypes.typescript);
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
            schemaInput,
            projectInput,
            previewOutputType,
        }) || "";

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="rounded-2xl bg-gray-900 overflow-hidden border dark:border-gray-800">
                    <pre className="px-3 pt-3 pb-3 mb-0 text-lg">
                        <small className="mb-0">
                            <div className="text-gray-200">{content}</div>
                        </small>
                    </pre>

                    <div className="flex flex-row items-center border-primary-500 border-t-2">
                        <div className="flex flex-col flex-grow">
                            <select
                                value={previewOutputType}
                                onChange={e => {
                                    const value: PreviewOutputType = e
                                        .currentTarget
                                        .value as PreviewOutputType;
                                    setRenderType(value);
                                    e.currentTarget.blur();
                                }}
                                style={{ boxShadow: "none" }}
                                className="rounded-0 bg-gray-900 w-full text-gray-200 border-0 py-2 px-2"
                            >
                                <option value={PreviewOutputTypes.typescript}>
                                    TypeScript
                                </option>
                                <option value={PreviewOutputTypes.json}>
                                    JSON
                                </option>
                                <option value={PreviewOutputTypes.graphql}>
                                    GraphQL
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <CopyToClipboard
                                // text={content}
                                onCopy={() => {
                                    setCopyMessage(true);
                                }}
                            >
                                {({ copyToClipboard }) => (
                                    <button
                                        className="w-full rounded-0 text-gray-200 text-sm px-2 py-2 focus:outline-none"
                                        onClick={() => copyToClipboard(content)}
                                        style={{
                                            boxShadow: "none",
                                            minWidth: "6rem",
                                        }}
                                    >
                                        {copyMessage && (
                                            <FadeIn show={copyMessage}>
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faCheckCircle}
                                                        className="mr-2 text-green-500"
                                                    />
                                                    Copied
                                                </span>
                                            </FadeIn>
                                        )}

                                        {!copyMessage && (
                                            <FadeIn show={!copyMessage}>
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faCopy}
                                                        className="mr-2"
                                                    />
                                                    Copy
                                                </span>
                                            </FadeIn>
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
