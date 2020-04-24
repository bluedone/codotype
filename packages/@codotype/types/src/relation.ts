import { UUID } from "./uuid";
import { SchemaSource } from "./schema";

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
 */
export interface Relation {
  id: UUID;
  type: RelationType;
  required: boolean; // TODO - keep this for now - should this be handled as an Addon?
  source: SchemaSource;
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
  source: SchemaSource.USER,
  destinationSchemaId: "",
  sourceSchemaAlias: "",
  destinationSchemaAlias: "",
};
