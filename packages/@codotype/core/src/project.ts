import { SchemaInput } from "./schema";
import { PluginConfiguration } from "./plugin";
import { TokenCasing } from "./token";
import { Schema } from "./";
import { UUID } from "./uuid";

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
    configuration: PluginConfiguration;
    schemas: SchemaInput[];
    // relations: RelationInput[];
    // TODO - move relations here, migrate away from Schema.relations?
    // I *think* this should allow for more flexibility going forward, and really it's just a
    // matter of filtering project.relations in SchemaDetail, few little refactors but nothing major.
    // Makes more sense from a data+design perspetive.
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
    configuration: PluginConfiguration;
}
