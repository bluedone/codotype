const titleize = require('underscore.string/titleize')

// // // //

function sanitizeLabel(label) {
  // Replaces all non letter & whitespace characters
  // Replaces all chains of whitespace to a single space each
  // TODO - enforce length?
  return titleize(label.replace(/[^a-zA-Z\s]/gi, '').replace(/\s\s+/g, ' '))
}

// // // //

module.exports = {
  sanitizeLabel
}