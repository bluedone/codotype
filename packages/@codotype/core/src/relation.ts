import { UUID } from "./uuid";
import { TokenPluralization } from "./token";
import { SchemaCreators } from "./schema";

// // // //

/**
 * RelationType
 * Defines an enum of available RelationsTypes
 */
export type RelationType =
    | "BELONGS_TO"
    | "HAS_ONE"
    | "HAS_MANY"
    | "TO_ONE"
    | "TO_MANY"
    | "HAS_AND_BELONGS_TO_MANY"
    | "EMBEDS_ONE"
    | "EMBEDS_MANY";
// TODO - update enum casing to:
// RelationTypes.belongsTo
// RelationTypes.hasOne
// RelationTypes.hasMany
// RelationTypes.hasAndBelongsToMany
// RelationTypes.toOne
// RelationTypes.toMany
// RelationTypes.embedsOne
// RelationTypes.embedsMany
export enum RelationTypes {
    BELONGS_TO = "BELONGS_TO",
    HAS_ONE = "HAS_ONE",
    HAS_MANY = "HAS_MANY",
    TO_ONE = "TO_ONE",
    TO_MANY = "TO_MANY",
    HAS_AND_BELONGS_TO_MANY = "HAS_AND_BELONGS_TO_MANY",
    EMBEDS_ONE = "EMBEDS_ONE",
    EMBEDS_MANY = "EMBEDS_MANY",
}

/**
 * RelationInput
 * Defines the RelationInput interface
 * TODO - add support for addons here -> see AttributeAddon for context
 */
export interface RelationInput {
    id: UUID;
    type: RelationType;
    source: SchemaCreators;
    internalNote: string;
    sourceSchemaID: UUID;
    destinationSchemaID: UUID;
    sourceSchemaAlias: string; // TODO - make this TokenPluralization?
    destinationSchemaAlias: string; // TODO - make this TokenPluralization?
    // TODO - add addons here
}

// // // //

/**
 * Relation
 * Defines the Reference interface
 */
export interface Relation {
    id: UUID;
    type: RelationType;
    internalNote: string;
    sourceRelationId: UUID;
    sourceSchemaId: UUID;
    destinationSchemaId: UUID;
    // TODO - add addons here
    identifiers: {
        source: {
            canonical: TokenPluralization;
            alias: TokenPluralization;
        };
        destination: {
            canonical: TokenPluralization;
            alias: TokenPluralization;
        };
    };
}
