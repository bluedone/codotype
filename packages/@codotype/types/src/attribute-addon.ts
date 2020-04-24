import { Datatype } from "./datatype";
import { UUID } from "./uuid";
import {
  OptionType,
  DropdownOption,
  OptionValue,
} from "./configuration-option-types";

// // // //

// AttributeAddon
// Defines an interface that can be used to extend the `Attribute` interface with
// additional properties that can be defined on a per-generator basis
// TODO - should this support a layoutVariant?
export interface AttributeAddon {
  id: UUID;
  label: string; // "Unique"
  identifier: string; // "unique"
  description: string; // "Whether this property is unique"
  documentation: string; // Enforced at the SQL level
  supportedDatatypes: Datatype[]; // [Datatype.STRING, Datatype.NUMBER]
  exclusive: boolean; // False - one schema can have multiple unique properties
  required: boolean; // Does this need to be populated?
  propertyType:
    | OptionType.BOOLEAN
    | OptionType.DROPDOWN
    | OptionType.STRING
    | OptionType.NUMBER; // Only stores primative data
  dropdownOptions: DropdownOption[]; // Only used when datatype: OptionType.DROPDOWN;
  defaultValue: null | boolean | string | number;
}

// // // //

export const ATTRIBUTE_ADDON_UNIQUE: AttributeAddon = {
  id: "ATTRIBUTE_ADDON_UNIQUE",
  label: "Unique",
  identifier: "unique",
  description: "Whether this Attribute's value is unique",
  documentation: "",
  supportedDatatypes: [
    Datatype.STRING,
    Datatype.NUMERIC,
    Datatype.TEXT,
    Datatype.TIMESTAMP,
    Datatype.TIME,
  ],
  exclusive: false,
  required: false,
  propertyType: OptionType.BOOLEAN,
  dropdownOptions: [],
  defaultValue: false,
};

export const ATTRIBUTE_ADDON_REQUIRED: AttributeAddon = {
  id: "ATTRIBUTE_ADDON_REQUIRED",
  label: "Required",
  identifier: "required",
  description: "Whether this Attribute's value is required",
  documentation: "",
  supportedDatatypes: [
    Datatype.STRING,
    Datatype.NUMERIC,
    Datatype.TEXT,
    Datatype.TIMESTAMP,
    Datatype.TIME,
  ],
  exclusive: false,
  required: false,
  propertyType: OptionType.BOOLEAN,
  dropdownOptions: [],
  defaultValue: false,
};

export const ATTRIBUTE_ADDON_NULLABLE: AttributeAddon = {
  id: "ATTRIBUTE_ADDON_NULLABLE",
  label: "Nullable",
  identifier: "nullable",
  description: "Whether this Attribute's value is nullable",
  documentation: "",
  supportedDatatypes: [
    Datatype.STRING,
    Datatype.NUMERIC,
    Datatype.TEXT,
    Datatype.TIMESTAMP,
    Datatype.TIME,
  ],
  exclusive: false,
  required: false,
  propertyType: OptionType.BOOLEAN,
  dropdownOptions: [],
  defaultValue: false,
};

export const ATTRIBUTE_ADDON_PRIMARY_KEY: AttributeAddon = {
  id: "ATTRIBUTE_ADDON_PRIMARY_KEY",
  label: "Primary Key",
  identifier: "primaryKey",
  description:
    "Whether this Attribute's value is the primary key for its Schema",
  documentation: "",
  supportedDatatypes: [
    Datatype.STRING,
    Datatype.NUMERIC,
    Datatype.TEXT,
    Datatype.TIMESTAMP,
    Datatype.TIME,
  ],
  exclusive: true,
  required: false,
  propertyType: OptionType.BOOLEAN,
  dropdownOptions: [],
  defaultValue: false,
};

export const ATTRIBUTE_ADDON_SELECT: AttributeAddon = {
  id: "ATTRIBUTE_ADDON_SELECT",
  label: "Select",
  identifier: "select",
  description:
    "Whether this Attribute's value is selected when querying the database",
  documentation: "",
  supportedDatatypes: [
    Datatype.STRING,
    Datatype.NUMERIC,
    Datatype.TEXT,
    Datatype.TIMESTAMP,
    Datatype.TIME,
  ],
  exclusive: false,
  required: false,
  propertyType: OptionType.BOOLEAN,
  dropdownOptions: [],
  defaultValue: false,
};
