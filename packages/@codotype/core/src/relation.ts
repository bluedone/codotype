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
    | "HAS_AND_BELONGS_TO_MANY";
export enum RelationTypes {
    BELONGS_TO = "BELONGS_TO",
    HAS_ONE = "HAS_ONE",
    HAS_MANY = "HAS_MANY",
    TO_ONE = "TO_ONE",
    TO_MANY = "TO_MANY",
    HAS_AND_BELONGS_TO_MANY = "HAS_AND_BELONGS_TO_MANY",
}

/**
 * RelationInput
 * Defines the RelationInput interface
 * TODO - add support for addons here -> see AttributeAddon for context
 */
export interface RelationInput {
    id: UUID;
    type: RelationType;
    required: boolean; // TODO - keep this for now - should this be handled as an Addon? YES.
    source: SchemaCreators;
    sourceSchemaID: UUID;
    destinationSchemaID: UUID;
    sourceSchemaAlias: string;
    destinationSchemaAlias: string;
}

// Relation constants
export const DEFAULT_RELATION_INPUT: RelationInput = {
    id: "",
    type: null,
    required: false,
    source: SchemaCreators.user,
    sourceSchemaID: "",
    destinationSchemaID: "",
    sourceSchemaAlias: "",
    destinationSchemaAlias: "",
};

// // // //

/**
 * Relation
 * Defines the Reference interface
 * TODO - add support for addons here -> see AttributeAddon for context
 */
export interface Relation {
    id: UUID;
    type: RelationType;
    sourceRelationId: UUID;
    sourceSchemaId: UUID;
    destinationSchemaId: UUID;
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
