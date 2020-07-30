import { titleize } from "underscore.string";
import { plural } from "pluralize";
import { TokenPluralization } from "../";
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

interface TokenPluralizationValidationFailure {
  label: boolean;
  snake: boolean;
  camel: boolean;
  pascal: boolean;
  kebab: boolean;
}

/**
 * validateTokenPluralization
 * Verifies that singular and plural TokenCases are unique
 */
export function validateTokenPluralization(
  tokenPluralization: TokenPluralization
): TokenPluralizationValidationFailure {
  const { plural, singular } = tokenPluralization;

  const validationFailures: TokenPluralizationValidationFailure = {
    label: true,
    snake: true,
    camel: true,
    pascal: true,
    kebab: true,
  };

  Object.keys(plural).forEach((tokenCase) => {
    if (plural[tokenCase] === singular[tokenCase]) {
      validationFailures[tokenCase] = true;
      return;
    }
    validationFailures[tokenCase] = false;
  });

  return validationFailures;
}
