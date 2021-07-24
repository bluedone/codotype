import {
    ApiActionsProperty,
    NestedCollectionProperty,
} from "./CollectionProperty-ApiActions";
import {
    ProjectInput,
    Datatypes,
    CreatedByValues,
    PluginMetadata,
    testState,
    RelationTypes,
    PropertyTypes,
    Primitives,
    GroupLayoutVariants,
    PropertyLayoutVariants,
    buildDefaultProjectInput,
    buildTokenCasing,
    buildTokenPluralization,
    buildDefaultConfiguration,
} from "@codotype/core";
import { pluginReadme } from "../../../../components/MarkdownRenderer/__tests__/test_state";
import { NextJsWebsiteStarterPlugin } from "./NextJsWebsiteStarterPlugin";
import { ATTRIBUTE_ADDON_UNIQUE, relationAddons } from "./Addons";

// // // //

const {
    cdkPluginMeta,
    dummyPluginMetadata: dummyPluginMetadataOriginal,
} = testState;

const dummyPluginMetadata: PluginMetadata = {
    ...dummyPluginMetadataOriginal,
    configurationGroups: [
        ...dummyPluginMetadataOriginal.configurationGroups.map(c => {
            if (c.content.label !== "API Examples") {
                return c;
            }
            return {
                ...c,
                layoutVariant: GroupLayoutVariants.LIST,
            };
        }),
    ],
};

// // // //

const pluginExample01: PluginMetadata = {
    ...dummyPluginMetadata,
    identifier: "chrome_extension_plugin_03", // unique ID for the plugin
    schemaEditorConfiguration: {
        ...dummyPluginMetadata.schemaEditorConfiguration,
        attributeAddons: [
            ATTRIBUTE_ADDON_UNIQUE,
            // ATTRIBUTE_ADDON_REQUIRED,
            // ATTRIBUTE_ADDON_NULLABLE,
            // ATTRIBUTE_ADDON_PRIMARY_KEY,
        ],
        relationAddons: [...relationAddons],
        configurationGroups: [
            {
                ...dummyPluginMetadata.configurationGroups[0],
                layoutVariant: GroupLayoutVariants.LIST,
            },
        ],
    },
};

const projectExample01: ProjectInput = {
    ...buildDefaultProjectInput(pluginExample01),
    identifiers: buildTokenCasing("Movie Reviews"),
    schemas: [
        new Primitives.Schema({
            identifiers: buildTokenPluralization("User"),
            attributes: [
                new Primitives.AttributeInput({
                    identifiers: buildTokenCasing("ID"),
                    datatype: Datatypes.UUID,
                }),
                new Primitives.AttributeInput({
                    identifiers: buildTokenCasing("Email"),
                    datatype: Datatypes.STRING,
                }),
                new Primitives.AttributeInput({
                    identifiers: buildTokenCasing("First Name"),
                    datatype: Datatypes.STRING,
                }),
                new Primitives.AttributeInput({
                    identifiers: buildTokenCasing("Last Name"),
                    datatype: Datatypes.STRING,
                }),
            ],
            configuration: buildDefaultConfiguration(
                pluginExample01.schemaEditorConfiguration.configurationGroups,
            ),
        }),
        new Primitives.Schema({
            identifiers: buildTokenPluralization("Director"),
            attributes: [
                new Primitives.AttributeInput({
                    identifiers: buildTokenCasing("ID"),
                    datatype: Datatypes.UUID,
                }),
                new Primitives.AttributeInput({
                    identifiers: buildTokenCasing("First Name"),
                    datatype: Datatypes.STRING,
                }),
                new Primitives.AttributeInput({
                    identifiers: buildTokenCasing("Last Name"),
                    datatype: Datatypes.STRING,
                }),
            ],
            configuration: buildDefaultConfiguration(
                pluginExample01.schemaEditorConfiguration.configurationGroups,
            ),
        }),
        new Primitives.Schema({
            identifiers: buildTokenPluralization("Movie"),
            attributes: [
                new Primitives.AttributeInput({
                    identifiers: buildTokenCasing("ID"),
                    datatype: Datatypes.UUID,
                }),
                new Primitives.AttributeInput({
                    identifiers: buildTokenCasing("Title"),
                    datatype: Datatypes.STRING,
                }),
            ],
            configuration: buildDefaultConfiguration(
                pluginExample01.schemaEditorConfiguration.configurationGroups,
            ),
        }),
    ],
};

// TODO - clean up stories, move into test state

const stories: Array<[string, PluginMetadata]> = [
    ["w/ schemas", dummyPluginMetadata],
    [
        "w/ schemas + schema configuration groups",
        {
            ...dummyPluginMetadata,
            identifier: "chrome_extension_plugin_03", // unique ID for the plugin
            schemaEditorConfiguration: {
                ...dummyPluginMetadata.schemaEditorConfiguration,
                attributeAddons: [
                    ATTRIBUTE_ADDON_UNIQUE,
                    // ATTRIBUTE_ADDON_REQUIRED,
                    // ATTRIBUTE_ADDON_NULLABLE,
                    // ATTRIBUTE_ADDON_PRIMARY_KEY,
                ],
                relationAddons: [...relationAddons],
                configurationGroups: [
                    {
                        ...dummyPluginMetadata.configurationGroups[0],
                        layoutVariant: GroupLayoutVariants.LIST,
                    },
                ],
            },
        },
    ],
    [
        "w/ exampleProjects",
        {
            ...pluginExample01,
            exampleProjects: [projectExample01],
        },
    ],
    [
        "w/ schemas + default attributes",
        {
            ...dummyPluginMetadata,
            identifier: "chrome_extension_plugin_04", // unique ID for the plugin
            schemaEditorConfiguration: {
                ...dummyPluginMetadata.schemaEditorConfiguration,
                attributeAddons: [
                    ATTRIBUTE_ADDON_UNIQUE,
                    // ATTRIBUTE_ADDON_REQUIRED,
                    // ATTRIBUTE_ADDON_NULLABLE,
                    // ATTRIBUTE_ADDON_PRIMARY_KEY,
                ],
                relationAddons: [...relationAddons],
                newSchemaDefaults: {
                    relations: [],
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
            },
        },
    ],
    [
        "AWS CDK Starter",
        {
            ...cdkPluginMeta,
            content: {
                ...cdkPluginMeta.content,
                documentation: pluginReadme,
            },
            configurationGroups: [
                {
                    ...testState.ComponentBuilderConfigurationGroup,
                    layoutVariant: GroupLayoutVariants.LIST,
                },
                testState.SideBySideConfigurationGroup,
                {
                    ...testState.SideBySideConfigurationGroup,
                    content: {
                        ...testState.SideBySideConfigurationGroup.content,
                        label: "API Actions",
                    },
                    identifier: "api_actions",
                    properties: [ApiActionsProperty],
                },
                {
                    ...testState.SideBySideConfigurationGroup,
                    content: {
                        ...testState.SideBySideConfigurationGroup.content,
                        label: "Nested API Actions",
                    },
                    identifier: "nested_api_actions",
                    properties: [NestedCollectionProperty],
                },
            ],
            identifier: "chrome_extension_plugin_05", // unique ID for the plugin
            schemaEditorConfiguration: {
                supportedRelationTypes: [
                    RelationTypes.TO_ONE,
                    RelationTypes.TO_MANY,
                ],
                supportedDatatypes: [
                    Datatypes.STRING,
                    Datatypes.DATE,
                    Datatypes.DATETIME,
                    Datatypes.INT,
                    Datatypes.FLOAT,
                    Datatypes.STRING_ARRAY,
                ],
                configurationGroups: [
                    new Primitives.ConfigurationGroup({
                        content: {
                            label: "Meta",
                            description:
                                "Define additional metadata for this Schema",
                        },
                        identifier: "meta",
                        layoutVariant: GroupLayoutVariants.LIST,
                        properties: [
                            new Primitives.ConfigurationProperty({
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
                    new Primitives.ConfigurationGroup({
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
                    new Primitives.ConfigurationGroup({
                        content: {
                            label: "GraphQL API",
                            description:
                                "Configure the GraphQL API for this Schema",
                        },
                        identifier: "graphql_api",
                        layoutVariant: GroupLayoutVariants.LIST,
                        properties: [
                            new Primitives.ConfigurationProperty({
                                type: PropertyTypes.BOOLEAN,
                                defaultValue: true,
                                identifier: "generate_crud_api",
                                content: {
                                    label: "Generate CRUD API",
                                    description:
                                        "Generate a CRUD API with GraphQL for this resource",
                                },
                                layoutVariant:
                                    PropertyLayoutVariants.CARD_COL_12,
                            }),
                            new Primitives.ConfigurationProperty({
                                content: {
                                    label: "DynamoDB table name",
                                    description:
                                        "Define the name of the DynamoDB table for this",
                                },
                                identifier: "dynamodb_table_name",
                                defaultValue: "",
                                type: PropertyTypes.STRING,
                                layoutVariant:
                                    PropertyLayoutVariants.CARD_COL_12,
                            }),
                            ApiActionsProperty,
                        ],
                    }),
                ],
                attributeAddons: [
                    ATTRIBUTE_ADDON_UNIQUE,
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
                ],
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
                        removable: false,
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
            },
        },
    ],
    ["Concepts/Next.js Website Starter", NextJsWebsiteStarterPlugin],
];
