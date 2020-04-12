import { UUID } from "./uuid";

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
  required: boolean; // TODO - keep this for now, define `constraints` using SchemaEditorConfiguration.relationConstraints
  destinationSchemaId: UUID; // TODO - rename to destinationSchemaId
  sourceSchemaAlias: string;
  destinationSchemaAlias: string;
}

// From UTIL
// interface CodotypeRelation {
//   id: UUID;
//   type: RelationType;
//   required: boolean;
//   schema_id: UUID;
//   related_schema_id: UUID;
//   reverse_relation_id: UUID;
//   as: string; // TODO - rename 'as' to something else?
//   reverse_as: string; // TODO - rename 'reverse_as' to something else?
// }

// Relation constants
// TODO - replace this with RelationInput
export const DEFAULT_RELATION: Relation = {
  id: "",
  type: null,
  required: false,
  destinationSchemaId: "",
  sourceSchemaAlias: "",
  destinationSchemaAlias: "",
};
