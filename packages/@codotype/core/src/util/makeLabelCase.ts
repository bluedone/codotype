import { titleize } from "underscore.string";

// // // //

export function makeLabelCase(label): string {
  // Replaces all non letter & whitespace characters
  // Replaces all chains of whitespace to a single space each
  return titleize(label);
}
