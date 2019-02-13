const cloneDeep = require('lodash/cloneDeep')

function buildConfiguration ({ schemas, generator }) {
  const configuration = {}

  // Defines global options
  // generator.global_options.forEach((opt) => {
  //   configuration.options[opt.identifier] = opt.default_value
  // })

  // Defines model options
  // TODO - deprecate?
  // const defaultModelOptions = {}
  // generator.model_options.forEach((opt) => {
  //   defaultModelOptions[opt.identifier] = opt.default_value
  // })

  // Creates an instance of defaultModelOptions in
  // configuration.model_options for each model in the blueprint
  // schemas.forEach((model) => {
  //   configuration.model_options[model._id] = cloneDeep(defaultModelOptions)
  // })

  // // // //
  // OPTION_GROUPS Implementation
  // TODO - this needs to handle ALL kinds of defaults & requirements

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
        const schemaOptions = {}
        group.attributes.forEach(attr => schemaOptions[attr.identifier] = attr.default_value)
        instanceData[schema.identifier] = schemaOptions
      })

      // Assigns the instanceData object to the root configuration object
      configuration[group.identifier_plural] = instanceData
    } else if (group.type === 'OPTION_GROUP_TYPE_GLOBAL_OPTION') {
      // Iterates over each attribute in the GLOBAL_OPTION type,
      // sets instanceData to the default value
      group.attributes.forEach(attr => instanceData[attr.identifier] = attr.default_value)
      configuration[group.identifier] = instanceData
    } else if (group.type === 'OPTION_GROUP_TYPE_GLOBAL_BOOLEAN_GROUP') {
      // Iterates over each attribute in the GLOBAL_OPTION type,
      // sets instanceData to the default value
      group.attributes.forEach(attr => instanceData[attr.identifier] = attr.default_value)
      configuration[group.identifier] = instanceData
    }
    // TODO - define and handle other OPTION_GROUP_TYPE_* definitions
  })

  // // // //

  // Returns configuration object
  // console.log(configuration)
  return configuration
}

module.exports = buildConfiguration
