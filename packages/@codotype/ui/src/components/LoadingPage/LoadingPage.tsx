import * as React from "react";
import { LoadingSpinner } from "../loading_spinner";

// // // //

/**
 * LoadingPage
 */
export function LoadingPage() {
    return (
        <div className="h-100 d-flex flex-row align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <LoadingSpinner />
                    </div>
                </div>
            </div>
        </div>
    );
}
