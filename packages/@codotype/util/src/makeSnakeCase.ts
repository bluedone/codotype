import { classify, titleize } from "underscore.string";

// // // //

/**
 * makeSnakeCase
 * @param label
 */
export function makeSnakeCase(label: string): string {
  return classify(titleize(label));
}
