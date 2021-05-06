import { PropertyTypes } from "../../configuration-property";
import { Datatypes } from "../../datatype";
import { RelationTypes } from "../../relation";
import {
    AttributeAddon,
    AddonProperty,
    AddonPropertyInlineIcons,
    RelationAddon,
} from "../../schema-editor-addon";

// // // //

const indexAddonProperty: AddonProperty = {
    identifier: "Index",
    inlineIcon: AddonPropertyInlineIcons.tag,
    content: {
        label: "Index",
        description: "Whether to add an index on this Attribute",
        documentation: "",
        icon: "",
    },
    exclusive: false,
    required: false,
    propertyType: PropertyTypes.BOOLEAN,
    selectOptions: [],
    defaultValue: false,
    validations: [],
    transformations: [],
};

const uniqueAddonProperty: AddonProperty = {
    content: {
        label: "Unique key",
        description: "Whether this Attribute's value is unique",
        documentation: "",
        icon: "",
    },
    inlineIcon: AddonPropertyInlineIcons.snowflake,
    identifier: "unique",
    exclusive: false,
    required: false,
    propertyType: PropertyTypes.BOOLEAN,
    selectOptions: [],
    defaultValue: false,
    validations: [],
    transformations: [],
};

const requiredAddonProperty: AddonProperty = {
    content: {
        label: "Required",
        description: "Whether this Attribute's value is required",
        documentation: "",
        icon: "",
    },
    identifier: "required",
    inlineIcon: AddonPropertyInlineIcons.asterisk,
    exclusive: false,
    required: false,
    propertyType: PropertyTypes.BOOLEAN,
    selectOptions: [],
    defaultValue: false,
    validations: [],
    transformations: [],
};

const nullableAddonProperty: AddonProperty = {
    content: {
        label: "Nullable",
        description: "Whether this Attribute's value nullable",
        documentation: "",
        icon: "",
    },
    inlineIcon: AddonPropertyInlineIcons.asterisk,
    identifier: "primaryKey",
    exclusive: true,
    required: false,
    propertyType: PropertyTypes.BOOLEAN,
    selectOptions: [],
    defaultValue: false,
    validations: [],
    transformations: [],
};

const primaryKeyAddonProperty: AddonProperty = {
    content: {
        label: "Primary Key",
        description:
            "Whether this Attribute's value is the primary key for its Schema",
        documentation: "",
        icon: "",
    },
    inlineIcon: AddonPropertyInlineIcons.asterisk,
    identifier: "primaryKey",
    exclusive: true,
    required: false,
    propertyType: PropertyTypes.BOOLEAN,
    selectOptions: [],
    defaultValue: false,
    validations: [],
    transformations: [],
};

const selectAddonProperty: AddonProperty = {
    content: {
        label: "Select",
        description:
            "Whether this Attribute's value is selected when querying the database",
        documentation: "",
        icon: "",
    },
    identifier: "select",
    inlineIcon: AddonPropertyInlineIcons.check,
    exclusive: false,
    required: false,
    propertyType: PropertyTypes.BOOLEAN,
    selectOptions: [],
    defaultValue: true,
    validations: [],
    transformations: [],
};

export const addonProperties = {
    index: indexAddonProperty,
    unique: uniqueAddonProperty,
    required: requiredAddonProperty,
    nullable: nullableAddonProperty,
    primaryKey: primaryKeyAddonProperty,
    select: selectAddonProperty,
};

// // // //
// AttributeAddons + RelationAddons

export const attributeAddons: { [key: string]: AttributeAddon } = {
    index: {
        supportedDatatypes: [
            Datatypes.STRING,
            Datatypes.NUMERIC,
            Datatypes.INT,
            Datatypes.TEXT,
            Datatypes.TIMESTAMP,
            Datatypes.TIME,
        ],
        property: indexAddonProperty,
    },
    primaryKey: {
        supportedDatatypes: [
            Datatypes.STRING,
            Datatypes.NUMERIC,
            Datatypes.INT,
            Datatypes.TEXT,
            Datatypes.TIMESTAMP,
            Datatypes.TIME,
        ],
        property: indexAddonProperty,
    },
};

export const relationAddons: { [key: string]: RelationAddon } = {
    index: {
        supportedRelationTypes: [RelationTypes.HAS_ONE, RelationTypes.TO_ONE],
        property: indexAddonProperty,
    },
};
