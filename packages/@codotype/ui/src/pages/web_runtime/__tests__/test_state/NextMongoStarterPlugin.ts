import { pluginReadme } from "../../../../components/MarkdownRenderer/__tests__/test_state";
import {
    PluginMetadata,
    PropertyTypes,
    Primatives,
    ConfigurationGroup,
} from "@codotype/core";
import {
    SchemaEditorConfiguration,
    RelationTypes,
    Datatypes,
    GroupLayoutVariants,
    PropertyLayoutVariants,
    CreatedByValues,
} from "@codotype/core";
import { ATTRIBUTE_ADDON_UNIQUE, relationAddons } from "./Addons";
import { NextJsWebsiteStarterPluginVariant } from "./NextJsWebsiteStarterPlugin";

// // // //
// Next.js + MongoDB Starter Plugin

export const SchemaEditor: SchemaEditorConfiguration = {
    supportedRelationTypes: [
        RelationTypes.TO_ONE,
        RelationTypes.TO_MANY,
        RelationTypes.EMBEDS_ONE,
        RelationTypes.EMBEDS_MANY,
    ],
    supportedDatatypes: [
        Datatypes.STRING,
        Datatypes.INT,
        Datatypes.FLOAT,
        Datatypes.STRING_ARRAY,
        Datatypes.NUMERIC_ARRAY,
        Datatypes.TIMESTAMP,
        Datatypes.OBJECT,
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

// // // //
// Hosting
const hostingConfigurationGroup: ConfigurationGroup = new Primatives.ConfigurationGroup(
    {
        identifier: "hosting",
        content: {
            label: "Hosting",
            description: "Configure the hosting of your Next.js app",
            icon: "",
            documentation: "",
        },
        properties: [
            new Primatives.ConfigurationProperty({
                identifier: "platform",
                content: {
                    label: "Platform",
                    description: "How would you like to host your Next.js app?",
                    icon:
                        "https://cdn4.iconfinder.com/data/icons/colicon/24/cloud-512.png",
                    documentation: "",
                },
                type: PropertyTypes.DROPDOWN,
                defaultValue: "docker",
                dropdownOptions: [
                    { label: "Docker", value: "docker" },
                    { label: "EC2", value: "ec2" },
                ],
            }),
        ],
    },
);

// // // //
// Export Plugin

export const NextMongoStarter: PluginMetadata = new Primatives.Plugin({
    id: "next-mongo-starter",
    project_path: "next-mongo-starter",
    content: {
        label: "Next.js + MongoDB Starter",
        description:
            "Next.js + MongoDB + User Authentication + Scaffolding Starter",
        icon: "https://miro.medium.com/max/500/1*cPh7ujRIfcHAy4kW2ADGOw.png",
        documentation: pluginReadme,
    },
    configurationGroups: [
        NextJsWebsiteStarterPluginVariant.configurationGroups[0],
    ],
    schemaEditorConfiguration: SchemaEditor,
});
