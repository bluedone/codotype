import titleize from 'underscore.string/titleize';
import underscored from 'underscore.string/underscored';
import classify from 'underscore.string/classify';
import pluralize from 'pluralize';

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
    label_plural: pluralize(titleize(label)),
    identifier: underscored(label),
    identifier_plural: underscored(pluralize(label)),
    class_name: classify(titleize(label)),
    class_name_plural: pluralize(classify(titleize(label))),
    camel_case: makeCamelCase(classify(titleize(label))),
    camel_case_plural: makeCamelCase(pluralize(classify(titleize(label))))
  }
}
