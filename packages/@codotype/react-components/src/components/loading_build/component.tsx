import * as React from "react";
import { LoadingSpinner } from "../loading_spinner";

// // // //

/**
 * LoadingBuild
 * Renders a spinning Codotype Logo
 */
export function LoadingBuild() {
    return (
        <div className="h-100 d-flex flex-row justify-content-center align-items-center">
            <div className="col-sm-12 col-md-8 col-lg-6">
                <div className="card card-body text-center shadow-sm">
                    <h3>
                        codotype{" "}
                        <span style={{ fontWeight: "lighter" }}>
                            is generating your codebase
                        </span>
                    </h3>
                    <small className="text-muted">
                        This should only take a few moments
                        <i className="far fa-laugh" />
                    </small>
                    <div className="row my-4">
                        <div className="col-lg-12 text-center d-flex justify-content-center">
                            <LoadingSpinner className="my-2" />
                        </div>
                    </div>
                    <small className="text-muted">
                        I have no patience with dinosaurs.
                        <br />- <strong>Adam West</strong>
                    </small>
                </div>
            </div>
        </div>
    );
}
