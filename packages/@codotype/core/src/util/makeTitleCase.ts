import { titleize } from "underscore.string";

// // // //

/**
 * makeTitleCase
 * TODO - annotate
 * @param label
 */
export function makeTitleCase(label): string {
    // Replaces all non letter & whitespace characters
    // Replaces all chains of whitespace to a single space each
    return titleize(label);
}
