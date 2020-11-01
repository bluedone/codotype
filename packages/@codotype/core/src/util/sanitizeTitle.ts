import { titleize } from "underscore.string";

// // // //

/**
 * sanitizeTitle
 * Accepts user-provided value for TokenCasing.title and sanitizes it
 * @param input - the input string being transformed into "Title Case"
 */
export function sanitizeTitle(input): string {
    // Replaces all non letter & whitespace characters
    // Replaces all chains of whitespace to a single space each
    return titleize(input.replace(/[^a-zA-Z\s]/gi, "").replace(/\s\s+/g, " "));
}
