import { classify, titleize } from "underscore.string";

// // // //

/**
 * makePascalCase
 * @param label
 */
export function makePascalCase(label: string): string {
    return classify(titleize(label));
}
