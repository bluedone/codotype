import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faDownload,
    faReply,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faLaugh, faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { CopyToClipboard } from "../CopyToClipboard";
import { ResponseType, ResponseTypes } from "@codotype/core";

// // // //

export function BuildFinished(props: {
    responseType: ResponseType;
    filepath: string;
    onClickBackToEditor: () => void;
}) {
    const [copyMessage, setCopyMessage] = React.useState<boolean>(false);
    React.useEffect(() => {
        if (copyMessage === false) {
            return;
        }

        setTimeout(() => {
            setCopyMessage(false);
        }, 1000);
    }, [copyMessage]);

    return (
        <div
            className="flex flex-col items-center h-full justify-center p-5 select-none"
            style={{ minHeight: "28rem" }}
        >
            {/* Header */}
            <div className="text-center">
                <p className="lead mb-2">
                    Thank you for using{" "}
                    <strong style={{ fontWeight: "bolder" }}>Codotype</strong>
                </p>

                <p className="lead mb-2">
                    <FontAwesomeIcon
                        icon={faHeart}
                        size="lg"
                        className="text-red-500"
                    />
                </p>

                {/* <small className="text-gray-600 dark:text-gray-300">
                    Your project has successfully been generated - horay!
                </small> */}
                <p className="text-gray-600 dark:text-gray-300 text-md">
                    Your starter code is ready
                </p>
            </div>

            {/* <!-- Local Plugin --> */}
            {/* TODO - use ResponseTypes enum from @codotype/core */}
            {props.filepath && props.responseType === ResponseTypes.local && (
                <div className="flex flex-col justify-center mt-3">
                    <p className="text-blue-500 dark:text-blue-200">
                        Your starter code is in the following local directory:
                    </p>
                    {/* TODO - add tooltip */}
                    <CopyToClipboard
                        onCopy={() => {
                            setCopyMessage(true);
                        }}
                    >
                        {({ copyToClipboard }) => (
                            <button
                                className="w-full border-primary border text-md bg-white text-gray-900 mt-2 rounded-full py-2 px-2"
                                onClick={() => {
                                    copyToClipboard(props.filepath);
                                }}
                            >
                                {copyMessage && (
                                    <span>Copied to clipboard</span>
                                )}

                                {!copyMessage && <span>{props.filepath}</span>}
                            </button>
                        )}
                    </CopyToClipboard>
                </div>
            )}

            {/* <!-- S3 Zip Download --> */}
            {/* TODO - use ResponseTypes enum from @codotype/core */}
            {props.responseType === ResponseTypes.s3 && (
                <div className="row flex justify-center mt-3">
                    <a
                        href={props.filepath}
                        target="_blank"
                        className="btn w-full btn-primary"
                    >
                        <FontAwesomeIcon icon={faDownload} className="mr-2" />
                        Download Exported Code
                    </a>
                </div>
            )}

            <p className="text-gray-600 dark:text-gray-300 text-sm mt-3">
                Please follow the instructions in{" "}
                <span className="font-semibold">README.md</span>
            </p>

            <div className="text-center mt-3">
                <p className="text-gray-600 dark:text-gray-300 lead">
                    <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
                    Remember, keep on iterating!
                </p>
            </div>

            <div className="grid mt-3">
                <div className="col-span-12 text-center">
                    <small className="text-gray-600 dark:text-gray-300">
                        Make changes and <strong>re-generate</strong> your
                        project as many times as you like{" "}
                        <FontAwesomeIcon icon={faLaugh} />
                    </small>
                </div>

                <div className="col-span-12">
                    <button
                        className="btn w-full btn-primary mt-3"
                        onClick={props.onClickBackToEditor}
                    >
                        <FontAwesomeIcon icon={faReply} className="mr-2" />
                        Back to Editor
                    </button>
                </div>
            </div>

            <hr />

            {/* FOOTER */}
            <div className="flex flex-col items-center justify-center mt-3">
                <p className="text-md">Support Codotype</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-3">
                    Give us a{" "}
                    <FontAwesomeIcon
                        icon={faStar}
                        className="mr-1 text-yellow-400"
                    />
                    on{" "}
                    <a
                        href="https://github.com/codotype/codotype"
                        target="_blank"
                        className="text-blue-400"
                    >
                        GitHub
                    </a>{" "}
                    and follow us on{" "}
                    <a
                        href="https://twitter.com/codotype"
                        target="_blank"
                        className="text-blue-500"
                    >
                        <FontAwesomeIcon
                            icon={fab.faTwitter}
                            className="mr-1"
                        />
                        Twitter
                    </a>
                </p>
            </div>
        </div>
    );
}
