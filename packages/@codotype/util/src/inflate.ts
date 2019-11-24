import { inflateMeta } from "./inflateMeta";
import clone from "lodash/clone";
import uniqueId from "lodash/uniqueId";
import cloneDeep from "lodash/cloneDeep";

// // // //

// TODO - document this
// TODO - write tests for this
export function inflateRelation({ schemas, relation }) {
  // Clones the base attributes from the relation
  // let inflated = { ...relation }
  let inflated = clone(relation)

  // console.log('INFLATE RELATION')
  // console.log(JSON.stringify(inflated, null, 2))

  // defines inflated.alias && inflate.schema
  const ownedSchema = schemas.find((s) => { return s.id === inflated.schema_id })
  // console.log('OWNED SCHEMA????')
  // console.log(relation)
  // console.log(ownedSchema)
  const relatedSchema = schemas.find((s) => { return s.id === inflated.related_schema_id })

  // Clean this up...
  function getAttr(type, source) {
    if (['HAS_MANY', 'HAS_AND_BELONGS_TO_MANY'].includes(type)) {
      return inflated[source].identifier + '_ids'
    }
    return inflated[source].identifier + '_id'
  }

  // Handle inflated.schema
  // TODO - define a nicer name for `attribute` (idAttribute?)
  // TODO - abstract `attribute` ternary into a separate function
  inflated.schema = inflateMeta(relatedSchema.label)
  // inflated.schema.attribute = inflated.type === 'HAS_MANY' ? inflated.schema.identifier + '_ids' : inflated.schema.identifier + '_id'
  inflated.schema.attribute = getAttr(inflated.type, 'schema')

  // Handle inflated.alias
  // TODO - define a nicer name for `attribute` (idAttribute?)
  // TODO - abstract `attribute` ternary into a separate function
  inflated.alias = inflateMeta(inflated.as || relatedSchema.label)
  // inflated.alias.attribute = inflated.type === 'HAS_MANY' ? inflated.alias.identifier + '_ids' : inflated.alias.identifier + '_id'
  inflated.alias.attribute = getAttr(inflated.type, 'alias')

  inflated.reverse_alias = inflateMeta(inflated.reverse_as || ownedSchema.label)
  inflated.related_lead_attribute = !!relatedSchema.attributes[0] ? relatedSchema.attributes[0].identifier : '_id' // TODO - use `slug` instead of

  // Returns the inflated relation
  return inflated;
}

// TODO - document inflateSchema function
// Purpose and requirements
export function inflateSchema({ schema, schemas }) {
  // Clones original schema
  let inflated = cloneDeep(schema)

  // Inflates meta (adds camel_case, camel_case_plural)
  inflated = Object.assign(inflated, inflateMeta(inflated.label))

  // Flushes reverse_relations
  inflated.reverse_relations = []

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

// inflate
// Fomats the build parameters for the generator
// Mostly adds some additional metadata to each relation to simplify template rendering
// TODO - this may want to define the blueprint.identifier attribute (rather than relying on the client)
// TODO - much of this logic should be moved into the inflateSchema method
export function inflate({ blueprint }) {

  // Creates a deep-copy of the blueprint object
  const inflated = cloneDeep(blueprint)

  // Iterates over each schema (prep)
  inflated.schemas = inflated.schemas.map((schema) => {
    schema.reverse_relations = []
    return schema
  })

  // Iterates over each schema (inflate)
  inflated.schemas = inflated.schemas.map((schema) => {

    // Inflates meta (adds camel_case, camel_case_plural)
    schema = Object.assign(schema, inflateMeta(schema.label))

    // Flushes schema.reverse_relations
    // schema.reverse_relations = []

    // Inflate relations
    schema.relations = schema.relations.map((relation) => {

      // Assigns relation.schema_id
      relation.schema_id = schema.id

      // console.log('RELATIONS')
      // console.log(relation)

      let rel = inflateRelation({
        schemas: inflated.schemas,
        relation: relation
      })

      let relatedSchema = inflated.schemas.find(s => s.id === rel.related_schema_id)

      // Handles REF_BELONGS_TO
      // TODO - clean this up!
      if (rel.type) {

        const ref_relation = {
          id: uniqueId('REVERSE_' + rel.id),
          order: schema.reverse_relations.length,
          type: rel.type,
          required: false,
          schema_id: relatedSchema.id, // TODO - should these be flipped???
          related_schema_id: schema.id, // TODO - should these be flipped???
          as: rel.reverse_as,
          reverse_as: rel.as
        }

        // Inflates reference relation and appends to related schema
        const ref_relation_inflated = inflateRelation({ relation: ref_relation, schemas: inflated.schemas })
        // relatedSchema.relations.push(ref_relation_inflated)
        relatedSchema.reverse_relations.push(ref_relation_inflated)
      }

      return rel
    })

    return schema
  })

  return inflated
}

// // // //
