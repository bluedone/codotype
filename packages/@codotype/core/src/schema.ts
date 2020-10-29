import { UUID } from "./uuid";
import { PluginConfiguration } from "./plugin";
import { Attribute } from "./attribute";
import { Relation } from "./relation";
import { TokenPluralization } from "./token";

// // // //

/**
 * SchemaCreator
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
 * TODO - annotate this interface
 */
export interface Schema {
    id: UUID;
    relations: Relation[];
    references: Relation[];
    attributes: Attribute[];
    identifiers: TokenPluralization;
    configuration: PluginConfiguration;
}
