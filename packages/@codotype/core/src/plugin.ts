import { ConfigurationGroup } from "./configuration-option-types";
import { OptionValueInstance } from "./configuration-property";
import { ProjectInput } from "./project";
import { Content } from "./content";
import { SchemaEditorConfiguration } from "./schema-editor";

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

/**
 * PluginAuthorContactOptions
 * Provides enum of available types of contact information for a PluginCreator
 */
type PluginAuthorContactOption =
    | "github"
    | "gitlab"
    | "twitter"
    | "linkedin"
    | "email"
    | "website";
export enum PluginAuthorContactOptions {
    github = "github",
    gitlab = "gitlab",
    twitter = "twitter",
    linkedin = "linkedin",
    email = "email",
    website = "website",
}

/**
 * PluginAuthor
 * Stores metadata about the creator of the Generator
 */
export interface PluginAuthor {
    name: string;
    contact: {
        [key in PluginAuthorContactOption]?: string;
    };
}

/**
 * PluginMetadata
 * Defines an interface to encapsulate all the metadata for a single Plugin
 */
export interface PluginMetadata {
    identifier: string; // unique ID for the Plugin
    content: Content; // See `Content` interface
    homepage: string; // the "homepage" for this Plugin
    version: string; // the current version of the Plugin
    codotypeVersion: string; // the version of codotype that runs this Plugin
    createdBy: PluginAuthor; // Metadata about the
    techTags: string[]; // an array of strings describing the tech used in the Plugin
    typeTags: string[]; // describes the type of codebase produced by this Plugin
    experience: ExperienceRecommendation; // an optional tag detailing the level of experience required to use the code produced by the Plugin
    project_path: string; // the name of the directory for the Plugin's output
    schemaEditorConfiguration: SchemaEditorConfiguration;
    configurationGroups: ConfigurationGroup[]; // an array of OptionGroup objects that expose additional configuration provided by the Plugin
    exampleProjects: ProjectInput[];
}

/**
 * PluginConfiguration
 * TODO - annotate
 */
export interface PluginConfiguration {
    [key: string]: OptionValueInstance;
}
