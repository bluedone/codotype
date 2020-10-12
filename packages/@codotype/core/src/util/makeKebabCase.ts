import { dasherize } from "underscore.string";

// // // //

/**
 * makeKebabCase
 * @param {string} label
 */
export function makeKebabCase(label: string): string {
    return dasherize(label).toLowerCase().slice(1); // TODO - why slice at 1....?
}
