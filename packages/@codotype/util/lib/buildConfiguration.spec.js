const assert = require('chai').assert;
const blueprint = require('@codotype/blueprints/lib/todo-list.json');
const {
  CONFIGURATION_GROUP_TYPE_OPTION,
  CONFIGURATION_GROUP_TYPE_ADDON,
  CONFIGURATION_GROUP_SCOPE_GLOBAL,
  CONFIGURATION_GROUP_SCOPE_SCHEMA
} = require('@codotype/types/lib/configuration-group-types');
const buildConfiguration = require('../lib/buildConfiguration');

// // // //

function buildConfigurationGroup({ type, scope }) {

  const configurationGroupAttributes = [{
    label: "Deploy with Netlify",
    identifier: "netlify",
    type: "BOOLEAN",
    help: "Generate a <code>netlify.toml</code> file in the output directory for easy deployment to Netlify.",
    default_value: false,
    more_info_url: "https://netlify.com/",
    icon: {}
  }]

  return Object.assign({}, {
    id: "TEST_CONFIGURATION_GROUP",
    label: "Deployment",
    identifier: "deployment",
    description: "Test the deployment configurationoptions for your app",
    type: type,
    scope: scope,
    more_info_url: null,
    attributes: configurationGroupAttributes
  })
}

// // // //

describe('/lib/buildDefault.js', () => {

  // Defines variables scoped for usage inside test blocks
  let userSchema = {};
  let taskSchema = {};

  // Isolates test schemas
  userSchema = blueprint.schemas[0]
  taskSchema = blueprint.schemas[1]

  // Defines mock schemas generator
  const schemas = [userSchema, taskSchema]

  describe('buildConfiguration - GLOBAL/OPTION', () => {
    it('should have required attributes', () => {

      const generator = {
        configuration_groups: [
          buildConfigurationGroup({
            type: CONFIGURATION_GROUP_TYPE_OPTION,
            scope: CONFIGURATION_GROUP_SCOPE_GLOBAL,
          })
        ]
      }

      const testConfiguration = buildConfiguration({ schemas, generator, configuration: {} });
      assert.equal(testConfiguration.deployment.netlify, false);
    });
  });

  describe('buildConfiguration - GLOBAL/ADDON', () => {
    it('should have required attributes', () => {

      const generator = {
        configuration_groups: [
          buildConfigurationGroup({
            type: CONFIGURATION_GROUP_TYPE_ADDON,
            scope: CONFIGURATION_GROUP_SCOPE_GLOBAL,
          })
        ]
      }

      const testConfiguration = buildConfiguration({ schemas, generator, configuration: {} });
      assert.equal(testConfiguration.deployment.length, 0);
    });
  });

  describe('buildConfiguration - SCHEMA/OPTION', () => {
    it('should have required attributes', () => {

      const generator = {
        configuration_groups: [
          buildConfigurationGroup({
            type: CONFIGURATION_GROUP_TYPE_OPTION,
            scope: CONFIGURATION_GROUP_SCOPE_SCHEMA,
          })
        ]
      }

      const testConfiguration = buildConfiguration({ schemas, generator, configuration: {} });
      assert.equal(testConfiguration.deployment.user.netlify, false);
      assert.equal(testConfiguration.deployment.task.netlify, false);
    });
  });

  describe('buildConfiguration - SCHEMA/ADDON', () => {
    it('should have required attributes', () => {

      const generator = {
        configuration_groups: [
          buildConfigurationGroup({
            type: CONFIGURATION_GROUP_TYPE_ADDON,
            scope: CONFIGURATION_GROUP_SCOPE_SCHEMA,
          })
        ]
      }

      const testConfiguration = buildConfiguration({ schemas, generator, configuration: {} });
      assert.equal(testConfiguration.deployment.user.length, 0);
      assert.equal(testConfiguration.deployment.task.length, 0);
    });
  });

});
