import * as React from "react";
import { LoadingSpinner } from "../loading_spinner";
const sample = require("lodash.sample");

// // // //

export const quotes: [string, string][] = [
    ["Patience is bitter, but its fruit is sweet.", "Aristotle"],
    ["I have no patience with dinosaurs.", "Adam West"],
    [
        "Have patience with all things, But, first of all with yourself.",
        "Saint Francis de Sales",
    ],
    [
        "Rivers know this: there is no hurry. We shall get there some day.",
        "A.A. Milne",
    ],
    ["Trees that are slow to grow bear the best fruit.", "Moliere"],
    ["Patience is a conquering virtue.", "Geoffrey Chaucer"],
    [
        "The strongest of all warriors are these two — Time and Patience.",
        "Leo Tolstoy",
    ],
];

/**
 * LoadingBuild
 * Renders a spinning Codotype Logo
 */
export function LoadingBuild(props: { quote?: [string, string] }) {
    const quote: [string, string] = props.quote || sample(quotes) || quotes[0];
    const quoteBody = quote[0];
    const quoteAuthor = quote[1];

    return (
        <div className="h-100 d-flex flex-row justify-content-center align-items-center">
            <div className="col-sm-12 col-md-8 col-lg-6">
                <div className="card card-body text-center shadow-sm">
                    <h3>
                        codotype{" "}
                        <span
                            style={{
                                fontWeight: "lighter",
                            }}
                        >
                            is generating your codebase
                        </span>
                    </h3>
                    <p className="text-muted mb-0">
                        This should only take a few moments
                        <i className="far fa-laugh" />
                    </p>
                    <div className="row my-4">
                        <div className="col-lg-12 text-center d-flex justify-content-center">
                            <div className="my-2">
                                <LoadingSpinner />
                            </div>
                        </div>
                    </div>
                    <small className="text-muted">
                        {quoteBody}
                        <br />- <strong>{quoteAuthor}</strong>
                    </small>
                </div>
            </div>
        </div>
    );
}
