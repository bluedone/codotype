import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faDownload,
    faReply,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faLaugh } from "@fortawesome/free-regular-svg-icons";

// // // //

export function BuildFinished(props: {
    responseType: "S3_DOWNLOAD" | "LOCAL_PATH";
    downloadUrl?: string;
    filepath?: string;
    onClickBackToEditor: () => void;
}) {
    return (
        <div
            className="d-flex flex-column align-items-center h-100 justify-content-center"
            style={{ minHeight: "26rem" }}
        >
            {/* Header */}
            <div className="row">
                <div className="col-lg-12 text-center">
                    <p className="lead mb-1">
                        Thank you for using{" "}
                        <strong style={{ fontWeight: "bolder" }}>
                            Codotype
                        </strong>
                    </p>

                    <p className="lead mb-1">
                        <FontAwesomeIcon
                            icon={faHeart}
                            size="lg"
                            className="text-danger"
                        />
                    </p>

                    <small className="text-muted">
                        Your <span className="text-success">Project</span> has
                        successfully been generated
                    </small>
                    <br />
                    <small className="text-muted mt-3">
                        Download and unzip the codebase and follow the
                        instructions in <strong>README.md</strong>
                    </small>
                </div>
            </div>

            {/* <!-- Local Generator --> */}
            {props.filepath && props.responseType === "LOCAL_PATH" && (
                <div className="row d-flex justify-content-center mt-3">
                    <div className="col-sm-12 text-center">
                        <small className="text-primary">
                            Your codebase is in the following local directory:
                        </small>
                        <p className="lead mb-0">
                            {/* TODO - add tooltip */}
                            {/* v-b-tooltip.hover.bottom="'Copy to clipboard'" */}
                            {/* TODO - set up copy-to-clipboard */}
                            {/* https://github.com/nkbt/react-copy-to-clipboard */}
                            <button className="btn btn-sm btn-dark">
                                {props.filepath}
                            </button>
                        </p>
                    </div>
                </div>
            )}

            {/* <!-- S3 Zip Download --> */}
            {props.responseType === "S3_DOWNLOAD" && props.downloadUrl && (
                <div className="row d-flex justify-content-center mt-3">
                    <div className="col-lg-6">
                        <a
                            href={props.downloadUrl}
                            target="_blank"
                            className="btn btn-lg btn-block btn-success"
                        >
                            <FontAwesomeIcon
                                icon={faDownload}
                                className="mr-2"
                            />
                            Download ZIP
                        </a>
                    </div>
                </div>
            )}

            <div className="row d-flex justify-content-center mt-3">
                <div className="col-sm-12 text-center">
                    <p className="mb-1">
                        <i className="far fa-lightbulb" />
                        Remember, iteration is key
                    </p>

                    <small className="text-muted">
                        Make changes and <strong>re-generate</strong> your
                        Project as many times as you like{" "}
                        <FontAwesomeIcon icon={faLaugh} />
                    </small>
                </div>

                <div className="col-sm-12 col-md-4 mt-2">
                    <button
                        className="btn btn-block btn-outline-primary"
                        onClick={props.onClickBackToEditor}
                    >
                        <FontAwesomeIcon icon={faReply} className="mr-2" />
                        Back to Editor
                    </button>
                </div>
            </div>

            <hr />

            {/* FOOTER */}
            <div className="row d-flex justify-content-center">
                <div className="col-lg-12 text-center">
                    <p className="mb-0">Support Codotype</p>
                    <small className="text-muted">
                        Give us a{" "}
                        <FontAwesomeIcon
                            icon={faStar}
                            className="mr-1 text-warning"
                        />
                        on{" "}
                        <a
                            href="https://github.com/codotype/codotype"
                            target="_blank"
                        >
                            GitHub
                        </a>{" "}
                        or follow us on{" "}
                        <a href="https://twitter.com/codotype" target="_blank">
                            <FontAwesomeIcon
                                icon={fab.faTwitter}
                                className="mr-1"
                            />
                            Twitter
                        </a>
                    </small>
                </div>
            </div>
        </div>
    );
}
