import { dasherize } from "underscore.string";
import { makeCamelCase } from "./makeCamelCase";

// // // //

/**
 * makeKebabCase
 * Accepts string and returns kebab-case version
 * @param input - the input string being transformed into kebab-case
 */
export function makeKebabCase(input: string): string {
    // Transform input into camelCase first to avoid any complications with dasherize function
    const camelCased = makeCamelCase(input);

    // Invoke dasherize and force output to lower-case
    return dasherize(camelCased).toLowerCase();
}
