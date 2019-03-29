const titleize = require('underscore.string/titleize')
const underscored = require('underscore.string/underscored')
const classify = require('underscore.string/classify')
const pluralize = require('pluralize')

// // // //

// makeCamelCase
function makeCamelCase (input) {
  return input.charAt(0).toLowerCase() + input.slice(1)
}

// inflateMeta
// Accepts a singlar, titleized, human-readable label
// and produces all requisite metadata for sensible code generation
module.exports = function (label) {
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
