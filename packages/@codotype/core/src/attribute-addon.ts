import { Datatype, Datatypes } from "./datatype";
import { UUID } from "./uuid";
import { PropertyType, DropdownOption } from "./configuration-property";
import { PropertyTransformation } from "./property-transformation";
import { PropertyValidation } from "./property-validation";
import { Content } from "./content";

// // // //

// AttributeAddon
// Defines an interface that can be used to extend the `Attribute` interface with
// additional properties that can be defined on a per-generator basis
// TODO - add icon support -> ENUM of basic symbols ("asterisk" | "snowflake" | "star" | "tag" | "check" | etc. -> match icons up to addons
// QUESTION - should this just wrap a ConfigurationProperty instance? -> Nah, best to keep
// it simple - but abstract this a bit to share some common patterns with ConfigurationProperty
export interface AttributeAddon {
    content: Content;
    identifier: string; // "unique"
    exclusive: boolean; // False - one schema can have multiple unique properties
    required: boolean; // Does this need to be populated?
    propertyType:
        | PropertyType.BOOLEAN
        | PropertyType.DROPDOWN
        | PropertyType.STRING
        | PropertyType.NUMBER; // Only stores primative data
    defaultValue: null | boolean | string | number;
    dropdownOptions: DropdownOption[]; // Only used when datatype: OptionType.DROPDOWN;

    validations: PropertyValidation[];
    transformations: PropertyTransformation[];

    supportedDatatypes: Datatype[]; // [Datatypes.STRING, Datatypes.NUMBER]
    // supportedRelationTypes: RelationType[]; // [RelationType.toOne, RelationType.toMany]
}

// // // //
// TODO - move all of this into test_state module

export const ATTRIBUTE_ADDON_INDEX: AttributeAddon = {
    identifier: "Index",
    content: {
        label: "Index",
        description: "Whether to add an index on this Attribute",
        documentation: "",
        icon: "",
    },
    supportedDatatypes: [
        Datatypes.STRING,
        Datatypes.NUMERIC,
        Datatypes.INT,
        Datatypes.TEXT,
        Datatypes.TIMESTAMP,
        Datatypes.TIME,
    ],
    exclusive: false,
    required: false,
    propertyType: PropertyType.BOOLEAN,
    dropdownOptions: [],
    defaultValue: false,
    validations: [],
    transformations: [],
};

export const ATTRIBUTE_ADDON_UNIQUE: AttributeAddon = {
    content: {
        label: "Unique key",
        description: "Whether this Attribute's value is unique",
        documentation: "",
        icon: "",
    },
    identifier: "unique",
    supportedDatatypes: [
        Datatypes.STRING,
        Datatypes.NUMERIC,
        Datatypes.TEXT,
        Datatypes.TIMESTAMP,
        Datatypes.TIME,
    ],
    exclusive: false,
    required: false,
    propertyType: PropertyType.BOOLEAN,
    dropdownOptions: [],
    defaultValue: false,
    validations: [],
    transformations: [],
};

export const ATTRIBUTE_ADDON_REQUIRED: AttributeAddon = {
    content: {
        label: "Required",
        description: "Whether this Attribute's value is required",
        documentation: "",
        icon: "",
    },
    identifier: "required",
    supportedDatatypes: [
        Datatypes.STRING,
        Datatypes.NUMERIC,
        Datatypes.TEXT,
        Datatypes.TIMESTAMP,
        Datatypes.TIME,
    ],
    exclusive: false,
    required: false,
    propertyType: PropertyType.BOOLEAN,
    dropdownOptions: [],
    defaultValue: false,
    validations: [],
    transformations: [],
};

export const ATTRIBUTE_ADDON_NULLABLE: AttributeAddon = {
    content: {
        label: "Nullable",
        description: "Whether this Attribute's value is nullable",
        documentation: "",
        icon: "",
    },
    identifier: "nullable",
    supportedDatatypes: [
        Datatypes.STRING,
        Datatypes.NUMERIC,
        Datatypes.TEXT,
        Datatypes.TIMESTAMP,
        Datatypes.TIME,
    ],
    exclusive: false,
    required: false,
    propertyType: PropertyType.BOOLEAN,
    dropdownOptions: [],
    defaultValue: false,
    validations: [],
    transformations: [],
};

export const ATTRIBUTE_ADDON_PRIMARY_KEY: AttributeAddon = {
    content: {
        label: "Primary Key",
        description:
            "Whether this Attribute's value is the primary key for its Schema",
        documentation: "",
        icon: "",
    },
    identifier: "primaryKey",
    supportedDatatypes: [
        Datatypes.STRING,
        Datatypes.NUMERIC,
        Datatypes.TEXT,
        Datatypes.TIMESTAMP,
        Datatypes.TIME,
    ],
    exclusive: true,
    required: false,
    propertyType: PropertyType.BOOLEAN,
    dropdownOptions: [],
    defaultValue: false,
    validations: [],
    transformations: [],
};

export const ATTRIBUTE_ADDON_SELECT: AttributeAddon = {
    content: {
        label: "Select",
        description:
            "Whether this Attribute's value is selected when querying the database",
        documentation: "",
        icon: "",
    },
    identifier: "select",
    supportedDatatypes: [
        Datatypes.STRING,
        Datatypes.NUMERIC,
        Datatypes.TEXT,
        Datatypes.TIMESTAMP,
        Datatypes.TIME,
    ],
    exclusive: false,
    required: false,
    propertyType: PropertyType.BOOLEAN,
    dropdownOptions: [],
    defaultValue: false,
    validations: [],
    transformations: [],
};
