import { faFrown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

// // // //

/**
 * PageNotFound
 */
export function PageNotFound() {
    return (
        <div className="row h-full items-center">
            <div className="col-lg-12">
                <div className="row mt-2">
                    <div className="col-lg-12 text-center">
                        <h4 className="text-xl">Oops, something went wrong.</h4>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 text-center">
                        <p className="lead">
                            <FontAwesomeIcon size="3x" icon={faFrown} />
                        </p>
                    </div>

                    <div className="col-lg-12 text-center">
                        <p className="lead">
                            It was probably our fault - we're sorry about that.
                        </p>
                    </div>

                    <div className="col-lg-12 text-center">
                        <p className="lead">
                            <a href="https://codotype.io">
                                Click here to return home
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
