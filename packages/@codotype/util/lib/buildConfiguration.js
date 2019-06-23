const cloneDeep = require('lodash/cloneDeep')
const { buildConfigurationDefault } = require('./buildDefault')
const {
  CONFIGURATION_GROUP_TYPE_OPTION,
  CONFIGURATION_GROUP_TYPE_ADDON,
  CONFIGURATION_GROUP_SCOPE_GLOBAL,
  CONFIGURATION_GROUP_SCOPE_SCHEMA
} = require('@codotype/types/lib/configuration-group-types');

// Validates the state
// TODO - this must be moved elsewhere in @codotype/util
const validateAttribute = ({ attribute, value }) => {
  if (!attribute.required) return true
  if (attribute.required && value) return true
  return false
}

function buildConfiguration ({ schemas, generator, configuration = {} }) {
  // Iterates over each option group in a single generator
  generator.configuration_groups.forEach((group) => {

    // Handles CONFIGURATION_GROUP_TYPE_ADDON with CONFIGURATION_GROUP_SCOPE_SCHEMA
    if (group.type === CONFIGURATION_GROUP_TYPE_ADDON && group.scope === CONFIGURATION_GROUP_SCOPE_SCHEMA) {
      // Defines an object on to store the instance data for each option group
      let instanceData = configuration[group.identifier] || {}
      let newInstanceData = {}

      // Iterates over each blueprint schema and creates an array
      // to store the addon instances associated with that schema
      schemas.forEach((schema) => { newInstanceData[schema.identifier] = instanceData[schema.identifier] || [] })

      // Assigns the instanceData object to the root configuration object
      configuration[group.identifier] = newInstanceData

    // Handles CONFIGURATION_GROUP_TYPE_OPTION with CONFIGURATION_GROUP_SCOPE_SCHEMA
    } else if (group.type === CONFIGURATION_GROUP_TYPE_OPTION && group.scope === CONFIGURATION_GROUP_SCOPE_SCHEMA) {
      // Defines an object on to store the instance data for each option group
      let instanceData = configuration[group.identifier] || {}
      let newInstanceData = {}

      // Iterates over each blueprint schema and creates an array
      // to store the addon instances associated with that schema
      schemas.forEach((schema) => {
        newInstanceData[schema.identifier] = instanceData[schema.identifier] || buildConfigurationDefault({ attributes: group.attributes })
      })

      // Assigns the instanceData object to the root configuration object
      configuration[group.identifier] = newInstanceData

    // Handles CONFIGURATION_GROUP_TYPE_ADDON with CONFIGURATION_GROUP_SCOPE_GLOBAL
    } else if (group.type === CONFIGURATION_GROUP_TYPE_ADDON && group.scope === CONFIGURATION_GROUP_SCOPE_GLOBAL) {
      // Iterates over each attribute in the GLOBAL_OPTION type,
      // sets instanceData to the default value
      configuration[group.identifier] = configuration[group.identifier] || []

    // Handles CONFIGURATION_GROUP_TYPE_OPTION with CONFIGURATION_GROUP_SCOPE_GLOBAL
    } else if (group.type === CONFIGURATION_GROUP_TYPE_OPTION && group.scope === CONFIGURATION_GROUP_SCOPE_GLOBAL) {
      // Iterates over each attribute in the GLOBAL_OPTION type,
      // sets instanceData to the default value
      configuration[group.identifier] = configuration[group.identifier] || buildConfigurationDefault({ attributes: group.attributes })

    }
  })

  // // // //

  // Debugging
  // console.log(configuration)

  // Returns configuration object
  return configuration
}

module.exports = buildConfiguration
