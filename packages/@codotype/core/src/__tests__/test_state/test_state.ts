import {
    Datatypes,
    ConfigurationGroup,
    RelationTypes,
    GroupLayoutVariants,
    ConfigurationProperty,
    PropertyType,
    ExperienceRecommendations,
    PluginMetadata,
    CreatedByValues,
    SchemaInput,
    Attribute,
} from "../../index";
import {
    gitHubApiOption,
    twitterApiOption,
    facebookApiOption,
    foursquareApiOption,
    instagramApiOption,
    last_fmApiOption,
    linkedinApiOption,
    steamApiOption,
    stripeApiOption,
    paypalApiOption,
    twilioApiOption,
    tumblrApiOption,
    web_scrapingApiOption,
    clockwork_smsApiOption,
    aviaryApiOption,
    lobApiOption,
    pinterestApiOption,
    google_mapsApiOption,
    chartjsApiOption,
} from "./configuration-properties";
import { syntaxHighlighting } from "./documentation";
import { attributeAddons } from "./addon-property";
import { PropertyPreviewLayoutVariant } from "../../property-preview";
import { PropertyLayoutVariants } from "../../configuration-property";

// // // //

// TODO - clean up test state module, growing impossible to work with
// TODO - clean up test state module, growing impossible to work with
// TODO - clean up test state module, growing impossible to work with

export const ComponentBuilderConfigurationProperty: ConfigurationProperty = {
    identifier: "components",
    content: {
        label: "Component",
        description: "Define the component data",
        documentation: "",
        icon:
            "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
    },
    type: PropertyType.COLLECTION,
    defaultValue: [],
    enabledByDefault: true,
    required: false,
    allowDisable: false,
    unique: false,
    layoutVariant: PropertyLayoutVariants.COL_12,
    dropdownOptions: [],
    transformations: [],
    validations: [],
    preview: {
        rules: [],
        variant: PropertyPreviewLayoutVariant.CODE_DARK,
    },
    properties: [
        {
            identifier: "componentName",
            content: {
                label: "Component Name",
                description: "Name of the component",
                icon: "",
                documentation: "",
            },
            type: PropertyType.STRING,
            defaultValue: "",
            enabledByDefault: true,
            required: false,
            allowDisable: false,
            properties: [],
            dropdownOptions: [],
            unique: false,
            layoutVariant: PropertyLayoutVariants.COL_12,
            transformations: [],
            validations: [],
            preview: {
                rules: [],
                variant: PropertyPreviewLayoutVariant.CODE_DARK,
            },
        },
        {
            identifier: "componentSlug",
            content: {
                label: "Component Slug",
                description: "Slug of the component",
                documentation: "",
                icon: "",
            },
            type: PropertyType.STRING,
            defaultValue: "",
            enabledByDefault: true,
            required: false,
            allowDisable: false,
            unique: false,
            layoutVariant: PropertyLayoutVariants.COL_12,
            properties: [],
            dropdownOptions: [],
            transformations: [],
            validations: [],
            preview: {
                rules: [],
                variant: PropertyPreviewLayoutVariant.CODE_DARK,
            },
        },
        {
            identifier: "props",
            content: {
                label: "Props",
                description: "",
                documentation: "",
                icon: "",
            },
            dropdownOptions: [],
            type: PropertyType.COLLECTION,
            defaultValue: "",
            enabledByDefault: true,
            unique: false,
            layoutVariant: PropertyLayoutVariants.COL_12,
            required: false,
            allowDisable: false,
            transformations: [],
            validations: [],
            preview: {
                rules: [],
                variant: PropertyPreviewLayoutVariant.CODE_DARK,
            },
            properties: [
                {
                    identifier: "type",
                    content: {
                        label: "Type",
                        description: "",
                        documentation: "",
                        icon: "",
                    },
                    type: PropertyType.DROPDOWN,
                    defaultValue: "",
                    enabledByDefault: true,
                    required: false,
                    unique: false,
                    layoutVariant: PropertyLayoutVariants.COL_12,
                    allowDisable: false,
                    dropdownOptions: [{ label: "String", value: "string" }],
                    properties: [],
                    transformations: [],
                    validations: [],
                    preview: {
                        rules: [],
                        variant: PropertyPreviewLayoutVariant.CODE_DARK,
                    },
                },
                {
                    identifier: "name",
                    content: {
                        label: "Name",
                        description: "",
                        documentation: "",
                        icon: "",
                    },
                    type: PropertyType.STRING,
                    defaultValue: "",
                    enabledByDefault: true,
                    required: false,
                    allowDisable: false,
                    unique: false,
                    layoutVariant: PropertyLayoutVariants.COL_12,
                    dropdownOptions: [],
                    properties: [],
                    transformations: [],
                    validations: [],
                    preview: {
                        rules: [],
                        variant: PropertyPreviewLayoutVariant.CODE_DARK,
                    },
                },
                {
                    identifier: "desc",
                    content: {
                        label: "Desc",
                        description: "",
                        documentation: "",
                        icon: "",
                    },
                    type: PropertyType.STRING,
                    defaultValue: "",
                    enabledByDefault: true,
                    required: false,
                    allowDisable: false,
                    unique: false,
                    layoutVariant: PropertyLayoutVariants.COL_12,
                    dropdownOptions: [],
                    properties: [],
                    transformations: [],
                    validations: [],
                    preview: {
                        rules: [],
                        variant: PropertyPreviewLayoutVariant.CODE_DARK,
                    },
                },
            ],
        },
        {
            identifier: "tests",
            content: {
                label: "Tests",
                description: "",
                documentation: "",
                icon: "",
            },
            type: PropertyType.INSTANCE,
            defaultValue: "",
            enabledByDefault: true,
            unique: false,
            layoutVariant: PropertyLayoutVariants.COL_12,
            required: false,
            allowDisable: true,
            dropdownOptions: [],
            transformations: [],
            validations: [],
            properties: [
                {
                    identifier: "testType",
                    content: {
                        label: "Test Type",
                        description: "",
                        documentation: "",
                        icon: "",
                    },
                    type: PropertyType.DROPDOWN,
                    defaultValue: "",
                    enabledByDefault: true,
                    unique: false,
                    layoutVariant: PropertyLayoutVariants.COL_12,
                    required: false,
                    allowDisable: false,
                    dropdownOptions: [
                        { value: "table", label: "Table Test" },
                        { value: "snapshot", label: "Snapshot Test" },
                    ],
                    properties: [],
                    transformations: [],
                    validations: [],
                    preview: {
                        rules: [],
                        variant: PropertyPreviewLayoutVariant.CODE_DARK,
                    },
                },
            ],
            preview: {
                rules: [],
                variant: PropertyPreviewLayoutVariant.CODE_DARK,
            },
        },
    ],
};

export const ComponentBuilderConfigurationPropertySingleText: ConfigurationProperty = {
    content: {
        label: "Component Name",
        description: "Name of the component",
        documentation: "",
        icon: "",
    },
    identifier: "componentName",
    type: PropertyType.STRING,
    defaultValue: "",
    enabledByDefault: true,
    unique: false,
    layoutVariant: PropertyLayoutVariants.COL_12,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    transformations: [],
    validations: [],
    preview: {
        rules: [],
        variant: PropertyPreviewLayoutVariant.CODE_DARK,
    },
};

export const ComponentBuilderConfigurationPropertySingleDropdown: ConfigurationProperty = {
    content: {
        label: "Dropdown Test",
        description: "Dropdown Testing",
        documentation: "",
        icon:
            "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
    },
    identifier: "dropdownTest",
    type: PropertyType.DROPDOWN,
    defaultValue: "",
    enabledByDefault: true,
    unique: false,
    layoutVariant: PropertyLayoutVariants.COL_12,
    required: false,
    allowDisable: false,
    properties: [],
    transformations: [],
    validations: [],
    dropdownOptions: [
        {
            value: "OPTION_01",
            label: "One",
        },
        { value: "OPTION_02", label: "Two" },
    ],
    preview: {
        rules: [],
        variant: PropertyPreviewLayoutVariant.CODE_DARK,
    },
};

export const ComponentBuilderConfigurationPropertySingleNumber: ConfigurationProperty = {
    content: {
        label: "Number Test",
        description:
            "This is a number for testing. Don't overthink it. It's just a number. I'll should pull some configuration options from an existing plugin to populate this placeholder.",
        documentation: "",
        icon: "",
    },
    identifier: "numberTest",
    type: PropertyType.NUMBER,
    defaultValue: "",
    enabledByDefault: true,
    unique: false,
    layoutVariant: PropertyLayoutVariants.COL_12,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    transformations: [],
    validations: [],
    preview: {
        rules: [],
        variant: PropertyPreviewLayoutVariant.CODE_DARK,
    },
};

export const ComponentBuilderConfigurationPropertyWithInstance01: ConfigurationProperty = {
    identifier: "random_instance",
    content: {
        label: "RandomInstanceTest",
        description: "",
        documentation: "",
        icon: "",
    },
    type: PropertyType.INSTANCE,
    defaultValue: "",
    enabledByDefault: true,
    unique: false,
    layoutVariant: PropertyLayoutVariants.COL_12,
    required: false,
    allowDisable: true,
    transformations: [],
    validations: [],
    dropdownOptions: [],
    properties: [ComponentBuilderConfigurationPropertySingleDropdown],
    preview: {
        rules: [],
        variant: PropertyPreviewLayoutVariant.CODE_DARK,
    },
};

export const ComponentBuilderConfigurationPropertyWithInstance: ConfigurationProperty = {
    identifier: "tests",
    content: {
        label: "Tests",
        icon:
            "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
        description: "",
        documentation: "",
    },
    type: PropertyType.INSTANCE,
    defaultValue: "",
    enabledByDefault: true,
    required: false,
    allowDisable: true,
    unique: false,
    layoutVariant: PropertyLayoutVariants.COL_12,
    dropdownOptions: [],
    transformations: [],
    validations: [],
    preview: {
        rules: [],
        variant: PropertyPreviewLayoutVariant.CODE_DARK,
    },
    properties: [
        ComponentBuilderConfigurationPropertySingleDropdown,
        ComponentBuilderConfigurationPropertySingleText,
        {
            identifier: "nested_instance",
            content: {
                label: "Nested Instance",
                description: "",
                documentation: "",
                icon: "",
            },
            type: PropertyType.INSTANCE,
            unique: false,
            layoutVariant: PropertyLayoutVariants.COL_12,
            defaultValue: "",
            enabledByDefault: true,
            required: false,
            allowDisable: true,
            dropdownOptions: [],
            transformations: [],
            validations: [],
            preview: {
                rules: [],
                variant: PropertyPreviewLayoutVariant.CODE_DARK,
            },
            properties: [
                ComponentBuilderConfigurationPropertySingleText,
                ComponentBuilderConfigurationPropertySingleDropdown,
                ComponentBuilderConfigurationPropertyWithInstance01,
            ],
        },
    ],
};

// // // //
// ConfigurationGroups

export const ComponentBuilderConfigurationGroup: ConfigurationGroup = {
    identifier: "components_group",
    content: {
        label: "Component plugin",
        description: "Generate React components",
        documentation: "Generate React components",
        icon: "",
    },
    enabledByDefault: true,
    allowDisable: false,
    layoutVariant: GroupLayoutVariants.TABS,
    sections: [],
    properties: [
        ComponentBuilderConfigurationPropertySingleText,
        ComponentBuilderConfigurationPropertySingleNumber,
        ComponentBuilderConfigurationPropertySingleDropdown,
        ComponentBuilderConfigurationPropertyWithInstance,
        // ComponentBuilderConfigurationProperty,
    ],
};

// // // //

export const LambdaBuilderNameProperty: ConfigurationProperty = {
    identifier: "lambdaName",
    content: {
        label: "Lambda Name",
        description:
            "How the Lambda function will be namd in the AWS dashboard",
        documentation: "",
        icon: "",
    },
    type: PropertyType.STRING,
    defaultValue: "",
    enabledByDefault: true,
    required: false,
    unique: false,
    layoutVariant: PropertyLayoutVariants.COL_12,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    transformations: [],
    validations: [],
    preview: {
        rules: [],
        variant: PropertyPreviewLayoutVariant.CODE_DARK,
    },
};

export const LambdaLanguageProperty: ConfigurationProperty = {
    identifier: "language",
    content: {
        label: "Language",
        description: "The programming language used to build the Lambda",
        documentation: "",
        icon: "",
    },
    type: PropertyType.DROPDOWN,
    defaultValue: "",
    unique: false,
    layoutVariant: PropertyLayoutVariants.COL_12,
    enabledByDefault: true,
    required: false,
    allowDisable: false,
    properties: [],
    transformations: [],
    validations: [],
    preview: {
        rules: [],
        variant: PropertyPreviewLayoutVariant.CODE_DARK,
    },
    dropdownOptions: [
        {
            label: "TypeScript",
            value: "typescript",
        },
        {
            label: "JavaScript",
            value: "javascrtip",
        },
    ],
};

export const LambdaBuilderConfigurationGroup: ConfigurationGroup = {
    identifier: "lambda_builder",
    content: {
        label: "Lambda Builder",
        description: "Generate AWS Lambdas",
        documentation: syntaxHighlighting,
        icon: "",
    },
    enabledByDefault: true,
    allowDisable: false,
    layoutVariant: GroupLayoutVariants.LIST,
    sections: [],
    properties: [
        {
            identifier: "lambda_collection",
            content: {
                label: "Lambdas",
                description: "",
                documentation: "",
                icon: "",
            },
            type: PropertyType.COLLECTION,
            defaultValue: [],
            unique: false,
            layoutVariant: PropertyLayoutVariants.COL_12,
            enabledByDefault: true,
            required: false,
            allowDisable: true,
            dropdownOptions: [],
            transformations: [],
            validations: [],
            properties: [LambdaBuilderNameProperty, LambdaLanguageProperty],
            preview: {
                rules: [],
                variant: PropertyPreviewLayoutVariant.CODE_DARK,
            },
        },
    ],
};

// // // //

export const ApiExamplesConfigurationGroup: ConfigurationGroup = {
    identifier: "api_examples",
    content: {
        label: "API Examples",
        description: "Configurate API examples for the Application",
        documentation: syntaxHighlighting,
        icon: "",
    },
    enabledByDefault: true,
    allowDisable: false,
    layoutVariant: GroupLayoutVariants.LIST,
    sections: [],
    properties: [twitterApiOption],
};

export const SideBySideConfigurationGroup: ConfigurationGroup = {
    ...ComponentBuilderConfigurationGroup,
    content: {
        label: "Architecture Configuration",
        description: "Configure the server architecture of your application",
        documentation: syntaxHighlighting,
        icon: "",
    },
    identifier: "component_builder_side_by_side",
    layoutVariant: GroupLayoutVariants.DOCS_4x8,
    properties: [twitterApiOption],
};

// // // // // // //
// PluginMetadata

export const cdkPluginMeta: PluginMetadata = {
    identifier: "aws_cdk_starter", // unique ID for the plugin
    content: {
        label: "AWS CDK Starter", // short label for the plugin
        description: "A Codotype plugin for AWS CDK", // brief description of the plugin
        documentation: "",
        icon:
            "https://res.cloudinary.com/codotype/image/upload/v1553197653/tech-logos/nodejs.png", // URL to the plugin's icon. Must be at least 200x200px
    },
    homepage: "https://codotype.org", // the "homepage" for this plugin
    version: "0.1.0", // the current version of the plugin
    codotypeVersion: "0.1.0",
    createdBy: {
        name: "Codotype",
        contact: {
            website: "https://codotype.io",
        },
    },
    techTags: ["AWS", "React", "TypeScript", "CDK", "Lambda", "DynamoDB", "S3"], // an array of strings describing the tech used in the plugin
    typeTags: ["Full-stack", "Infrastructure"], // describes the type of codebase produced by this plugin
    experience: ExperienceRecommendations.beginner, // an optional tag detailing the level of experience required to use the code produced by the plugin
    project_path: "output", // the name of the directory for the plugin's output
    schemaEditorConfiguration: {
        configurationGroups: [],
        supportedDatatypes: [], // The datatypes supported by this plugin.Only an array of DATATYPE_ * identifiers that correspond to values defined in @codotype/core are accepted.
        supportedRelationTypes: [], // The relation types supported by this plugin.Only an array of RELATION_TYPE_ * identifiers that correspond to values defined in @codotype/core are accepted.
        defaultSchemas: [],
        newSchemaDefaults: {
            attributes: [],
            relations: [],
        },
        defaultRelations: [],
        attributeAddons: [],
        relationAddons: [],
    },
    configurationGroups: [
        LambdaBuilderConfigurationGroup,
        {
            ...ComponentBuilderConfigurationGroup,
            identifier: "api_examples",
            content: {
                ...ComponentBuilderConfigurationGroup.content,
                label: "API Examples",
            },
            properties: [twitterApiOption],
        },
        ComponentBuilderConfigurationGroup,
        SideBySideConfigurationGroup,
    ], // an array of OptionGroup objects that expose additional configuration provided by the plugin
    exampleProjects: [],
};

// // // //
// Schemas
export const userSchema: SchemaInput = {
    id: "12345",
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
    attributes: [],
    // relations: [],
    internalNote: "",
    locked: false,
    createdBy: CreatedByValues.user,
    configuration: {},
};

export const emailAttribute: Attribute = {
    id: "email-attr",
    datatype: Datatypes.STRING,
    defaultValue: null,
    identifiers: {
        title: "Email",
        snake: "email",
        camel: "email",
        pascal: "Email",
        kebab: "email",
    },
    internalNote: "the email of the user",
    locked: false,
    createdBy: CreatedByValues.user,
    addons: {
        required: true,
    },
};

export const movieSchema: SchemaInput = {
    id: "45678",
    identifiers: {
        singular: {
            title: "Movie",
            snake: "movie",
            camel: "movie",
            pascal: "Movie",
            kebab: "movie",
        },
        plural: {
            title: "Movies",
            snake: "movies",
            camel: "movies",
            pascal: "Movies",
            kebab: "movies",
        },
    },
    internalNote: "",
    attributes: [
        {
            id: "name-attr",
            datatype: Datatypes.STRING,
            defaultValue: null,
            identifiers: {
                title: "Name",
                snake: "name",
                camel: "name",
                pascal: "Name",
                kebab: "name",
            },
            internalNote: "the name of the user",
            locked: false,
            createdBy: CreatedByValues.user,
            addons: {
                required: true,
            },
        },
        {
            ...emailAttribute,
        },
    ],
    // relations: [
    //     {
    //         id: "relation-example-01",
    //         type: RelationType.belongsTo,
    //         required: false,
    //         destinationSchemaId: userSchema.id,
    //         source: SchemaCreators.user,
    //         sourceSchemaAlias: "Directed Movie",
    //         destinationSchemaAlias: "Director",
    //     },
    // ],
    locked: false,
    createdBy: CreatedByValues.user,
    configuration: {},
};
CreatedByValues;

// // // // // //

export const dummyPluginMetadata: PluginMetadata = {
    identifier: "chrome_extension_plugin", // unique ID for the plugin
    content: {
        label: "Chrome Extension plugin", // short label for the plugin
        description: "A Codotype plugin", // brief description of the plugin
        documentation: "A Codotype plugin", // Detailed description of the plugin
        icon:
            "https://res.cloudinary.com/codotype/image/upload/v1553197653/tech-logos/nodejs.png", // URL to the plugin's icon. Must be at least 200x200px
    },
    homepage: "https://codotype.org", // the "homepage" for this plugin
    version: "0.1.0", // the current version of the plugin
    codotypeVersion: "0.1.0",
    createdBy: {
        name: "Codotype",
        contact: {},
    },
    techTags: ["React", "TypeScript", "Bootstrap"], // an array of strings describing the tech used in the plugin
    typeTags: ["Chrome Extension", "Infrastructure"], // describes the type of codebase produced by this plugin
    experience: ExperienceRecommendations.beginner, // an optional tag detailing the level of experience required to use the code produced by the plugin
    project_path: "output", // the name of the directory for the plugin's output
    exampleProjects: [],
    schemaEditorConfiguration: {
        configurationGroups: [],
        defaultSchemas: [],
        supportedDatatypes: [
            Datatypes.STRING,
            Datatypes.TEXT,
            Datatypes.NUMERIC,
            Datatypes.TIMESTAMP,
        ], // The datatypes supported by this plugin.Only an array of DATATYPE_ * identifiers that correspond to values defined in @codotype/core are accepted.
        supportedRelationTypes: [RelationTypes.TO_ONE, RelationTypes.TO_MANY], // The relation types supported by this plugin.Only an array of RELATION_TYPE_ * identifiers that correspond to values defined in @codotype/core are accepted.
        newSchemaDefaults: {
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
                        [attributeAddons.primaryKey.property.identifier]: true,
                    },
                    datatype: Datatypes.UUID,
                    locked: true,
                    createdBy: CreatedByValues.plugin,
                    internalNote: "",
                    defaultValue: "",
                },
            ],
            relations: [],
        },
        defaultRelations: [],
        attributeAddons: [],
        relationAddons: [],
    },
    configurationGroups: [
        {
            ...ComponentBuilderConfigurationGroup,
            identifier: "api_examples",
            content: {
                ...ComponentBuilderConfigurationGroup.content,
                label: "API Examples",
            },
            properties: [
                gitHubApiOption,
                twitterApiOption,
                facebookApiOption,
                foursquareApiOption,
                instagramApiOption,
                last_fmApiOption,
                linkedinApiOption,
                steamApiOption,
                stripeApiOption,
                paypalApiOption,
                twilioApiOption,
                tumblrApiOption,
                web_scrapingApiOption,
                clockwork_smsApiOption,
                aviaryApiOption,
                lobApiOption,
                pinterestApiOption,
                google_mapsApiOption,
                chartjsApiOption,
            ],
        },
        {
            ...ComponentBuilderConfigurationGroup,
            identifier: "component_builder_side_by_side",
            content: {
                label: "Architecture Configuration",
                description:
                    "Configure the server architecture of your application",
                documentation: syntaxHighlighting,
                icon: "",
            },
            layoutVariant: GroupLayoutVariants.DOCS_6x6,
            properties: [twitterApiOption],
        },
        ComponentBuilderConfigurationGroup,
    ], // an array of OptionGroup objects that expose additional configuration provided by the plugin
};
