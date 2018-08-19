const titleize = require('underscore.string/titleize')
const underscored = require('underscore.string/underscored')
const classify = require('underscore.string/classify')
const pluralize = require('pluralize')
const _ = require('lodash')

// // // //

function inflateMeta(label) {
  return {
    label: titleize(label),
    label_plural: pluralize(titleize(label)),
    identifier: underscored(label),
    identifier_plural: underscored(pluralize(label)),
    class_name: classify(titleize(label)),
    class_name_plural: pluralize(classify(titleize(label)))
  }
}

function inflateRelation({ schemas, relation }) {
  // Clones the base attributes from the relation
  // let inflated = { ...relation }
  let inflated = _.clone(relation)

  // console.log(inflated)

  // defines inflated.alias && inflate.schema
  const relatedSchema = schemas.find((s) => { return s._id === inflated.related_schema_id })
  inflated.schema = inflateMeta(relatedSchema.label)
  inflated.alias = inflateMeta(inflated.as || relatedSchema.label)
  inflated.related_lead_attribute = relatedSchema.attributes[0].identifier

  // Returns the inflated relation
  return inflated;
}

function inflateSchema({ schema, schemas }) {
  // let inflated = { ...schema }
  let inflated = _.cloneDeep(schema)
  inflated.relations = schema.relations.map(relation => inflateRelation({ schemas, relation }))
  inflated.attributes = schema.attributes.map(attribute => attribute)
  return inflated
}

// object that gets passed into the generator
// const config = {
//   id: '...',
//   schemas: schemas.map(schema => inflateSchema({ schema, schemas }))
// }

// // // //

module.exports = {
  inflateSchema,
  inflateRelation,
  inflateMeta
}