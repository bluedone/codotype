import { titleize } from "underscore.string";

// // // //

/**
 * makeTitleCase
 * Accepts string and returns "Title Case" version
 * @param input - the input string being transformed into "Title Case"
 */
export function makeTitleCase(input): string {
    // Replaces all non letter & whitespace characters
    // Replaces all chains of whitespace to a single space each
    return titleize(input);
}
