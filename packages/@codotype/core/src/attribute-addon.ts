import { Datatype } from "./datatype";
import { UUID } from "./uuid";
import { OptionType, DropdownOption } from "./configuration-option-types";
import { PropertyFilter } from "./property-filter";
import { PropertyValidation } from "./property-validation";

// // // //

// AttributeAddon
// Defines an interface that can be used to extend the `Attribute` interface with
// additional properties that can be defined on a per-generator basis
// TODO - should this support a layoutVariant?
// TODO - wire up `validations` and `filters` here -> see `ConfigurationGroupProperty` for details
// TODO - add icon support for this -> ENUM of "asterisk" | "snowflake" | etc. -> match icons up to addons
// QUESTION - should this just wrap a ConfigurationGroupProperty instance?
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
  validations?: PropertyValidation[]; // TODO - shouldn't be nullable
  filters?: PropertyFilter[]; // TODO - shouldn't be nullable
}

// // // //

export const ATTRIBUTE_ADDON_INDEX: AttributeAddon = {
  id: "ATTRIBUTE_ADDON_INDEX",
  label: "Index",
  identifier: "Index",
  description: "Whether to add an index on this Attribute",
  documentation: "",
  supportedDatatypes: [
    Datatype.STRING,
    Datatype.NUMERIC,
    Datatype.INTEGER,
    Datatype.TEXT,
    Datatype.TIMESTAMP,
    Datatype.TIME
  ],
  exclusive: false,
  required: false,
  propertyType: OptionType.BOOLEAN,
  dropdownOptions: [],
  defaultValue: false,
  validations: [],
  filters: []
};

export const ATTRIBUTE_ADDON_UNIQUE: AttributeAddon = {
  id: "ATTRIBUTE_ADDON_UNIQUE",
  label: "Unique key",
  identifier: "unique",
  description: "Whether this Attribute's value is unique",
  documentation: "",
  supportedDatatypes: [
    Datatype.STRING,
    Datatype.NUMERIC,
    Datatype.TEXT,
    Datatype.TIMESTAMP,
    Datatype.TIME
  ],
  exclusive: false,
  required: false,
  propertyType: OptionType.BOOLEAN,
  dropdownOptions: [],
  defaultValue: false,
  validations: [],
  filters: []
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
    Datatype.TIME
  ],
  exclusive: false,
  required: false,
  propertyType: OptionType.BOOLEAN,
  dropdownOptions: [],
  defaultValue: false,
  validations: [],
  filters: []
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
    Datatype.TIME
  ],
  exclusive: false,
  required: false,
  propertyType: OptionType.BOOLEAN,
  dropdownOptions: [],
  defaultValue: false,
  validations: [],
  filters: []
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
    Datatype.TIME
  ],
  exclusive: true,
  required: false,
  propertyType: OptionType.BOOLEAN,
  dropdownOptions: [],
  defaultValue: false,
  validations: [],
  filters: []
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
    Datatype.TIME
  ],
  exclusive: false,
  required: false,
  propertyType: OptionType.BOOLEAN,
  dropdownOptions: [],
  defaultValue: false,
  validations: [],
  filters: []
};
