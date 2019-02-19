const cloneDeep = require('lodash/cloneDeep')
const buildDefault = require('./buildDefault')

// Validates the state
// TODO - this must be moved elsewhere in @codotype/util
const validateAttribute = ({ attribute, value }) => {
  if (!attribute.required) return true
  if (attribute.required && value) return true
  return false
}

function buildConfiguration ({ schemas, generator }) {
  const configuration = {}

  // // // //
  // OPTION_GROUPS Implementation
  // TODO - this needs to handle ALL kinds of defaults & requirements
  // TODO - handle default instances for *_ADDON types
  generator.option_groups.forEach((group) => {
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
      console.log(schemas)
      console.log(group.identifier)
      console.log(instanceData)
      configuration[group.identifier] = instanceData
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
  console.log(configuration)
  return configuration
}

module.exports = buildConfiguration
