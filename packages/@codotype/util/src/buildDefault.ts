import { inflateRelation } from "../lib/inflateRelation'
import { ConfigurationOptionsType } from "@codotype/types/src/configuration-option-types";
import { RelationType } from "@codotype/types/src/relation";
import { Datatype } from "@codotype/types/src/datatype";

// CLEANUP - document this function, write better tests
export const getDefaultAttributeValue = ({ type }) => {
  switch (type) {
    case Datatype.STRING:
      return ''
    case Datatype.TEXT:
      return ''
    case Datatype.INTEGER:
      return 0
    case Datatype.BIGINT:
      return 0
    case Datatype.FLOAT:
      return 0.0
    case Datatype.DECIMAL:
      return 0.0
    case Datatype.NUMERIC:
      return 0.0
    case Datatype.BOOLEAN:
      return false
    case Datatype.JSON:
      return {}
    case Datatype.JSONB:
      return {}
    case Datatype.DATE:
      return '2019-03-11' // QUESTION - what's the best way to handle this?
    case Datatype.TIME:
      return '17:04:14 GMT-0400' // QUESTION - what's the best way to handle this?
    case Datatype.DATETIME:
      return '3/18/2019, 5:04:51 PM' // QUESTION - what's the best way to handle this?
    case Datatype.TIMESTAMP:
      return '3/18/2019, 5:04:51 PM' // QUESTION - what's the best way to handle this?
    case Datatype.STRING_ARRAY:
      return []
    case Datatype.TEXT_ARRAY:
      return []
    case Datatype.INTEGER_ARRAY:
      return []
    case Datatype.BIGINT_ARRAY:
      return []
    case Datatype.FLOAT_ARRAY:
      return []
    case Datatype.DECIMAL_ARRAY:
      return []
    case Datatype.NUMERIC_ARRAY:
      return []
    case Datatype.BOOLEAN_ARRAY:
      return []
    case Datatype.DATE_ARRAY:
      return []
    case Datatype.TIME_ARRAY:
      return []
    case Datatype.DATETIME_ARRAY:
      return []
    case Datatype.TIMESTAMP_ARRAY:
      return []
    case ConfigurationOptionsType.STRING_SELECT:
      return []
  }
}

// CLEANUP - document this function, write better tests
// TODO - abstract this function into a separate helper that can be invoked in multiple places
export const getRelationKey = ({ relation }) => {
  // return relation.alias.attribute
  switch (relation.type) {
    case RelationType.BELONGS_TO:
      return relation.alias.identifier + '_id'
    case RelationType.HAS_ONE:
      return relation.alias.identifier + '_id'
    case RelationType.HAS_MANY:
      return relation.alias.identifier + '_ids'
    case RelationType.HAS_AND_BELONGS_TO_MANY:
      return relation.alias.identifier + '_ids'
  }
}

// CLEANUP - document this function, write better tests
export const getDefaultRelationValue = ({ type }) => {
  switch (type) {
    case RelationType.BELONGS_TO:
      return ''
    case RelationType.HAS_ONE:
      return ''
    case RelationType.HAS_MANY:
      return []
    case RelationType.HAS_AND_BELONGS_TO_MANY:
      return []
  }
}

// CLEANUP - document this function, write better tests
export const buildDefault = ({ schema, schemas }) => {
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
export const buildConfigurationDefault = ({ attributes }) => {
  const defaultState = {}

  // Iterate over each attribute
  attributes.forEach((attr) => {
    defaultState[attr.identifier] = attr.default_value === undefined ? getDefaultAttributeValue({ type: attr.datatype }) : attr.default_value;
  })

  return defaultState
}
