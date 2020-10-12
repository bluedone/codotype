import { underscored } from "underscore.string";

// // // //

/**
 * makeSnakeCase
 * @param label
 */
export function makeSnakeCase(label: string): string {
    return underscored(label.toLowerCase());
}
