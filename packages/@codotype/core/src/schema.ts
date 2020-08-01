import { UUID } from "./uuid";
import { ProjectConfiguration } from "./ProjectConfiguration";
import { Attribute } from "./attribute";
import { Relation } from "./relation";
import { TokenPluralization, EMPTY_TOKEN_CASING } from "./token";

export enum SchemaSource {
  USER = "USER",
  GENERATOR = "GENERATOR"
}

export interface Schema {
  id: UUID;
  source: SchemaSource;
  locked: boolean;
  removable: boolean;
  attributes: Attribute[];
  relations: Relation[];
  identifiers: TokenPluralization;
  configuration: ProjectConfiguration;
  internalNote?: string; // TODO - set internalNote as non-nullable
}

// // // //

export const DEFAULT_SCHEMA: Schema = {
  id: "",
  locked: false,
  source: SchemaSource.USER,
  removable: true,
  attributes: [],
  relations: [],
  configuration: {},
  identifiers: {
    singular: {
      ...EMPTY_TOKEN_CASING
    },
    plural: {
      ...EMPTY_TOKEN_CASING
    }
  }
};
