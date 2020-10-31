import { Datatype } from "./datatype";
import { UUID } from "./uuid";
import { OptionType, DropdownOption } from "./configuration-option-types";
import { PropertyTransformation } from "./property-transformation";
import { PropertyValidation } from "./property-validation";
import { Content } from "./content";

// // // //

// AttributeAddon
// Defines an interface that can be used to extend the `Attribute` interface with
// additional properties that can be defined on a per-generator basis
// TODO - should this support a layoutVariant? Yes.
// TODO - wire up `validations` and `filters` here -> see `ConfigurationProperty` for details
// TODO - add icon support -> ENUM of basic symbols ("asterisk" | "snowflake" | "star" | "tag" | "check" | etc. -> match icons up to addons
// QUESTION - should this just wrap a ConfigurationProperty instance? -> Nah, best to keep
// it simple - but abstract this a bit to share some common patterns with ConfigurationProperty
export interface AttributeAddon {
    id: UUID;
    content: Content;
    identifier: string; // "unique"
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
    validations: PropertyValidation[];
    transformations: PropertyTransformation[];
}

// // // //

export const ATTRIBUTE_ADDON_INDEX: AttributeAddon = {
    id: "ATTRIBUTE_ADDON_INDEX",
    identifier: "Index",
    content: {
        label: "Index",
        description: "Whether to add an index on this Attribute",
        documentation: "",
        icon: "",
    },
    supportedDatatypes: [
        Datatype.STRING,
        Datatype.NUMERIC,
        Datatype.INT,
        Datatype.TEXT,
        Datatype.TIMESTAMP,
        Datatype.TIME,
    ],
    exclusive: false,
    required: false,
    propertyType: OptionType.BOOLEAN,
    dropdownOptions: [],
    defaultValue: false,
    validations: [],
    transformations: [],
};

export const ATTRIBUTE_ADDON_UNIQUE: AttributeAddon = {
    id: "ATTRIBUTE_ADDON_UNIQUE",
    content: {
        label: "Unique key",
        description: "Whether this Attribute's value is unique",
        documentation: "",
        icon: "",
    },
    identifier: "unique",
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
    validations: [],
    transformations: [],
};

export const ATTRIBUTE_ADDON_REQUIRED: AttributeAddon = {
    id: "ATTRIBUTE_ADDON_REQUIRED",
    content: {
        label: "Required",
        description: "Whether this Attribute's value is required",
        documentation: "",
        icon: "",
    },
    identifier: "required",
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
    validations: [],
    transformations: [],
};

export const ATTRIBUTE_ADDON_NULLABLE: AttributeAddon = {
    id: "ATTRIBUTE_ADDON_NULLABLE",
    content: {
        label: "Nullable",
        description: "Whether this Attribute's value is nullable",
        documentation: "",
        icon: "",
    },
    identifier: "nullable",
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
    validations: [],
    transformations: [],
};

export const ATTRIBUTE_ADDON_PRIMARY_KEY: AttributeAddon = {
    id: "ATTRIBUTE_ADDON_PRIMARY_KEY",
    content: {
        label: "Primary Key",
        description:
            "Whether this Attribute's value is the primary key for its Schema",
        documentation: "",
        icon: "",
    },
    identifier: "primaryKey",
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
    validations: [],
    transformations: [],
};

export const ATTRIBUTE_ADDON_SELECT: AttributeAddon = {
    id: "ATTRIBUTE_ADDON_SELECT",
    content: {
        label: "Select",
        description:
            "Whether this Attribute's value is selected when querying the database",
        documentation: "",
        icon: "",
    },
    identifier: "select",
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
    validations: [],
    transformations: [],
};
