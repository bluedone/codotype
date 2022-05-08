import * as React from "react";

// // // //

/**
 * BuildError
 * Displays message when build has failed
 * @returns
 */
export function BuildError() {
    return (
        <div className="row flex items-center h-full justify-center">
            <div className="col-sm-12 col-md-8 col-lg-6">
                <div className="card card-body rounded-lg shadow-sm">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <p className="title">
                                <strong>Uh oh.</strong>
                                <br />
                                Something went wrong
                            </p>
                            <p className="lead mb-2">
                                <i className="fas fa-lg fa-heart-broken text-red-500" />
                            </p>
                            <small className="text-muted">
                                Suspense is worse than disappointment
                                <br />- <strong>Robert Burns</strong>
                            </small>
                        </div>
                    </div>

                    <div className="row flex justify-center mt-3">
                        <div className="col-lg-6 text-center">Take me home</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
