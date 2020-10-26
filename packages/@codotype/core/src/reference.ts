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

// TODO - move to @codotype/types
// TODO - rename this to something else - what's a good name for this when you're building a generator?
export interface InflatedSchema {
    id: UUID;
    relations: RelationReference[];
    references: RelationReference[];
    attributes: Attribute[];
    identifiers: TokenPluralization;
    configuration: ProjectConfiguration;
}
