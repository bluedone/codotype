import { UUID } from "./uuid";
import { ProjectConfiguration } from "./ProjectConfiguration";
import { Attribute } from "./attribute";
import { RelationReference } from "./reference";
import { Relation } from "./relation";
import { TokenPluralization } from "./token";

// // // //

/**
 * SchemaCreator
 * Used to differentiate between SchemaInput created by the User, or the Plugin
 */
type SchemaCreator = "user" | "plugin";
export enum SchemaCreators {
    user = "user",
    plugin = "plugin",
}

/**
 * SchemaInput
 * Interface used to describe the input used to derive a Codotype Schema
 */
export interface SchemaInput {
    id: UUID;
    source: SchemaCreator;
    locked: boolean;
    removable: boolean;
    attributes: Attribute[];
    relations: Relation[]; // TODO - remove this
    identifiers: TokenPluralization;
    configuration: ProjectConfiguration; // TODO - rename this to `PluginConfiguration`, accept update to accept a generic?
    internalNote: string; // TODO - set internalNote as non-nullable
}

/**
 * Schema
 * TODO - annotate this interface
 */
export interface Schema {
    id: UUID;
    relations: RelationReference[];
    references: RelationReference[];
    attributes: Attribute[];
    identifiers: TokenPluralization;
    configuration: ProjectConfiguration;
}
