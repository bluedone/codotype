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
  id: string;
  type: RelationType | null;
  required: boolean;
  schema_id: string;
  related_schema_id: string;
  reverse_relation_id: string;
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
