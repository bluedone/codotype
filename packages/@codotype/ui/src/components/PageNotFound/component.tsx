import * as React from "react";

// // // //

/**
 * PageNotFound
 */
export function PageNotFound() {
    return (
        <div className="row h-100 align-items-center">
            <div className="col-lg-12">
                <div className="row mt-2">
                    <div className="col-lg-12 text-center">
                        <h4 className="display-4">
                            Oops, something went wrong.
                        </h4>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 text-center">
                        <p className="lead">
                            <i className="far fa-3x fa-frown" />
                        </p>
                    </div>

                    <div className="col-lg-12 text-center">
                        <p className="lead">
                            It was probably our fault - we're sorry about that.
                        </p>
                    </div>

                    <div className="col-lg-12 text-center" v-if="homeUrl">
                        <p className="lead">
                            <a href="homeUrl">Click here to return home</a>
                        </p>
                    </div>

                    <div className="col-lg-12 text-center" v-if="redirectUrl">
                        <p className="lead">
                            We'll be redirecting you momentarily
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
