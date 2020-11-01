import { UUID } from "./uuid";
import { PluginConfiguration } from "./plugin";
import { Attribute } from "./attribute";
import { Relation } from "./relation";
import { TokenPluralization } from "./token";
import { CreatedBy } from "./created-by";

// // // //

/**
 * SchemaInput
 * Interface used to describe the input used to derive Schema data used by a Plugin
 */
export interface SchemaInput {
    id: UUID;
    createdBy: CreatedBy;
    locked: boolean;
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
    createdBy: CreatedBy;
    locked: boolean;
    attributes: Attribute[];
    relations: Relation[];
    referencedBy: Relation[];
    identifiers: TokenPluralization;
    configuration: PluginConfiguration;
}
