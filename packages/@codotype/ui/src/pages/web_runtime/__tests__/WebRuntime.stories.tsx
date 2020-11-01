import * as React from "react";
import { storiesOf } from "@storybook/react";
import { WebRuntime } from "../component";
import { Story } from "../../../components/dev";
import { RuntimeProvider } from "../../../components/runtime_provider";
import { ProjectEditor } from "../../../components/project_editor";
import {
    Project,
    Datatypes,
    CreatedByValues,
    PluginMetadata,
    testState,
    // makeIdentifier,
    // ATTRIBUTE_ADDON_UNIQUE,
    // ATTRIBUTE_ADDON_REQUIRED,
    // ATTRIBUTE_ADDON_NULLABLE,
    // ATTRIBUTE_ADDON_PRIMARY_KEY,
    RelationType,
    PropertyType,
    Primatives,
    GroupLayoutVariant,
    PropertyLayoutVariant,
    StringValueFilter,
    DataPreviewLayoutVariant,
    DataPreviewActionType,
    DataPreviewConstraintType,
    buildDefaultProject,
    buildTokenCasing,
    buildTokenPluralization,
    buildDefaultConfiguration,
} from "@codotype/core";
import { generatorReadme } from "../../../components/markdown_renderer/__tests__/test_state";
const { cdkPluginMetadata, dummyPluginMetadata } = testState;

// // // //

const ApiActionsProperty = new Primatives.ConfigurationProperty({
    label: "Actions",
    identifier: "actions",
    type: PropertyTypes.COLLECTION,
    dataPreview: {
        rules: [
            {
                constraint: {
                    dataProperty: "function_name",
                    type: DataPreviewConstraintType.equals,
                    value: "",
                },
                action: {
                    type: DataPreviewActionType.literal,
                    template: "",
                },
            },
            {
                constraint: {
                    dataProperty: "route",
                    type: DataPreviewConstraintType.equals,
                    value: "",
                },
                action: {
                    type: DataPreviewActionType.literal,
                    template: "",
                },
            },
            {
                constraint: {
                    dataProperty: "scope",
                    type: DataPreviewConstraintType.equals,
                    value: "COLLECTION",
                },
                action: {
                    type: DataPreviewActionType.stringTemplate,
                    template:
                        "{{data.verb}} /api/schema-scope/{{data.route}} -> {{data.function_name}}",
                },
            },
            {
                constraint: {
                    dataProperty: "scope",
                    type: DataPreviewConstraintType.equals,
                    value: "MODEL",
                },
                action: {
                    type: DataPreviewActionType.stringTemplate,
                    template:
                        "{{data.verb}} /api/schema-scope/:id/{{data.route}} -> {{data.function_name}}",
                },
            },
        ],
        variant: DataPreviewLayoutVariant.CODE_DARK,
    },
    properties: [
        new Primatives.ConfigurationProperty({
            label: "Verb",
            identifier: "verb",
            description: "Verify",
            defaultValue: "GET",
            type: PropertyTypes.DROPDOWN,
            layoutVariant: PropertyLayoutVariant.COL_6,
            dropdownOptions: [
                { value: "GET", label: "GET" },
                { value: "POST", label: "POST" },
                { value: "PUT", label: "PUT" },
                { value: "DELETE", label: "DELETE" },
            ],
        }),
        new Primatives.ConfigurationProperty({
            label: "Route",
            identifier: "route",
            description: "Route",
            defaultValue: "verify",
            type: PropertyTypes.STRING,
            layoutVariant: PropertyLayoutVariant.COL_6,
            filters: [
                StringValueFilter.nonumbers,
                StringValueFilter.trimwhitespace,
                StringValueFilter.removewhitespace,
            ],
        }),
        new Primatives.ConfigurationProperty({
            label: "Function Name",
            identifier: "function_name",
            description: "function_name",
            defaultValue: "verify",
            layoutVariant: PropertyLayoutVariant.COL_6,
            type: PropertyTypes.STRING,
            filters: [
                StringValueFilter.camelcase,
                StringValueFilter.nonumbers,
                StringValueFilter.nosymbols,
                StringValueFilter.trimwhitespace,
            ],
        }),
        new Primatives.ConfigurationProperty({
            label: "Scope",
            identifier: "scope",
            description: "scope",
            defaultValue: "COLLECTION",
            layoutVariant: PropertyLayoutVariant.COL_6,
            type: PropertyTypes.DROPDOWN,
            dropdownOptions: [
                { value: "COLLECTION", label: "Collection" },
                { value: "MODEL", label: "Model" },
            ],
        }),
    ],
});

const NestedCollectionProperty = {
    ...ApiActionsProperty,
    identifier: "nested_api_actions",
    properties: [
        ...ApiActionsProperty.properties,
        {
            ...ApiActionsProperty,
            layoutVariant: PropertyLayoutVariant.CARD_COL_12,
        },
    ],
};

const pluginExample01: PluginMetadata = {
    ...dummyPluginMetadata,
    id: "chrome_extension_generator_03", // unique ID for the generator
    schemaEditorConfiguration: {
        ...dummyPluginMetadata.schemaEditorConfiguration,
        attributeAddons: [
            // ATTRIBUTE_ADDON_UNIQUE,
            // ATTRIBUTE_ADDON_REQUIRED,
            // ATTRIBUTE_ADDON_NULLABLE,
            // ATTRIBUTE_ADDON_PRIMARY_KEY,
        ],
        configurationGroups: [
            {
                ...dummyPluginMetadata.configurationGroups[0],
                layoutVariant: GroupLayoutVariant.LIST,
            },
        ],
    },
};

const projectExample01: Project = {
    ...buildDefaultProject(pluginExample01),
    identifiers: buildTokenCasing("Movie Reviews"),
    schemas: [
        new Primatives.Schema({
            identifiers: buildTokenPluralization("User"),
            attributes: [
                new Primatives.Attribute({
                    identifiers: buildTokenCasing("ID"),
                    datatype: Datatypes.UUID,
                }),
                new Primatives.Attribute({
                    identifiers: buildTokenCasing("Email"),
                    datatype: Datatypes.STRING,
                }),
                new Primatives.Attribute({
                    identifiers: buildTokenCasing("First Name"),
                    datatype: Datatypes.STRING,
                }),
                new Primatives.Attribute({
                    identifiers: buildTokenCasing("Last Name"),
                    datatype: Datatypes.STRING,
                }),
            ],
            relations: [],
            configuration: buildDefaultConfiguration(
                pluginExample01.schemaEditorConfiguration.configurationGroups,
            ),
        }),
        new Primatives.Schema({
            identifiers: buildTokenPluralization("Director"),
            attributes: [
                new Primatives.Attribute({
                    identifiers: buildTokenCasing("ID"),
                    datatype: Datatypes.UUID,
                }),
                new Primatives.Attribute({
                    identifiers: buildTokenCasing("First Name"),
                    datatype: Datatypes.STRING,
                }),
                new Primatives.Attribute({
                    identifiers: buildTokenCasing("Last Name"),
                    datatype: Datatypes.STRING,
                }),
            ],
            relations: [],
            configuration: buildDefaultConfiguration(
                pluginExample01.schemaEditorConfiguration.configurationGroups,
            ),
        }),
        new Primatives.Schema({
            identifiers: buildTokenPluralization("Movie"),
            attributes: [
                new Primatives.Attribute({
                    identifiers: buildTokenCasing("ID"),
                    datatype: Datatypes.UUID,
                }),
                new Primatives.Attribute({
                    identifiers: buildTokenCasing("Title"),
                    datatype: Datatypes.STRING,
                }),
            ],
            relations: [],
            configuration: buildDefaultConfiguration(
                pluginExample01.schemaEditorConfiguration.configurationGroups,
            ),
        }),
    ],
};

const stories: [string, PluginMetadata][] = [
    ["w/ schemas", dummyPluginMetadata],
    [
        "w/ schemas + schema configuration groups",
        {
            ...dummyPluginMetadata,
            id: "chrome_extension_generator_03", // unique ID for the generator
            schemaEditorConfiguration: {
                ...dummyPluginMetadata.schemaEditorConfiguration,
                attributeAddons: [
                    // ATTRIBUTE_ADDON_UNIQUE,
                    // ATTRIBUTE_ADDON_REQUIRED,
                    // ATTRIBUTE_ADDON_NULLABLE,
                    // ATTRIBUTE_ADDON_PRIMARY_KEY,
                ],
                configurationGroups: [
                    {
                        ...dummyPluginMetadata.configurationGroups[0],
                        layoutVariant: GroupLayoutVariant.LIST,
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
            id: "chrome_extension_generator_04", // unique ID for the generator
            schemaEditorConfiguration: {
                ...dummyPluginMetadata.schemaEditorConfiguration,
                attributeAddons: [
                    // ATTRIBUTE_ADDON_UNIQUE,
                    // ATTRIBUTE_ADDON_REQUIRED,
                    // ATTRIBUTE_ADDON_NULLABLE,
                    // ATTRIBUTE_ADDON_PRIMARY_KEY,
                ],
                defaultAttributes: [
                    {
                        id: "UUID-Attribute",
                        identifiers: {
                            label: "ID",
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
                        source: CreatedByValues.plugin,
                        internalNote: "",
                        defaultValue: null,
                    },
                ],
            },
        },
    ],
    [
        "AWS CDK Starter",
        {
            ...cdkPluginMetadata,
            configurationGroups: [
                {
                    ...testState.ComponentBuilderConfigurationGroup,
                    layoutVariant: GroupLayoutVariant.LIST,
                },
                testState.SideBySideConfigurationGroup,
                {
                    ...testState.SideBySideConfigurationGroup,
                    label: "API Actions",
                    identifier: "api_actions",
                    properties: [ApiActionsProperty],
                },
                {
                    ...testState.SideBySideConfigurationGroup,
                    label: "Nested API Actions",
                    identifier: "nested_api_actions",
                    properties: [NestedCollectionProperty],
                },
            ],
            id: "chrome_extension_generator_05", // unique ID for the generator
            documentation: generatorReadme,
            schemaEditorConfiguration: {
                enableAttributeDefaultValue: true,
                documentation: "",
                supportedRelations: [RelationType.TO_ONE, RelationType.TO_MANY],
                supportedDatatypes: [
                    Datatypes.STRING,
                    Datatypes.DATE,
                    Datatypes.DATETIME,
                    Datatypes.INTEGER,
                    Datatypes.FLOAT,
                    Datatypes.STRING_ARRAY,
                ],
                configurationGroups: [
                    new Primatives.ConfigurationGroup({
                        label: "Meta",
                        identifier: "meta",
                        description:
                            "Define additional metadata for this Schema",
                        layoutVariant: GroupLayoutVariant.LIST,
                        properties: [
                            new Primatives.ConfigurationProperty({
                                label: "Internal Note",
                                identifier: "internal_note",
                                description:
                                    "Write an internal note describing this schema",
                                defaultValue: "",
                                layoutVariant: PropertyLayoutVariant.COL_12,
                                type: PropertyTypes.STRING,
                            }),
                        ],
                    }),
                    new Primatives.ConfigurationGroup({
                        label: "API Actions",
                        identifier: "api_actions",
                        description: "Define individual REST api actions.",
                        documentation:
                            "This is documentation for the API Actions configuration group",
                        layoutVariant: GroupLayoutVariant.LIST,
                        properties: [ApiActionsProperty],
                    }),
                    new Primatives.ConfigurationGroup({
                        label: "GraphQL API",
                        identifier: "graphql_api",
                        description:
                            "Configure the GraphQL API for this Schema",
                        layoutVariant: GroupLayoutVariant.LIST,
                        properties: [
                            new Primatives.ConfigurationProperty({
                                type: PropertyTypes.BOOLEAN,
                                defaultValue: true,
                                identifier: "generate_crud_api",
                                label: "Generate CRUD API",
                                description:
                                    "Generate a CRUD API with GraphQL for this resource",
                                layoutVariant:
                                    PropertyLayoutVariant.CARD_COL_12,
                            }),
                            new Primatives.ConfigurationProperty({
                                label: "DynamoDB table name",
                                identifier: "dynamodb_table_name",
                                description:
                                    "Define the name of the DynamoDB table for this",
                                defaultValue: "",
                                type: PropertyTypes.STRING,
                                layoutVariant:
                                    PropertyLayoutVariant.CARD_COL_12,
                            }),
                            ApiActionsProperty,
                        ],
                    }),
                ],
                attributeAddons: [
                    // ATTRIBUTE_ADDON_UNIQUE,
                    // ATTRIBUTE_ADDON_NULLABLE,
                    // ATTRIBUTE_ADDON_PRIMARY_KEY,
                    // {
                    //     ...ATTRIBUTE_ADDON_REQUIRED,
                    //     supportedDatatypes: [
                    //         Datatypes.STRING,
                    //         Datatypes.DATE,
                    //         Datatypes.DATETIME,
                    //         Datatypes.INTEGER,
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
                    //     dropdownOptions: [
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
                    //         Datatypes.INTEGER,
                    //         Datatypes.FLOAT,
                    //         Datatypes.STRING_ARRAY,
                    //     ],
                    // },
                ],
                defaultRelations: [
                    {
                        id: "USER-RELATION-ID",
                        required: true,
                        type: RelationType.TO_ONE,
                        destinationSchemaAlias: "Creator",
                        sourceSchemaAlias: "",
                        source: CreatedByValues.plugin,
                        destinationSchemaId: "USER_SCHEMA",
                    },
                ],
                defaultAttributes: [
                    {
                        id: "UUID-Attribute",
                        identifiers: {
                            label: "ID",
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
                        source: CreatedByValues.plugin,
                        internalNote: "",
                        defaultValue: null,
                    },
                ],
                defaultSchemas: [
                    {
                        id: "USER_SCHEMA",
                        identifiers: {
                            singular: {
                                label: "User",
                                snake: "user",
                                camel: "user",
                                pascal: "User",
                                kebab: "user",
                            },
                            plural: {
                                label: "Users",
                                snake: "users",
                                camel: "users",
                                pascal: "Users",
                                kebab: "users",
                            },
                        },
                        locked: true,
                        removable: false,
                        source: CreatedByValues.plugin,
                        internalNote: "",
                        attributes: [
                            {
                                id: "UUID-Attribute",
                                identifiers: {
                                    label: "ID",
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
                                source: CreatedByValues.plugin,
                                internalNote: "The uniqie ID of the user",
                                defaultValue: null,
                            },
                            {
                                id: "Email-Attribute",
                                identifiers: {
                                    label: "Email",
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
                                source: CreatedByValues.plugin,
                                internalNote: "The email of the user",
                                defaultValue: null,
                            },
                        ],
                        relations: [],
                        configuration: {},
                    },
                ],
            },
        },
    ],
];

// // // //

const storyCollection = storiesOf("Pages/WebRuntime", module);

stories.forEach(story => {
    storyCollection.add(story[0], () => {
        return (
            <Story>
                <WebRuntime generator={story[1]}>
                    {({ generator, project, setProject, clearProject }) => (
                        <RuntimeProvider>
                            {({ generateCode }) => (
                                <React.Fragment>
                                    <ProjectEditor
                                        generator={generator}
                                        project={project}
                                        onClickGenerate={() => {
                                            generateCode({
                                                project,
                                                generator,
                                            });
                                        }}
                                        onResetProject={clearProject}
                                        onChange={(updatedProject: Project) => {
                                            setProject(updatedProject);
                                        }}
                                    />
                                </React.Fragment>
                            )}
                        </RuntimeProvider>
                    )}
                </WebRuntime>
            </Story>
        );
    });
});
