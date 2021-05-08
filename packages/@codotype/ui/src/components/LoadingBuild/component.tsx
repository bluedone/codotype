import * as React from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaugh } from "@fortawesome/free-regular-svg-icons";

// const sample = require("lodash.sample");

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
    // const quote: [string, string] = props.quote || sample(quotes) || quotes[0];
    // const quoteBody = quote[0];
    // const quoteAuthor = quote[1];

    return (
        <div
            className="flex flex-col items-center h-full justify-center"
            style={{ minHeight: "28rem" }}
        >
            <h3 className="mr-2 text-3xl">We're exporting your codebase</h3>
            <p className="text-gray-600 dark:text-gray-200 mt-3">
                This should only take a few moments
                <FontAwesomeIcon icon={faLaugh} className="ml-2" />
            </p>
            <div className="flex justify-center my-8">
                <div className="my-2">
                    <LoadingSpinner />
                </div>
            </div>
        </div>
    );
}
