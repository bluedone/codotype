import { camelCase } from "change-case";

// // // //

/**
 * makeCamelCase
 * Accepts string and returns camelCase version
 * @param input - the input string being transformed into camelCase
 */
export function makeCamelCase(input: string): string {
    return camelCase(input);
}
