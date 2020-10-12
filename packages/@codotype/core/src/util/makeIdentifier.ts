import { underscored } from "underscore.string";

// // // //

/**
 * makeIdentifier
 * @param {string} label - the `Label` (singular or plural) to turn into an `Identifier`
 * @param {string} identifier - the `Identifier` produced
 */
export function makeIdentifier(label: string): string {
    return underscored(label.toLowerCase());
}
