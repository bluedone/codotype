import { underscored } from "underscore.string";

// // // //

/**
 * makeSnakeCase
 * Accepts string and returns snake_case version
 * @param input - the input string being transformed into snake_case
 */
export function makeSnakeCase(input: string): string {
    return underscored(input.toLowerCase());
}
