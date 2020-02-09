export enum SchemaSource {
  USER = "USER",
  GENERATOR = "GENERATOR"
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

// // // //
// TODO - schema metadata should be updated to someting like:
export interface TokenPluralization {
  singular: string;
  plural: string;
}

export interface SchemaTokenCasing {
  title: TokenPluralization;
  snake: TokenPluralization;
  camel: TokenPluralization;
  pascal: TokenPluralization;
}

// // // //

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
  id: null | string;
  locked: boolean;
  source: SchemaSource;
  removable: boolean;
  tokens: SchemaTokenCasing;
  attributes: any[];
  relations: any[];
  configuration: any; // ProjectConfiguration, wow!
  // reverse_relations: any[]; <--- these are _derived_, a computed value - doesn't need to be stored
}

//
// // // //

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
  reverse_relations: []
};
