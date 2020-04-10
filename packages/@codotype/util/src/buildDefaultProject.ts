import {
  Project,
  OptionType,
  OptionValue,
  ProjectConfiguration,
  OptionValueInstance,
  ConfigurationGroup,
  GeneratorMeta,
  ConfigurationGroupProperty,
} from "@codotype/types";

// // // //

/**
 * buildConfigurationGroupPropertyValue
 * Accepts a single ConfigurationGroupProperty and recursively produces its associated OptionValue instance
 * @param property - the single ConfigurationGroupProperty for which the OptionValue is being produced
 */
export function buildConfigurationGroupPropertyValue(
  property: ConfigurationGroupProperty
): OptionValue {
  if (property.type === OptionType.STRING) {
    return property.defaultValue || "";
  }
  if (property.type === OptionType.BOOLEAN) {
    return property.defaultValue || false;
  }
  if (property.type === OptionType.DROPDOWN) {
    return property.defaultValue || "";
  }
  if (property.type === OptionType.COLLECTION) {
    return [buildConfigurationGroupValue(property.properties)];
    // Should return this:
    // return [];
  }
  if (property.type === OptionType.INSTANCE) {
    return buildConfigurationGroupValue(property.properties);
  }
  return "";
}

/**
 * buildConfigurationGroupValue
 * Builds the top-level OptionValueInstance for a single ConfigurationGroup
 * @param properties - array of ConfigurationGroupProperty
 */
export function buildConfigurationGroupValue(
  properties: ConfigurationGroupProperty[]
): OptionValueInstance {
  const initialValue: OptionValueInstance = {};

  // Defines empty ConfigurationGroupValue
  // Iterates over each property in the group and assigns values
  const configurationGroupValue: any = properties.reduce(
    (val, property: ConfigurationGroupProperty) => {
      // Updates val with data for ConfigurationGroupProperty
      if (property.allowDisable && !property.required) {
        val[property.identifier] = {
          enabled: property.enabled,
          value: buildConfigurationGroupPropertyValue(property),
        };
      } else {
        val[property.identifier] = buildConfigurationGroupPropertyValue(
          property
        );
      }
      // Returns val
      return val;
    },
    initialValue // Passes in empty OptionValueInstance
  );

  // Returns ConfigurationGroupValue
  return configurationGroupValue;
}

/**
 * buildDefaultProject
 * Builds an empty Project
 * @param
 */
export function buildDefaultProject(generatorMeta: GeneratorMeta): Project {
  // Defines default ProjectConfiguration
  const projectConfiguration: ProjectConfiguration = generatorMeta.configuration_groups.reduce(
    (val, configurationGroup: ConfigurationGroup) => {
      const initialValue: OptionValueInstance = buildConfigurationGroupValue(
        configurationGroup.properties
      );
      return { ...val, [configurationGroup.identifier]: initialValue };
    },
    {} // Passes in empty ProjectConfiguration
  );

  // Returns ConfigurationGroupValue
  const newProject: Project = {
    id: "",
    identifiers: {
      label: "",
      snake: "",
      camel: "",
      pascal: "",
      kebab: "",
    },
    generatorId: generatorMeta.id,
    generatorVersion: generatorMeta.version,
    schemas: [],
    configuration: projectConfiguration,
  };

  // Returns the new project
  return newProject;
}
