const cloneDeep = require('lodash/cloneDeep')
const { buildConfigurationDefault } = require('./buildDefault')

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

    // Handles OPTION_GROUP_TYPE_MODEL_ADDON
    if (group.type === 'OPTION_GROUP_TYPE_MODEL_ADDON') {
      // Defines an object on to store the instance data for each option group
      let instanceData = configuration[group.identifier_plural] || {}
      let newInstanceData = {}

      // Iterates over each blueprint schema and creates an array
      // to store the addon instances associated with that schema
      schemas.forEach((schema) => { newInstanceData[schema.identifier] = instanceData[schema.identifier] || [] })

      // Assigns the instanceData object to the root configuration object
      configuration[group.identifier_plural] = newInstanceData
    } else if (group.type === 'OPTION_GROUP_TYPE_MODEL_OPTION') {
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
    } else if (group.type === 'OPTION_GROUP_TYPE_GLOBAL_OPTION') {
      // Iterates over each attribute in the GLOBAL_OPTION type,
      // sets instanceData to the default value
      configuration[group.identifier] = configuration[group.identifier] || buildConfigurationDefault({ attributes: group.attributes })
    } else if (group.type === 'OPTION_GROUP_TYPE_GLOBAL_ADDON') {
      // Iterates over each attribute in the GLOBAL_OPTION type,
      // sets instanceData to the default value
      configuration[group.identifier_plural] = configuration[group.identifier_plural] || []
    }
  })

  // // // //

  // Debugging
  // console.log(configuration)

  // Returns configuration object
  return configuration
}

module.exports = buildConfiguration
