import { UUID } from "./uuid";
import { TokenPluralization } from "./token";
import { SchemaCreators } from "./schema";

// // // //

/**
 * RelationType
 * Defines an enum of available RelationsTypes
 */
export enum RelationType {
    BELONGS_TO = "BELONGS_TO",
    HAS_ONE = "HAS_ONE",
    HAS_MANY = "HAS_MANY",
    TO_ONE = "TO_ONE",
    TO_MANY = "TO_MANY",
    HAS_AND_BELONGS_TO_MANY = "HAS_AND_BELONGS_TO_MANY",
}

/**
 * Relation
 * Defines the Relation interface
 * TODO - rename this to RelationInput
 * TODO - add support for addons here -> see AttributeAddon for context
 */
export interface Relation {
    id: UUID;
    type: RelationType;
    required: boolean; // TODO - keep this for now - should this be handled as an Addon?
    source: SchemaCreators;
    destinationSchemaId: UUID;
    sourceSchemaAlias: string;
    destinationSchemaAlias: string;
}

// Relation constants
// TODO - replace this with RelationInput?
export const DEFAULT_RELATION: Relation = {
    id: "",
    type: null,
    required: false,
    source: SchemaCreators.user,
    destinationSchemaId: "",
    sourceSchemaAlias: "",
    destinationSchemaAlias: "",
};

// // // //

/**
 * RelationReference
 * TODO - rename this to `Relation`
 * Defines the Reference interface
 */
export interface RelationReference {
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
