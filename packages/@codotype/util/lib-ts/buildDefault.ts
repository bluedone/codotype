const datatypes = require('@codotype/types/lib/datatypes')
const optiontypes = require('@codotype/types/lib/configuration-option-types')
const { inflateRelation } = require('./inflate')

const {
  RELATION_TYPE_BELONGS_TO,
  RELATION_TYPE_HAS_ONE,
  RELATION_TYPE_HAS_MANY,
  RELATION_TYPE_HAS_AND_BELONGS_TO_MANY,
} = require('@codotype/types/lib/relation-types')

// CLEANUP - document this function, write better tests
const getDefaultAttributeValue = ({ type }) => {
  switch (type) {
    case datatypes.DATATYPE_STRING:
      return ''
    case datatypes.DATATYPE_TEXT:
      return ''
    case datatypes.DATATYPE_INTEGER:
      return 0
    case datatypes.DATATYPE_BIGINT:
      return 0
    case datatypes.DATATYPE_FLOAT:
      return 0.0
    case datatypes.DATATYPE_DECIMAL:
      return 0.0
    case datatypes.DATATYPE_NUMERIC:
      return 0.0
    case datatypes.DATATYPE_BOOLEAN:
      return false
    case datatypes.DATATYPE_JSON:
      return {}
    case datatypes.DATATYPE_JSONB:
      return {}
    case datatypes.DATATYPE_DATE:
      return '2019-03-11' // QUESTION - what's the best way to handle this?
    case datatypes.DATATYPE_TIME:
      return '17:04:14 GMT-0400' // QUESTION - what's the best way to handle this?
    case datatypes.DATATYPE_DATETIME:
      return '3/18/2019, 5:04:51 PM' // QUESTION - what's the best way to handle this?
    case datatypes.DATATYPE_TIMESTAMP:
      return '3/18/2019, 5:04:51 PM' // QUESTION - what's the best way to handle this?
    case datatypes.DATATYPE_STRING_ARRAY:
      return []
    case datatypes.DATATYPE_TEXT_ARRAY:
      return []
    case datatypes.DATATYPE_INTEGER_ARRAY:
      return []
    case datatypes.DATATYPE_BIGINT_ARRAY:
      return []
    case datatypes.DATATYPE_FLOAT_ARRAY:
      return []
    case datatypes.DATATYPE_DECIMAL_ARRAY:
      return []
    case datatypes.DATATYPE_NUMERIC_ARRAY:
      return []
    case datatypes.DATATYPE_BOOLEAN_ARRAY:
      return []
    case datatypes.DATATYPE_DATE_ARRAY:
      return []
    case datatypes.DATATYPE_TIME_ARRAY:
      return []
    case datatypes.DATATYPE_DATETIME_ARRAY:
      return []
    case datatypes.DATATYPE_TIMESTAMP_ARRAY:
      return []
    case optiontypes.OPTION_TYPE_STRING_SELECT:
      return []
  }
}

// CLEANUP - document this function, write better tests
// TODO - abstract this function into a separate helper that can be invoked in multiple places
const getRelationKey = ({ relation }) => {
  // return relation.alias.attribute
  switch (relation.type) {
    case RELATION_TYPE_BELONGS_TO:
      return relation.alias.identifier + '_id'
    case RELATION_TYPE_HAS_ONE:
      return relation.alias.identifier + '_id'
    case RELATION_TYPE_HAS_MANY:
      return relation.alias.identifier + '_ids'
    case RELATION_TYPE_HAS_AND_BELONGS_TO_MANY:
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
    case RELATION_TYPE_HAS_AND_BELONGS_TO_MANY:
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
    defaultState[attr.identifier] = attr.default_value === undefined ? getDefaultAttributeValue({ type: attr.datatype }) : attr.default_value;
  })

  return defaultState
}

module.exports = {
  buildDefault,
  buildConfigurationDefault
}
