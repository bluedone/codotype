const cloneDeep = require('lodash/cloneDeep')

// Defines the default state
// TODO - this must be moved into @codotype/util
const buildDefault = ({ attributes }) => {
  const defaultState = {}
  attributes.forEach((attr) => {
    defaultState[attr.identifier] = attr.default_value
  })
  console.log(defaultState)
  return defaultState
}

// // Validates the state
// // TODO - this must be moved into @codotype/util
// const validateAttribute = ({ attribute, value }) => {
//   attribute.forEach((attr) => {
//     defaultState[attr.identifier] = attr.default_value
//   })
//   return true
// }

function buildConfiguration ({ schemas, generator }) {
  const configuration = {}

  // // // //
  // OPTION_GROUPS Implementation
  // TODO - this needs to handle ALL kinds of defaults & requirements
  // TODO - handle default instances for *_ADDON types
  generator.option_groups.forEach((group) => {
    // console.log(group)

    // Defines an object on to store the instance data for each option group
    const instanceData = {}

    // Handles OPTION_GROUP_TYPE_MODEL_ADDON
    if (group.type === 'OPTION_GROUP_TYPE_MODEL_ADDON') {
      // Iterates over each blueprint schema and creates an array
      // to store the addon instances associated with that schema
      schemas.forEach((schema) => { instanceData[schema.identifier] = [] })

      // Assigns the instanceData object to the root configuration object
      configuration[group.identifier_plural] = instanceData
    } else if (group.type === 'OPTION_GROUP_TYPE_MODEL_OPTION') {
      // Iterates over each blueprint schema and creates an array
      // to store the addon instances associated with that schema
      schemas.forEach((schema) => {
        instanceData[schema.identifier] = buildDefault({ attributes: group.attributes })
      })

      // Assigns the instanceData object to the root configuration object
      configuration[group.identifier_plural] = instanceData
    } else if (group.type === 'OPTION_GROUP_TYPE_GLOBAL_OPTION') {
      // Iterates over each attribute in the GLOBAL_OPTION type,
      // sets instanceData to the default value
      configuration[group.identifier] = buildDefault({ attributes: group.attributes })
    } else if (group.type === 'OPTION_GROUP_TYPE_GLOBAL_ADDON') {
      // Iterates over each attribute in the GLOBAL_OPTION type,
      // sets instanceData to the default value
      configuration[group.identifier_plural] = []
    }
  })

  // // // //

  // Returns configuration object
  // console.log(configuration)
  return configuration
}

module.exports = buildConfiguration
