import { ConfigurationGroup } from "./configuration-option-types";
import { Datatype } from "./datatype";
import { RelationType, Relation } from "./relation";
import { Schema } from "./schema";
import { Attribute } from "./attribute";
import { AttributeAddon } from "./attribute-addon";

export enum ExperienceRecommendation {
  BEGINNER = "beginner",
  JUNIOR = "junior",
  INTERMEDIATE = "intermediate",
  EXPERT = "expert"
}

// TODO - should this be built-out to support enabling / disabling attribute properties?
// i.e. enable support for "required" / "unique" / "primary key" / "default value" options?
// Might make sense to add `constraints` object to the `Attribute` interface to support this cleanly.
// Might also want to add camelCase/pascalCase/etc. to Attribute
// TODO - rename this to `schemaEditorConfiguration`
// TODO - add defaultSchemas
// TODO - add defaultAttributes
// TODO - add defaultRelations
// TODO - should the be split up into better separation of concerns? i.e. AttributeEditorConfiguration, SchemaEditorConfiguration, RelationEditorConfiguration
export interface SchemaConfigurationGroup {
  configurationGroups: ConfigurationGroup[];
  supportedDatatypes: Datatype[]; // The datatypes supported by this generator.
  supportedRelations: RelationType[]; // The relation types supported by this generator.
  // defaultSchemas: Schema<SchemaSource.GENERATOR>[]; // a Schemas array containing default schemas to load with the project.
  // defaultAttributes: Attribute[];
  // defaultRelations: Relation[];
  // attributeAddons: AttributeAddon[];
  // enableAttributeDefaultValue: boolean;
}

// // // //
// // // //

export interface SchemaEditorConfiguration {
  documentation: string; // Any documentation for the SchemaEditor
  configurationGroups: ConfigurationGroup[]; // ConfigurationGroup
  defaultSchemas: Schema[]; // QUESTION - how do we enforce Schema.source = SchemaSource.GENERATOR?
  supportedDatatypes: Datatype[]; // The datatypes supported by this generator
  supportedRelations: RelationType[]; // The relation types supported by this generator
  defaultAttributes: Attribute[]; // Default attributes applied to _every_ new Attribute - QUESTION - how do we enforce Addon value for any Attributes defined here?
  attributeAddons: AttributeAddon[]; // Addons made available to the AttributeEditor
  enableAttributeDefaultValue: boolean; // Whether or not to enable the `Default Value` input in the AttributeEditor
  defaultRelations: Relation[];
}

// // // //
// // // //

/**
 * GeneratorCreatorContactOption
 * Provides enum of available types of contact information for a GeneratorCreator
 */
enum GeneratorCreatorContactOption {
  github = "github",
  gitlab = "gitlab",
  twitter = "twitter",
  linkedin = "linkedin",
  email = "email",
  website = "website"
}

/**
 * GeneratorCreator
 * Stores metadata about the creator of the Generator
 */
interface GeneratorCreator {
  name: string;
  contact: {
    [key in GeneratorCreatorContactOption]?: string;
  };
}

// TODO - GeneratorMeta should be split up into:
// Generator
// GeneratorMeta
// Generator encapsulate the GeneratorMeta + link to the entry point of the generator
// Can be defined in `index.ts` in the root of the generator, or split up into smaller components in `src`
// TODO - update this to include example projects (must be bundled at the generator-level)
export interface GeneratorMeta {
  id: string; // unique ID for the generator
  label: string; // short label for the generator
  description: string; // brief description of the generator
  documentation: string; // More thorough documentation of the Generator
  icon: string; // URL to the generator's icon. Must be at least 200x200px
  homepage: string; // the "homepage" for this generator
  version: string; // the current version of the generator
  createdBy: GeneratorCreator; // Metadata about the
  techTags: string[]; // an array of strings describing the tech used in the generator
  typeTags: string[]; // describes the type of codebase produced by this generator
  experience: ExperienceRecommendation; // an optional tag detailing the level of experience required to use the code produced by the generator
  project_path: string; // the name of the directory for the generator's output
  schemaEditorConfiguration: SchemaEditorConfiguration;
  configurationGroups: ConfigurationGroup[]; // an array of OptionGroup objects that expose additional configuration provided by the generator
  // All of this gets merged into configuration groups
  // defaultConfiguration: any; // object that can provide optional defaults / examples for each ConfigurationGroup.
  // This is where you can supply default Addon data for different ConfigurationGroups
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
