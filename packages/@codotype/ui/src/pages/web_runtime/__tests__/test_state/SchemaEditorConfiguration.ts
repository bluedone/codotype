import {
    PropertyTypes,
    Primatives,
    SchemaEditorConfiguration,
    RelationTypes,
    Datatypes,
    GroupLayoutVariants,
    PropertyLayoutVariants,
    CreatedByValues,
} from "@codotype/core";
import { ApiActionsProperty } from "./CollectionProperty-ApiActions";
import { ATTRIBUTE_ADDON_UNIQUE, relationAddons } from "./Addons";

// // // //

export const SchemaEditorKitchenSink: SchemaEditorConfiguration = {
    supportedRelationTypes: [RelationTypes.TO_ONE, RelationTypes.TO_MANY],
    supportedDatatypes: [
        Datatypes.STRING,
        Datatypes.DATE,
        Datatypes.DATETIME,
        Datatypes.INT,
        Datatypes.FLOAT,
        Datatypes.STRING_ARRAY,
    ],
    configurationGroups: [
        new Primatives.ConfigurationGroup({
            content: {
                label: "Meta",
                description: "Define additional metadata for this Schema",
            },
            identifier: "meta",
            layoutVariant: GroupLayoutVariants.LIST,
            properties: [
                new Primatives.ConfigurationProperty({
                    content: {
                        label: "Internal Note",
                        description:
                            "Write an internal note describing this schema",
                    },
                    identifier: "internal_note",
                    defaultValue: "",
                    layoutVariant: PropertyLayoutVariants.COL_12,
                    type: PropertyTypes.STRING,
                }),
            ],
        }),
        new Primatives.ConfigurationGroup({
            content: {
                label: "API Actions",
                description: "Define individual REST api actions.",
                documentation:
                    "This is documentation for the API Actions configuration group",
            },
            identifier: "api_actions",
            layoutVariant: GroupLayoutVariants.LIST,
            properties: [ApiActionsProperty],
        }),
        new Primatives.ConfigurationGroup({
            content: {
                label: "GraphQL API",
                description: "Configure the GraphQL API for this Schema",
            },
            identifier: "graphql_api",
            layoutVariant: GroupLayoutVariants.LIST,
            properties: [
                new Primatives.ConfigurationProperty({
                    type: PropertyTypes.BOOLEAN,
                    defaultValue: true,
                    identifier: "generate_crud_api",
                    content: {
                        label: "Generate CRUD API",
                        description:
                            "Generate a CRUD API with GraphQL for this resource",
                    },
                    layoutVariant: PropertyLayoutVariants.CARD_COL_12,
                }),
                new Primatives.ConfigurationProperty({
                    content: {
                        label: "DynamoDB table name",
                        description:
                            "Define the name of the DynamoDB table for this",
                    },
                    identifier: "dynamodb_table_name",
                    defaultValue: "",
                    type: PropertyTypes.STRING,
                    layoutVariant: PropertyLayoutVariants.CARD_COL_12,
                }),
                ApiActionsProperty,
            ],
        }),
    ],
    attributeAddons: [ATTRIBUTE_ADDON_UNIQUE],
    relationAddons: [...relationAddons],
    newSchemaDefaults: {
        relations: [
            {
                id: "USER-RELATION-ID",
                type: RelationTypes.TO_ONE,
                destinationSchemaAlias: "Creator",
                sourceSchemaAlias: "",
                createdBy: CreatedByValues.plugin,
                sourceSchemaID: "USER_SCHEMA",
                destinationSchemaID: "USER_SCHEMA",
                locked: true,
                internalNote: "",
                addons: {},
            },
        ],
        attributes: [
            {
                id: "UUID-Attribute",
                identifiers: {
                    title: "ID",
                    snake: "id",
                    camel: "id",
                    pascal: "Id",
                    kebab: "id",
                },
                addons: {
                    // [ATTRIBUTE_ADDON_PRIMARY_KEY.identifier]: true,
                },
                datatype: Datatypes.UUID,
                locked: true,
                createdBy: CreatedByValues.plugin,
                internalNote: "",
            },
        ],
    },
    defaultRelations: [],
    defaultSchemas: [
        {
            id: "USER_SCHEMA",
            identifiers: {
                singular: {
                    title: "User",
                    snake: "user",
                    camel: "user",
                    pascal: "User",
                    kebab: "user",
                },
                plural: {
                    title: "Users",
                    snake: "users",
                    camel: "users",
                    pascal: "Users",
                    kebab: "users",
                },
            },
            locked: true,
            createdBy: CreatedByValues.plugin,
            internalNote: "",
            attributes: [
                {
                    id: "UUID-Attribute",
                    identifiers: {
                        title: "ID",
                        snake: "id",
                        camel: "id",
                        pascal: "Id",
                        kebab: "id",
                    },
                    addons: {
                        // [ATTRIBUTE_ADDON_REQUIRED.identifier]: true,
                        // [ATTRIBUTE_ADDON_PRIMARY_KEY.identifier]: true,
                        // [ATTRIBUTE_ADDON_UNIQUE.identifier]: true,
                    },
                    datatype: Datatypes.STRING,
                    locked: true,
                    createdBy: CreatedByValues.plugin,
                    internalNote: "The uniqie ID of the user",
                },
                {
                    id: "Email-Attribute",
                    identifiers: {
                        title: "Email",
                        snake: "email",
                        camel: "email",
                        pascal: "Email",
                        kebab: "email",
                    },
                    addons: {
                        // [ATTRIBUTE_ADDON_REQUIRED.identifier]: true,
                        // [ATTRIBUTE_ADDON_UNIQUE.identifier]: true,
                    },
                    datatype: Datatypes.STRING,
                    locked: true,
                    createdBy: CreatedByValues.plugin,
                    internalNote: "The email of the user",
                },
            ],
            configuration: {},
        },
    ],
};
