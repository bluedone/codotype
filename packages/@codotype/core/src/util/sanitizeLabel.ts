import { titleize } from "underscore.string";

// // // //

/**
 * sanitizeLabel
 * TODO - rename this to santiizeTitle
 * TODO - ANNOTATE THIS
 * @param label
 */
export function sanitizeLabel(label): string {
    // Replaces all non letter & whitespace characters
    // Replaces all chains of whitespace to a single space each
    return titleize(label.replace(/[^a-zA-Z\s]/gi, "").replace(/\s\s+/g, " "));
}
