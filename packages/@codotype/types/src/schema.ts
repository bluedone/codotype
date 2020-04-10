import { UUID } from "./uuid";
import { ProjectConfiguration } from "./ProjectConfiguration";
import { Attribute } from "./attribute";
import { Relation } from "./relation";

export enum SchemaSource {
  USER = "USER",
  GENERATOR = "GENERATOR",
}

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

export interface Schema {
  id: UUID;
  source: SchemaSource;
  locked: boolean;
  removable: boolean;
  attributes: Attribute[];
  relations: Relation[];
  identifiers: SchemaTokenCasing;
  configuration: ProjectConfiguration;
}

// // // //

// TODO - FIGURE OUT SCHEMA CONFIGURATION
// SHOULD INCLUDE DEFAULT SCHEMAS
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

//
// // // //

// QUESTION - where should this be located?
// ANSWER - this should live in react-components for now
export const DEFAULT_SCHEMA: Schema = {
  id: "",
  locked: false,
  source: SchemaSource.USER,
  removable: true,
  attributes: [],
  relations: [],
  configuration: {},
  identifiers: {
    label: {
      singular: "",
      plural: "",
    },
    snake: {
      singular: "",
      plural: "",
    },
    camel: {
      singular: "",
      plural: "",
    },
    pascal: {
      singular: "",
      plural: "",
    },
    kebab: {
      singular: "",
      plural: "",
    },
  },
};
