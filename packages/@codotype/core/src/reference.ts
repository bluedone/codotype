import {
    RelationType,
    Attribute,
    TokenPluralization,
    ProjectConfiguration,
    UUID,
} from "../";

// // // //

/**
 * RelationReference
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
