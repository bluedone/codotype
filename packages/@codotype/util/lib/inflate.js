const { inflateMeta } = require('./inflateMeta')
const clone = require('lodash/clone')
const uniqueId = require('lodash/uniqueId')
const cloneDeep = require('lodash/cloneDeep')

// // // //

function inflateRelation({ schemas, relation }) {
  // Clones the base attributes from the relation
  // let inflated = { ...relation }
  let inflated = clone(relation)

  // console.log(inflated)

  // defines inflated.alias && inflate.schema
  const ownedSchema = schemas.find((s) => { return s.id === inflated.schema_id })
  const relatedSchema = schemas.find((s) => { return s.id === inflated.related_schema_id })

  // TODO - document this
  inflated.schema = inflateMeta(relatedSchema.label)
  inflated.alias = inflateMeta(inflated.as || relatedSchema.label)
  inflated.reverse_alias = inflateMeta(inflated.reverse_as || ownedSchema.label)
  inflated.related_lead_attribute = !!relatedSchema.attributes[0] ? relatedSchema.attributes[0].identifier : '_id' // TODO - use `slug` instead of

  // Returns the inflated relation
  return inflated;
}

// TODO - document inflateSchema function
// Purpose and requirements
function inflateSchema({ schema, schemas }) {
  // Clones original schema
  let inflated = cloneDeep(schema)

  // Inflates relations
  inflated.relations = schema.relations.map((relation) => {
    relation.schema_id = schema.id
    return inflateRelation({ schemas, relation })
  })

  // Inflates attributes
  // QUESTION - is this needed?
  inflated.attributes = schema.attributes.map(attribute => attribute)

  // TODO - add inlineDeconstruction here?
  // TODO - add defaultObject here?
  // TODO - add inflated.keys here?
  // Assigns inflated.keys
  // let defaultObject = buildDefault({ schema, schemas })
  // inflated.keys = Object.keys(defaultObject)

  // Returns the inflated schema
  return inflated
}

// object that gets passed into the generator
// const config = {
//   id: '...',
//   schemas: schemas.map(schema => inflateSchema({ schema, schemas }))
// }

// inflate
// Fomats the build parameters for the generator
// Mostly adds some additional metadata to each relation to simplify template rendering
// TODO - this may want to define the blueprint.identifier attribute (rather than relying on the client)
function inflate({ blueprint }) {

    const inflated = cloneDeep(blueprint)

    // Iterates over each schema
    inflated.schemas = inflated.schemas.map((schema) => {

        // Inflate relations
        schema.relations = schema.relations.map((relation) => {

            // Assigns relation.schema_id
            relation.schema_id = schema.id

            let rel = inflateRelation({
                relation: relation,
                schemas: inflated.schemas
            })

            let relatedSchema = inflated.schemas.find(s => s.id === rel.related_schema_id)

            // Handles REF_BELONGS_TO
            if (rel.type === 'BELONGS_TO') {

              const ref_relation = {
                id: uniqueId('REl_REF_'),
                order: relatedSchema.relations.length,
                type: 'REF_BELONGS_TO',
                required: false,
                schema_id: relatedSchema.id, // TODO - should these be flipped???
                related_schema_id: schema.id, // TODO - should these be flipped???
                as: rel.reverse_as,
                reverse_as: rel.as
              }

              // Inflates reference relation and appends to related schema
              const ref_relation_inflated = inflateRelation({ relation: ref_relation, schemas: inflated.schemas })
              relatedSchema.relations.push(ref_relation_inflated)
            }

            return rel
        })

        return schema
    })

    return inflated
}

// // // //

module.exports = {
  inflateSchema,
  inflateRelation,
  inflate
}
