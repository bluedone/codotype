import { underscored, classify, titleize } from 'underscore.string';
import { plural } from 'pluralize';

// // // //

// makeCamelCase
function makeCamelCase(input) {
  return input.charAt(0).toLowerCase() + input.slice(1)
}

/**
 * makeIdentifier
 * @param {string} label - the `Label` (singular or plural) to turn into an `Identifier`
 * @param {string} identifier - the `Identifier` produced
 */
export function makeIdentifier(label: string): string {
  return underscored(label);
}

// inflateMeta
// Accepts a singlar, titleized, human-readable label
// and produces all requisite metadata for sensible code generation
export function inflateMeta(label: string) {
  return {
    label: titleize(label),
    label_plural: plural(titleize(label)),
    identifier: makeIdentifier(label),
    identifier_plural: makeIdentifier(plural(label)),
    class_name: classify(titleize(label)), // TODO - rename to pascal & pascal_plural?
    class_name_plural: plural(classify(titleize(label))),
    camel_case: makeCamelCase(classify(titleize(label))),
    camel_case_plural: makeCamelCase(plural(classify(titleize(label))))
  }
}
