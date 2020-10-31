import { classify, titleize } from "underscore.string";

// // // //

/**
 * makePascalCase
 * Accepts string and returns PascalCase version
 * @param input - the input string being transformed into PascalCase
 */
export function makePascalCase(input: string): string {
    return classify(titleize(input));
}
