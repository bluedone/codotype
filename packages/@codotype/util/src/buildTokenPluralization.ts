import { titleize } from "underscore.string";
import { plural } from "pluralize";
import { TokenPluralization } from "@codotype/types";
import { buildTokenCasing } from "./buildTokenCasing";

// // // //

// buildTokenPluralization
// Accepts a singlar, titleized, human-readable label
// and produces all requisite metadata for sensible code generation
export function buildTokenPluralization(label: string): TokenPluralization {
  const labelPlural: string = plural(titleize(label));
  return {
    singular: buildTokenCasing(label),
    plural: buildTokenCasing(labelPlural),
  };
}
