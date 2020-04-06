import { UUID } from "./uuid";

export enum SchemaSource {
  USER = "USER",
  GENERATOR = "GENERATOR",
}

export interface Schema {
  id: null | string;
  locked: boolean;
  source: SchemaSource;
  removable: boolean;
  label: string;
  label_plural: string;
  identifier: string;
  identifier_plural: string;
  class_name: string;
  class_name_plural: string;
  camel_case: string;
  camel_case_plural: string;
  attributes: any[];
  relations: any[];
  reverse_relations: any[];
}

// Taken from @codotype/util
// interface Schema {
//   id: UUID;
//   locked: boolean;
//   removable: boolean;
//   source: SchemaSource;
//   label: string;
//   label_plural: string;
//   identifier: string;
//   identifier_plural: string;
//   camel_case: string;
//   camel_case_plural: string;
//   class_name: string;
//   class_name_plural: string;
//   attributes: Attribute[];
//   relations: Relation[];
//   reverse_relations: Relation[];
// }

// // // //

export interface TokenPluralization {
  singular: string;
  plural: string;
}

export interface SchemaTokenCasing {
  label: TokenPluralization; // i.e "Token Pluralization"
  snake: TokenPluralization; // i.e "token_pluralization"
  camel: TokenPluralization; // i.e "tokenPluralization"
  pascal: TokenPluralization; // i.e "TokenPluralization"
  kebab: TokenPluralization; // i.e "token-pluralization"
}

// export interface SchemaConfigurationGroup {
//   id: null | string;
//   locked: boolean;
//   attributes: any[]; // AttributeType[]
//   relations: any[]; // RelationType[]
//   configurationGroups: any[]; // ConfigurationGroup
//   // defaultSchemas: any; // a Schemas array containing default schemas to load with the project.Learn more about default schema behavior here
//   supportedDatatypes: any[]; // The datatypes supported by this generator.Only an array of DATATYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
//   supportedRelations: any[]; // The relation types supported by this generator.Only an array of RELATION_TYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
// }

export interface SchemaV2 {
  id: UUID;
  locked: boolean;
  source: SchemaSource;
  removable: boolean;
  identifiers: SchemaTokenCasing; // Rename as `identifiers`?
  tokens: SchemaTokenCasing;
  attributes: any[];
  relations: any[];
  configuration: any; // ProjectConfiguration, wow!
  // reverse_relations: any[]; <--- these are _derived_, a computed value - doesn't need to be stored
}

//
// // // //

// QUESTION - where should this be located?
// ANSWER - this should live in react-components for now
export const DEFAULT_SCHEMA: Schema = {
  id: null,
  locked: false,
  source: SchemaSource.USER,
  removable: true,
  label: "",
  label_plural: "",
  identifier: "",
  identifier_plural: "",
  class_name: "",
  class_name_plural: "",
  camel_case: "",
  camel_case_plural: "",
  attributes: [],
  relations: [],
  reverse_relations: [],
};
