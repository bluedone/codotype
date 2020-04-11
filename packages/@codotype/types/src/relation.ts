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
  required: boolean;
  schema_id: string; // REMOVE THIS, only needed for `InflatedRelation` / `RelationReference`
  related_schema_id: UUID;
  reverse_relation_id: UUID; // REMOVE THIS - only needed for `RelationReference`
  as: string; // TODO - rename 'as' to something else?
  reverse_as: string; // TODO - rename 'reverse_as' to something else?
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
  id: null,
  type: null,
  required: false,
  schema_id: "",
  related_schema_id: "",
  reverse_relation_id: "",
  as: "", // TODO - rename 'as' to something else?
  reverse_as: "", // TODO - rename 'reverse_as' to something else?
};
