const datatypes = require('@codotype/types/lib/datatypes')
const { inflateRelation } = require('./inflate')

const {
  RELATION_TYPE_BELONGS_TO,
  RELATION_TYPE_HAS_ONE,
  RELATION_TYPE_HAS_MANY
} = require('@codotype/types/lib/relation-types')

// CLEANUP - document this function, write better tests
const getDefaultAttributeValue = ({ type }) => {
  switch (type) {
    case datatypes.DATATYPE_STRING:
      return ''
    case datatypes.DATATYPE_TEXT:
      return ''
    case datatypes.DATATYPE_STRING_ARRAY:
      return []
    case datatypes.DATATYPE_STRING_SELECT:
      return []
    case datatypes.DATATYPE_INTEGER:
      return 0
    case datatypes.DATATYPE_FLOAT:
      return 0.0
    case datatypes.DATATYPE_DOUBLE:
      return 0.00
    case datatypes.DATATYPE_BOOLEAN:
      return false
    case datatypes.DATATYPE_JSON:
      return {}
    case datatypes.DATATYPE_DATE:
      return '2019-03-11' // QUESTION - what's the best way to handle this?
    case datatypes.DATATYPE_TIME:
      return '17:04:14 GMT-0400' // QUESTION - what's the best way to handle this?
    case datatypes.DATATYPE_DATETIME:
      return '3/18/2019, 5:04:51 PM' // QUESTION - what's the best way to handle this?
  }
}

// CLEANUP - document this function, write better tests
const getRelationKey = ({ relation }) => {
  switch (relation.type) {
    case RELATION_TYPE_BELONGS_TO:
      return relation.alias.identifier + '_id'
    case RELATION_TYPE_HAS_ONE:
      return relation.alias.identifier + '_id'
    case RELATION_TYPE_HAS_MANY:
      return relation.alias.identifier + '_ids'
  }
}

// CLEANUP - document this function, write better tests
const getDefaultRelationValue = ({ type }) => {
  switch (type) {
    case RELATION_TYPE_BELONGS_TO:
      return ''
    case RELATION_TYPE_HAS_ONE:
      return ''
    case RELATION_TYPE_HAS_MANY:
      return []
  }
}

// CLEANUP - document this function, write better tests
const buildDefault = ({ schema, schemas }) => {
  const defaultState = {}

  // Iterate over each attribute
  schema.attributes.forEach((attr) => {
    defaultState[attr.identifier] = attr.default_value || getDefaultAttributeValue({ type: attr.datatype })
  })

  // Iterate over each relation
  schema.relations.forEach((relation) => {
    const rel = inflateRelation({ schemas, relation })
    // QUESTION - this creates a problem after after the schema has been inflated - what's the solution?
    // Best option is probably splitting reverse relations into their own schema property
    const relationKey = getRelationKey({ relation: rel })
    if (relationKey) defaultState[getRelationKey({ relation: rel })] = getDefaultRelationValue({ type: relation.type })
  })

  return defaultState
}

// CLEANUP - document this function, write better tests
const buildConfigurationDefault = ({ attributes }) => {
  const defaultState = {}

  // Iterate over each attribute
  attributes.forEach((attr) => {
    defaultState[attr.identifier] = attr.default_value || getDefaultAttributeValue({ type: attr.datatype })
  })

  return defaultState
}

module.exports = {
  buildDefault,
  buildConfigurationDefault
}
