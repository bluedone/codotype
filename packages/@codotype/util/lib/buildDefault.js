const datatypes = require('@codotype/types/lib/datatypes')
const { inflateRelation } = require('./inflate')

const {
  RELATION_TYPE_BELONGS_TO,
  RELATION_TYPE_HAS_ONE,
  RELATION_TYPE_HAS_MANY
} = require('@codotype/types/lib/relation-types')


// TODO - this must support the remaining datatypes
const getDefaultAttributeValue = ({ type }) => {
  switch (type) {
    case datatypes.DATATYPE_STRING:
      return ''
    case datatypes.DATATYPE_NUMBER:
      return 0
    case datatypes.DATATYPE_BOOLEAN:
      return false
    case datatypes.DATATYPE_DATE:
      // return new Date()
      return '2019-03-11'
    case datatypes.DATATYPE_STRING_ARRAY:
      return []
    default:
      return ''
  }
}

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
    defaultState[attr.identifier] = attr.datatypeOptions.default || getDefaultAttributeValue({ type: attr.datatype })
  })

  // Iterate over each relation
  schema.relations.forEach((relation) => {
    const rel = inflateRelation({ schemas, relation })
    defaultState[getRelationKey({ relation: rel })] = getDefaultRelationValue({ type: relation.type })
  })

  return defaultState
}

const buildConfigurationDefault = ({ attributes }) => {
  const defaultState = {}

  // Iterate over each attribute
  attributes.forEach((attr) => {
    defaultState[attr.identifier] = attr.datatypeOptions.default || getDefaultAttributeValue({ type: attr.datatype })
  })

  return defaultState
}

module.exports = {
  buildDefault,
  buildConfigurationDefault
}
