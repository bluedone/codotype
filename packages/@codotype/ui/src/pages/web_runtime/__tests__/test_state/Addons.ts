import {
    RelationTypes,
    Datatypes,
    AddonPropertyInlineIcons,
    PropertyTypes,
    AttributeAddon,
    RelationAddon,
} from "@codotype/core";

// // // //

export const ATTRIBUTE_ADDON_UNIQUE: AttributeAddon = {
    supportedDatatypes: [
        Datatypes.BIGINT_ARRAY,
        Datatypes.BIGINT,
        Datatypes.DECIMAL_ARRAY,
        Datatypes.DECIMAL,
        Datatypes.JSON,
        Datatypes.JSON,
        Datatypes.JSONB,
        Datatypes.STRING_ARRAY,
        Datatypes.STRING,
        Datatypes.TEXT_ARRAY,
        Datatypes.TEXT,
        Datatypes.TIME_ARRAY,
        Datatypes.TIME,
        Datatypes.TIMESTAMP_ARRAY,
        Datatypes.TIMESTAMP,
        Datatypes.UUID_ARRAY,
        Datatypes.UUID,
    ],
    property: {
        content: {
            label: "Unique",
            icon: "",
            description: "Whether or not the value is unique",
            documentation: "",
        },
        identifier: "unique",
        exclusive: false,
        required: false,
        inlineIcon: AddonPropertyInlineIcons.snowflake,
        propertyType: PropertyTypes.BOOLEAN,
        defaultValue: false,
        selectOptions: [],
        validations: [],
        transformations: [],
    },
};

export const relationAddons: RelationAddon[] = [
    {
        supportedRelationTypes: [RelationTypes.TO_ONE],
        property: ATTRIBUTE_ADDON_UNIQUE.property,
    },
];

// ATTRIBUTE_ADDON_NULLABLE,
// ATTRIBUTE_ADDON_PRIMARY_KEY,
// {
//     ...ATTRIBUTE_ADDON_REQUIRED,
//     supportedDatatypes: [
//         Datatypes.STRING,
//         Datatypes.DATE,
//         Datatypes.DATETIME,
//         Datatypes.INT,
//         Datatypes.FLOAT,
//         Datatypes.STRING_ARRAY,
//     ],
// },
// {
//     ...ATTRIBUTE_ADDON_REQUIRED,
//     label: "Mock Data",
//     identifier: "mock_data_type",
//     description:
//         "Type of Mockaroo mock data to use for this field",
//     propertyType: PropertyTypes.DROPDOWN,
//     selectOptions: [
//         {
//             value: "name",
//             label: "Name",
//             description: "First + Last",
//         },
//         {
//             value: "zipcode",
//             label: "Zipcode",
//             description: "Zipcode",
//         },
//     ],
//     supportedDatatypes: [
//         Datatypes.STRING,
//         Datatypes.DATE,
//         Datatypes.DATETIME,
//         Datatypes.INT,
//         Datatypes.FLOAT,
//         Datatypes.STRING_ARRAY,
//     ],
// },
