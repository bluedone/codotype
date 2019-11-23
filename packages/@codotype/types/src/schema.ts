
export enum SchemaSource {
  USER = "USER",
  GENERATOR = "GENERATOR"
}

export interface Schema {
  id: null|string;
  locked: boolean;
  source: SchemaSource;
  removable: boolean;
  label: string;
  label_plural: string;
  identifier: string;
  identifier_plural: string;
  class_name: string;
  class_name_plural: string;
  attributes: any[];
  relations: any[];
  reverse_relations: any[];
}

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
  attributes: [],
  relations: [],
  reverse_relations: []
};
