import { underscored, classify, titleize } from 'underscore.string';
import { plural } from 'pluralize';

// // // //

// makeCamelCase
function makeCamelCase(input) {
  return input.charAt(0).toLowerCase() + input.slice(1)
}

// inflateMeta
// Accepts a singlar, titleized, human-readable label
// and produces all requisite metadata for sensible code generation
export default function (label) {
  return {
    label: titleize(label),
    label_plural: plural(titleize(label)),
    identifier: underscored(label),
    identifier_plural: underscored(plural(label)),
    class_name: classify(titleize(label)),
    class_name_plural: plural(classify(titleize(label))),
    camel_case: makeCamelCase(classify(titleize(label))),
    camel_case_plural: makeCamelCase(plural(classify(titleize(label))))
  }
}
