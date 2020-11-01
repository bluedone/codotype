import { SchemaInput } from "./schema";
import { ConfigurationValue } from "./configuration-value";
import { TokenCasing } from "./token";
import { Schema } from "./";
import { UUID } from "./uuid";
import { RelationInput } from "./relation";

// // // //

/**
 * ProjectInput
 * Input describing a single Project for a Plugin
 * Is later transformed into Project interface when building Plugin output in Runtime
 */
export interface ProjectInput {
    id: UUID;
    pluginID: string;
    pluginVersion: string;
    identifiers: TokenCasing;
    configuration: ConfigurationValue;
    schemas: SchemaInput[];
    relations: RelationInput[];
}

/**
 * Project
 * The verified and normalized ProjectInput, optimized for use by Plugins for building output
 */
export interface Project {
    id: UUID;
    schemas: Schema[];
    identifiers: TokenCasing;
    pluginID: string;
    pluginVersion: string;
    configuration: ConfigurationValue;
}
