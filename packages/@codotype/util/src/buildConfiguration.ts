import { cloneDeep } from "lodash";
import { buildConfigurationDefault } from "./buildDefault";
import {
  Attribute,
  ConfigurationGroupType,
  ConfigurationGroupScope
} from "@codotype/types";

// Validates the state
// TODO - this must be moved elsewhere in @codotype/util
// const validateAttribute = ({ attribute, value }): boolean => {
//   if (!attribute.required) return true
//   if (attribute.required && value) return true
//   return false
// }

// // // //
// Type Definitions

type UUID = string | number;
type ConfigurationValue =
  | string
  | number
  | boolean
  | number[]
  | string[]
  | { [key: string]: string }; // TODO - flesh this out

// TODO - update to ENUM
// TODO - add `TO_ONE` and `TO_MANY` to help model GQL schemas
type RelationType =
  | "BELONGS_TO"
  | "HAS_ONE"
  | "HAS_MANY"
  | "HAS_AND_BELONGS_TO_MANY";

type AttributeType = "STRING" | "NUMBER" | "BOOLEAN"; // TODO - update to ENUM
type CodotypeSchemaSouce = "GENERATOR" | "USER"; // TODO - update to ENUM

interface ConfigurationGroup {
  label: string;
  identifier: string;
  description: string;
  type: ConfigurationGroupType;
  scope: ConfigurationGroupScope;
  more_info_url: string;
  attributes: Attribute[];
}

interface CodotypeRelation {
  id: UUID;
  type: RelationType;
  required: boolean;
  schema_id: UUID;
  related_schema_id: UUID;
  reverse_relation_id: UUID;
  as: string; // TODO - rename 'as' to something else?
  reverse_as: string; // TODO - rename 'reverse_as' to something else?
}

interface CodotypeSchema {
  id: UUID;
  locked: boolean;
  removable: boolean;
  source: CodotypeSchemaSouce;
  label: string;
  label_plural: string;
  identifier: string;
  identifier_plural: string;
  camel_case: string;
  camel_case_plural: string;
  class_name: string;
  class_name_plural: string;
  attributes: Attribute[];
  relations: CodotypeRelation[];
  reverse_relations: CodotypeRelation[];
}

interface Configuration {
  [key: string]: ConfigurationValue;
}

interface CodotypeProject {
  label: string;
  identifier: string;
  camel_case: string;
  class_name: string;
  configuration: Configuration;
  schemas: CodotypeSchema[];
}

interface CodotypeGenerator {
  id: string;
  label: string;
  icon: string;
  description: string;
  tech_tags: string[];
  type_tags: string[];
  self_configuring: boolean;
  project_path: string;
  github_url: string; // TODO - should be repo URL
  version: string;
  official: boolean; // TODO - remove this
  experience: string;
  configuration_groups: ConfigurationGroup[];
  defaultConfiguration: Configuration;
  defaultSchemas: CodotypeSchema[];
  supportedRelations: RelationType[];
  supportedDatatypes: AttributeType[];
}

// // // //

interface BuildConfigurationProps {
  schemas: CodotypeSchema[];
  configuration: Configuration;
  generator: CodotypeGenerator;
}

export function buildConfiguration(
  props: BuildConfigurationProps
): Configuration {
  // Destructure props
  // TODO - configuration should be immutable, should return a new copy
  const { schemas, generator, configuration = {} } = props;

  // Iterates over each option group in a single generator
  generator.configuration_groups.forEach(group => {
    // Handles CONFIGURATION_GROUP_TYPE_ADDON with CONFIGURATION_GROUP_SCOPE_SCHEMA
    if (
      group.type === ConfigurationGroupType.ADDON &&
      group.scope === ConfigurationGroupScope.SCHEMA
    ) {
      // Defines an object on to store the instance data for each option group
      let instanceData = configuration[group.identifier] || {};
      let newInstanceData = {};

      // Iterates over each blueprint schema and creates an array
      // to store the addon instances associated with that schema
      schemas.forEach(schema => {
        newInstanceData[schema.identifier] =
          instanceData[schema.identifier] || [];
      });

      // Assigns the instanceData object to the root configuration object
      configuration[group.identifier] = newInstanceData;

      // Handles CONFIGURATION_GROUP_TYPE_OPTION with CONFIGURATION_GROUP_SCOPE_SCHEMA
    } else if (
      group.type === ConfigurationGroupType.OPTION &&
      group.scope === ConfigurationGroupScope.SCHEMA
    ) {
      // Defines an object on to store the instance data for each option group
      let instanceData = configuration[group.identifier] || {};
      let newInstanceData = {};

      // Iterates over each blueprint schema and creates an array
      // to store the addon instances associated with that schema
      schemas.forEach(schema => {
        newInstanceData[schema.identifier] =
          instanceData[schema.identifier] ||
          buildConfigurationDefault({ attributes: group.attributes });
      });

      // Assigns the instanceData object to the root configuration object
      configuration[group.identifier] = newInstanceData;

      // Handles CONFIGURATION_GROUP_TYPE_ADDON with CONFIGURATION_GROUP_SCOPE_GLOBAL
    } else if (
      group.type === ConfigurationGroupType.ADDON &&
      group.scope === ConfigurationGroupScope.GLOBAL
    ) {
      // Iterates over each attribute in the GLOBAL_OPTION type,
      // sets instanceData to the default value
      configuration[group.identifier] = configuration[group.identifier] || [];

      // Handles CONFIGURATION_GROUP_TYPE_OPTION with CONFIGURATION_GROUP_SCOPE_GLOBAL
    } else if (
      group.type === ConfigurationGroupType.OPTION &&
      group.scope === ConfigurationGroupScope.GLOBAL
    ) {
      // Iterates over each attribute in the GLOBAL_OPTION type,
      // sets instanceData to the default value
      configuration[group.identifier] =
        configuration[group.identifier] ||
        buildConfigurationDefault({ attributes: group.attributes });
    }
  });

  // // // //

  // Debugging
  // console.log(configuration)

  // Returns configuration object
  return configuration;
}
