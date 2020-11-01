import { UUID } from "./uuid";
import { PluginConfiguration } from "./plugin";
import { Attribute } from "./attribute";
import { Relation } from "./relation";
import { TokenPluralization } from "./token";

// // // //

/**
 * SchemaCreator
 * TODO - rename to SchemaCreatedBy
 * Used to differentiate between SchemaInput created by a User or a Plugin
 * Determines whether or not a SchemaInput may be removed from ProjectInput.schemas in @codotype/ui
 */
export type SchemaCreator = "user" | "plugin";
export enum SchemaCreators {
    user = "user",
    plugin = "plugin",
}

/**
 * SchemaInput
 * Interface used to describe the input used to derive Schema data used by a Plugin
 */
export interface SchemaInput {
    id: UUID;
    source: SchemaCreator;
    locked: boolean;
    removable: boolean;
    attributes: Attribute[];
    identifiers: TokenPluralization;
    internalNote: string;
    configuration: PluginConfiguration;
}

/**
 * Schema
 * Interface used to describe the Schema data that's passed into the Plugin to generate code
 */
export interface Schema {
    id: UUID;
    attributes: Attribute[];
    relations: Relation[];
    references: Relation[];
    identifiers: TokenPluralization;
    configuration: PluginConfiguration;
}
