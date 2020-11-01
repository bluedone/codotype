import { UUID } from "./uuid";
import { TokenPluralization } from "./token";
import { CreatedBy } from "./created-by";
import { AddonsValue } from "./schema-editor-addon";

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
// QUESTION - update enum casing?
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
 * The `RelationInput` interface represents the data to describe a single Relation in @codotype/ui
 * The `RelationInput` is goes through additional processing before being passed into a Plugin as a `Relation`
 */
export interface RelationInput {
    id: UUID;
    type: RelationType;
    createdBy: CreatedBy;
    locked: boolean;
    internalNote: string;
    sourceSchemaID: UUID;
    destinationSchemaID: UUID;
    addons: AddonsValue;
    sourceSchemaAlias: string;
    destinationSchemaAlias: string;
}

// // // //

/**
 * Relation
 * The Reference interface encapsulates the complete metadata used to describe a reference between two Schemas
 * Used by a Plugin to generate the code required to successfully model that reference in generated code
 */
export interface Relation {
    id: UUID;
    type: RelationType;
    internalNote: string;
    createdBy: CreatedBy;
    locked: boolean;
    sourceRelationInputID: UUID;
    sourceSchemaID: UUID;
    destinationSchemaID: UUID;
    addons: AddonsValue;
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
