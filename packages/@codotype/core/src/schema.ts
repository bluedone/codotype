import { UUID } from "./uuid";
import { ProjectConfiguration } from "./ProjectConfiguration";
import { Attribute } from "./attribute";
import { Relation } from "./relation";
import { TokenPluralization, EMPTY_TOKEN_CASING } from "./token";

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

// TODO - move Schema here, add note differentiating the two

// // // //

// QUESTION - do we need to keep this...?
export const DEFAULT_SCHEMA_INPUT: SchemaInput = {
    id: "",
    locked: false,
    source: SchemaCreators.user,
    removable: true,
    attributes: [],
    relations: [], // TODO - remove this
    configuration: {},
    internalNote: "",
    // TODO - can this be changed to just be `identifier`? Abstract all casing / pluralization away
    identifiers: {
        singular: {
            ...EMPTY_TOKEN_CASING,
        },
        plural: {
            ...EMPTY_TOKEN_CASING,
        },
    },
};
