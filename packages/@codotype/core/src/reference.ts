import {
    RelationType,
    Relation,
    Attribute,
    TokenPluralization,
    ProjectConfiguration,
    UUID,
} from "../";
import { TokenCasing } from "./token";

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

// TODO - include reference to original project here?
export interface InflatedProject {
    id: UUID;
    schemas: InflatedSchema[];
    identifiers: TokenCasing;
    generatorId: string;
    generatorVersion: string;
    configuration: ProjectConfiguration;
}
