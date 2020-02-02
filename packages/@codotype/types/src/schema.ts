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

export interface SchemaV2 {
  id: null | string;
  locked: boolean;
  source: SchemaSource;
  removable: boolean;
  tokens: SchemaTokenCasing;
  attributes: any[];
  relations: any[];
  reverse_relations: any[];
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
