import { ConfigurationGroup } from "./configuration-option-types";

export enum ExperienceRecommendation {
  BEGINNER = "beginner",
  JUNIOR = "junior",
  INTERMEDIATE = "intermediate",
  EXPERT = "expert",
}

// TODO - should this be built-out to support enabling / disabling attribute properties?
// i.e. enable support for "required" / "unique" / "primary key" / "default value" options?
// Might make sense to add `constraints` object to the `Attribute` interface to support this cleanly.
// Might also want to add camelCase/pascalCase/etc. to Attribute
export interface SchemaConfigurationGroup {
  configurationGroups: any[]; // ConfigurationGroup
  // defaultSchemas: any; // a Schemas array containing default schemas to load with the project.Learn more about default schema behavior here
  supportedDatatypes: any[]; // The datatypes supported by this generator.Only an array of DATATYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
  supportedRelations: any[]; // The relation types supported by this generator.Only an array of RELATION_TYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
}

// TODO - GeneratorMeta should be split up into:
// Generator
// GeneratorMeta
// Generator encapsulate the GeneratorMeta + link to the entry point of the generator
// Can be defined in `index.ts` in the root of the generator, or split up into smaller components in `src`
export interface GeneratorMeta {
  id: string; // unique ID for the generator
  label: string; // short label for the generator
  description: string; // brief description of the generator
  icon: string; // URL to the generator's icon. Must be at least 200x200px
  homepage: string; // the "homepage" for this generator
  version: string; // the current version of the generator
  created_by: string; // optional (replaces "official")
  tech_tags: any; // an array of strings describing the tech used in the generator
  type_tags: any; // describes the type of codebase produced by this generator
  experience: ExperienceRecommendation; // an optional tag detailing the level of experience required to use the code produced by the generator
  project_path: string; // the name of the directory for the generator's output
  schemaConfigurationGroup: SchemaConfigurationGroup;
  configuration_groups: ConfigurationGroup[]; // an array of OptionGroup objects that expose additional configuration provided by the generator
  // All of this gets merged into configuration groups
  // defaultSchemas: any; // a Schemas array containing default schemas to load with the project.Learn more about default schema behavior here
  // defaultConfiguration: any; // object that can provide optional defaults / examples for each ConfigurationGroup.This is where you can supply default Addon data for different ConfigurationGroups
  // supportedDatatypes: any; // The datatypes supported by this generator.Only an array of DATATYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
  // supportedRelations: any; // The relation types supported by this generator.Only an array of RELATION_TYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
}

// // // //

// From @codtype/util
// interface CodotypeGenerator {
//   id: string;
//   label: string;
//   icon: string;
//   description: string;
//   tech_tags: string[];
//   type_tags: string[];
//   self_configuring: boolean;
//   project_path: string;
//   github_url: string; // TODO - should be repo URL
//   version: string;
//   official: boolean; // TODO - remove this
//   experience: string;
//   configuration_groups: ConfigurationGroup[];
//   defaultConfiguration: Configuration;
//   defaultSchemas: Schema[];
//   supportedRelations: RelationType[];
//   supportedDatatypes: Datatype[];
// }
