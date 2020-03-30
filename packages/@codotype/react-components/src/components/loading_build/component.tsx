import * as React from "react";
import { LoadingSpinner } from "../loading_spinner";
import sample from "lodash.sample";

// // // //

export const quotes: [string, string][] = [
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
    ["Patience is bitter, but its fruit is sweet.", "Aristotle"],
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
    // @ts-ignore
    const quote = props.quote || sample<[string, string]>(quotes) || quotes[0];
    // @ts-ignore
    const quoteBody = quote[0];
    // @ts-ignore
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
                        {quoteBody}
                        <br />- <strong>{quoteAuthor}</strong>
                    </small>
                </div>
            </div>
        </div>
    );
}
