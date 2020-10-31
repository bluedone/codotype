import {
    OptionValueInstance,
    ConfigurationGroup,
} from "./configuration-option-types";
import { Datatype } from "./datatype";
import { RelationTypes, RelationInput } from "./relation";
import { SchemaInput } from "./schema";
import { Attribute } from "./attribute";
import { AttributeAddon } from "./attribute-addon";
import { ProjectInput } from "./project";
import { Content } from "./content";

// // // //

/**
 * ExperienceRecommendation
 * Defines an recommendation for how experienced a user should be to use a specific Plugin
 * Note that "Level of experience" is subject to all sorts of interpretation by individual developing a plugin
 */
export type ExperienceRecommendation =
    | "beginner"
    | "junior"
    | "intermediate"
    | "expert";
export enum ExperienceRecommendations {
    beginner = "beginner",
    junior = "junior",
    intermediate = "intermediate",
    expert = "expert",
}

// QUESTION - should the be split up into better separation of concerns?
// i.e. AttributeEditorConfiguration, SchemaEditorConfiguration, RelationEditorConfiguration
export interface SchemaEditorConfiguration {
    documentation: string; // Any documentation for the SchemaEditor
    configurationGroups: ConfigurationGroup[]; // ConfigurationGroups scoped to each schema
    defaultSchemas: SchemaInput[]; // The default schemas included in a new project
    defaultRelations: RelationInput[]; // The default relations included in a new project
    supportedDatatypes: Datatype[]; // The datatypes supported by this generator
    supportedRelations: RelationTypes[]; // The relation types supported by this generator
    defaultAttributes: Attribute[]; // Default attributes applied to _every_ new Attribute - QUESTION - how do we enforce Addon value for any Attributes defined here?
    attributeAddons: AttributeAddon[]; // Addons made available to the AttributeEditor
    enableAttributeDefaultValue: boolean; // Whether or not to enable the `Default Value` input in the AttributeEditor
}

/**
 * PluginCreatorContactOptions
 * Provides enum of available types of contact information for a PluginCreator
 */
type PluginCreatorContactOption =
    | "github"
    | "gitlab"
    | "twitter"
    | "linkedin"
    | "email"
    | "website";
export enum PluginCreatorContactOptions {
    github = "github",
    gitlab = "gitlab",
    twitter = "twitter",
    linkedin = "linkedin",
    email = "email",
    website = "website",
}

/**
 * PluginCreator
 * Stores metadata about the creator of the Generator
 */
export interface PluginCreator {
    name: string;
    contact: {
        [key in PluginCreatorContactOption]?: string;
    };
}

export interface PluginMetadata {
    id: string; // unique ID for the generator
    content: Content;
    homepage: string; // the "homepage" for this generator
    version: string; // the current version of the generator
    codotypeVersion: string; // the version of codotype that runs this generator
    createdBy: PluginCreator; // Metadata about the
    techTags: string[]; // an array of strings describing the tech used in the generator
    typeTags: string[]; // describes the type of codebase produced by this generator
    experience: ExperienceRecommendation; // an optional tag detailing the level of experience required to use the code produced by the generator
    project_path: string; // the name of the directory for the generator's output
    schemaEditorConfiguration: SchemaEditorConfiguration;
    configurationGroups: ConfigurationGroup[]; // an array of OptionGroup objects that expose additional configuration provided by the generator
    exampleProjects: ProjectInput[];
}

// TODO - investigate this accepting a generic type to ensure type-safe enumeration of specific keys
export interface PluginConfiguration {
    [key: string]: OptionValueInstance;
}
