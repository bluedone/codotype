import {
    Datatype,
    ConfigurationGroup,
    RelationTypes,
    GroupLayoutVariant,
    ConfigurationGroupProperty,
    OptionType,
    ExperienceRecommendations,
    PluginMetadata,
    SchemaCreators,
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
import { ATTRIBUTE_ADDON_PRIMARY_KEY } from "../../attribute-addon";
import { DataPreviewLayoutVariant } from "../../data-preview";
import { PropertyLayoutVariant } from "../../configuration-option-types";

// // // //

export const ComponentBuilderConfigurationGroupProperty: ConfigurationGroupProperty = {
    identifier: "components",
    content: {
        label: "Component",
        description: "Define the component data",
        documentation: "",
        icon:
            "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
    },
    type: OptionType.COLLECTION,
    defaultValue: [],
    enabledByDefault: true,
    required: false,
    allowDisable: false,
    unique: false,
    layoutVariant: PropertyLayoutVariant.COL_12,
    dropdownOptions: [],
    filters: [],
    validations: [],
    dataPreview: {
        rules: [],
        variant: DataPreviewLayoutVariant.CODE_DARK,
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
            type: OptionType.STRING,
            defaultValue: "",
            enabledByDefault: true,
            required: false,
            allowDisable: false,
            properties: [],
            dropdownOptions: [],
            unique: false,
            layoutVariant: PropertyLayoutVariant.COL_12,
            filters: [],
            validations: [],
            dataPreview: {
                rules: [],
                variant: DataPreviewLayoutVariant.CODE_DARK,
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
            type: OptionType.STRING,
            defaultValue: "",
            enabledByDefault: true,
            required: false,
            allowDisable: false,
            unique: false,
            layoutVariant: PropertyLayoutVariant.COL_12,
            properties: [],
            dropdownOptions: [],
            filters: [],
            validations: [],
            dataPreview: {
                rules: [],
                variant: DataPreviewLayoutVariant.CODE_DARK,
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
            type: OptionType.COLLECTION,
            defaultValue: "",
            enabledByDefault: true,
            unique: false,
            layoutVariant: PropertyLayoutVariant.COL_12,
            required: false,
            allowDisable: false,
            filters: [],
            validations: [],
            dataPreview: {
                rules: [],
                variant: DataPreviewLayoutVariant.CODE_DARK,
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
                    type: OptionType.DROPDOWN,
                    defaultValue: "",
                    enabledByDefault: true,
                    required: false,
                    unique: false,
                    layoutVariant: PropertyLayoutVariant.COL_12,
                    allowDisable: false,
                    dropdownOptions: [{ label: "String", value: "string" }],
                    properties: [],
                    filters: [],
                    validations: [],
                    dataPreview: {
                        rules: [],
                        variant: DataPreviewLayoutVariant.CODE_DARK,
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
                    type: OptionType.STRING,
                    defaultValue: "",
                    enabledByDefault: true,
                    required: false,
                    allowDisable: false,
                    unique: false,
                    layoutVariant: PropertyLayoutVariant.COL_12,
                    dropdownOptions: [],
                    properties: [],
                    filters: [],
                    validations: [],
                    dataPreview: {
                        rules: [],
                        variant: DataPreviewLayoutVariant.CODE_DARK,
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
                    type: OptionType.STRING,
                    defaultValue: "",
                    enabledByDefault: true,
                    required: false,
                    allowDisable: false,
                    unique: false,
                    layoutVariant: PropertyLayoutVariant.COL_12,
                    dropdownOptions: [],
                    properties: [],
                    filters: [],
                    validations: [],
                    dataPreview: {
                        rules: [],
                        variant: DataPreviewLayoutVariant.CODE_DARK,
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
            type: OptionType.INSTANCE,
            defaultValue: "",
            enabledByDefault: true,
            unique: false,
            layoutVariant: PropertyLayoutVariant.COL_12,
            required: false,
            allowDisable: true,
            dropdownOptions: [],
            filters: [],
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
                    type: OptionType.DROPDOWN,
                    defaultValue: "",
                    enabledByDefault: true,
                    unique: false,
                    layoutVariant: PropertyLayoutVariant.COL_12,
                    required: false,
                    allowDisable: false,
                    dropdownOptions: [
                        { value: "table", label: "Table Test" },
                        { value: "snapshot", label: "Snapshot Test" },
                    ],
                    properties: [],
                    filters: [],
                    validations: [],
                    dataPreview: {
                        rules: [],
                        variant: DataPreviewLayoutVariant.CODE_DARK,
                    },
                },
            ],
            dataPreview: {
                rules: [],
                variant: DataPreviewLayoutVariant.CODE_DARK,
            },
        },
    ],
};

export const ComponentBuilderConfigurationGroupPropertySingleText: ConfigurationGroupProperty = {
    content: {
        label: "Component Name",
        description: "Name of the component",
        documentation: "",
        icon: "",
    },
    identifier: "componentName",
    type: OptionType.STRING,
    defaultValue: "",
    enabledByDefault: true,
    unique: false,
    layoutVariant: PropertyLayoutVariant.COL_12,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    filters: [],
    validations: [],
    dataPreview: {
        rules: [],
        variant: DataPreviewLayoutVariant.CODE_DARK,
    },
};

export const ComponentBuilderConfigurationGroupPropertySingleDropdown: ConfigurationGroupProperty = {
    content: {
        label: "Dropdown Test",
        description: "Dropdown Testing",
        documentation: "",
        icon:
            "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
    },
    identifier: "dropdownTest",
    type: OptionType.DROPDOWN,
    defaultValue: "",
    enabledByDefault: true,
    unique: false,
    layoutVariant: PropertyLayoutVariant.COL_12,
    required: false,
    allowDisable: false,
    properties: [],
    filters: [],
    validations: [],
    dropdownOptions: [
        {
            value: "OPTION_01",
            label: "One",
        },
        { value: "OPTION_02", label: "Two" },
    ],
    dataPreview: {
        rules: [],
        variant: DataPreviewLayoutVariant.CODE_DARK,
    },
};

export const ComponentBuilderConfigurationGroupPropertySingleNumber: ConfigurationGroupProperty = {
    content: {
        label: "Number Test",
        description:
            "This is a number for testing. Don't overthink it. It's just a number. I'll should pull some configuration options from an existing generator to populate this placeholder.",
        documentation: "",
        icon: "",
    },
    identifier: "numberTest",
    type: OptionType.NUMBER,
    defaultValue: "",
    enabledByDefault: true,
    unique: false,
    layoutVariant: PropertyLayoutVariant.COL_12,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    filters: [],
    validations: [],
    dataPreview: {
        rules: [],
        variant: DataPreviewLayoutVariant.CODE_DARK,
    },
};

export const ComponentBuilderConfigurationGroupPropertyWithInstance01: ConfigurationGroupProperty = {
    identifier: "random_instance",
    content: {
        label: "RandomInstanceTest",
        description: "",
        documentation: "",
        icon: "",
    },
    type: OptionType.INSTANCE,
    defaultValue: "",
    enabledByDefault: true,
    unique: false,
    layoutVariant: PropertyLayoutVariant.COL_12,
    required: false,
    allowDisable: true,
    filters: [],
    validations: [],
    dropdownOptions: [],
    properties: [ComponentBuilderConfigurationGroupPropertySingleDropdown],
    dataPreview: {
        rules: [],
        variant: DataPreviewLayoutVariant.CODE_DARK,
    },
};

export const ComponentBuilderConfigurationGroupPropertyWithInstance: ConfigurationGroupProperty = {
    identifier: "tests",
    content: {
        label: "Tests",
        icon:
            "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
        description: "",
        documentation: "",
    },
    type: OptionType.INSTANCE,
    defaultValue: "",
    enabledByDefault: true,
    required: false,
    allowDisable: true,
    unique: false,
    layoutVariant: PropertyLayoutVariant.COL_12,
    dropdownOptions: [],
    filters: [],
    validations: [],
    dataPreview: {
        rules: [],
        variant: DataPreviewLayoutVariant.CODE_DARK,
    },
    properties: [
        ComponentBuilderConfigurationGroupPropertySingleDropdown,
        ComponentBuilderConfigurationGroupPropertySingleText,
        {
            identifier: "nested_instance",
            content: {
                label: "Nested Instance",
                description: "",
                documentation: "",
                icon: "",
            },
            type: OptionType.INSTANCE,
            unique: false,
            layoutVariant: PropertyLayoutVariant.COL_12,
            defaultValue: "",
            enabledByDefault: true,
            required: false,
            allowDisable: true,
            dropdownOptions: [],
            filters: [],
            validations: [],
            dataPreview: {
                rules: [],
                variant: DataPreviewLayoutVariant.CODE_DARK,
            },
            properties: [
                ComponentBuilderConfigurationGroupPropertySingleText,
                ComponentBuilderConfigurationGroupPropertySingleDropdown,
                ComponentBuilderConfigurationGroupPropertyWithInstance01,
            ],
        },
    ],
};

// // // //
// ConfigurationGroups

export const ComponentBuilderConfigurationGroup: ConfigurationGroup = {
    identifier: "components_group",
    content: {
        label: "Component Generator",
        description: "Generate React components",
        documentation: "Generate React components",
        icon: "",
    },
    enabledByDefault: true,
    allowDisable: false,
    layoutVariant: GroupLayoutVariant.TABS,
    sections: [],
    properties: [
        ComponentBuilderConfigurationGroupPropertySingleText,
        ComponentBuilderConfigurationGroupPropertySingleNumber,
        ComponentBuilderConfigurationGroupPropertySingleDropdown,
        ComponentBuilderConfigurationGroupPropertyWithInstance,
        // ComponentBuilderConfigurationGroupProperty,
    ],
};

// // // //

export const LambdaBuilderNameProperty: ConfigurationGroupProperty = {
    identifier: "lambdaName",
    content: {
        label: "Lambda Name",
        description:
            "How the Lambda function will be namd in the AWS dashboard",
        documentation: "",
        icon: "",
    },
    type: OptionType.STRING,
    defaultValue: "",
    enabledByDefault: true,
    required: false,
    unique: false,
    layoutVariant: PropertyLayoutVariant.COL_12,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    filters: [],
    validations: [],
    dataPreview: {
        rules: [],
        variant: DataPreviewLayoutVariant.CODE_DARK,
    },
};

export const LambdaLanguageProperty: ConfigurationGroupProperty = {
    identifier: "language",
    content: {
        label: "Language",
        description: "The programming language used to build the Lambda",
        documentation: "",
        icon: "",
    },
    type: OptionType.DROPDOWN,
    defaultValue: "",
    unique: false,
    layoutVariant: PropertyLayoutVariant.COL_12,
    enabledByDefault: true,
    required: false,
    allowDisable: false,
    properties: [],
    filters: [],
    validations: [],
    dataPreview: {
        rules: [],
        variant: DataPreviewLayoutVariant.CODE_DARK,
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
    layoutVariant: GroupLayoutVariant.LIST,
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
            type: OptionType.COLLECTION,
            defaultValue: [],
            unique: false,
            layoutVariant: PropertyLayoutVariant.COL_12,
            enabledByDefault: true,
            required: false,
            allowDisable: true,
            dropdownOptions: [],
            filters: [],
            validations: [],
            properties: [LambdaBuilderNameProperty, LambdaLanguageProperty],
            dataPreview: {
                rules: [],
                variant: DataPreviewLayoutVariant.CODE_DARK,
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
    layoutVariant: GroupLayoutVariant.LIST,
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
    layoutVariant: GroupLayoutVariant.DOCS_4x8,
    properties: [twitterApiOption],
};

// // // // // // //
// PluginMetadata

export const cdkGeneratorMeta: PluginMetadata = {
    id: "aws_cdk_starter", // unique ID for the generator
    content: {
        label: "AWS CDK Starter", // short label for the generator
        description: "A Codotype Generator for AWS CDK", // brief description of the generator
        documentation: "",
        icon:
            "https://res.cloudinary.com/codotype/image/upload/v1553197653/tech-logos/nodejs.png", // URL to the generator's icon. Must be at least 200x200px
    },
    homepage: "https://codotype.org", // the "homepage" for this generator
    version: "0.1.0", // the current version of the generator
    codotypeVersion: "0.1.0",
    createdBy: {
        name: "Codotype",
        contact: {
            website: "https://codotype.io",
        },
    },
    techTags: ["AWS", "React", "TypeScript", "CDK", "Lambda", "DynamoDB", "S3"], // an array of strings describing the tech used in the generator
    typeTags: ["Full-stack", "Infrastructure"], // describes the type of codebase produced by this generator
    experience: ExperienceRecommendations.beginner, // an optional tag detailing the level of experience required to use the code produced by the generator
    project_path: "output", // the name of the directory for the generator's output
    schemaEditorConfiguration: {
        documentation: "",
        configurationGroups: [],
        supportedDatatypes: [], // The datatypes supported by this generator.Only an array of DATATYPE_ * identifiers that correspond to values defined in @codotype/core are accepted.
        supportedRelations: [], // The relation types supported by this generator.Only an array of RELATION_TYPE_ * identifiers that correspond to values defined in @codotype/core are accepted.
        defaultSchemas: [],
        defaultAttributes: [],
        defaultRelations: [],
        attributeAddons: [],
        enableAttributeDefaultValue: false,
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
    ], // an array of OptionGroup objects that expose additional configuration provided by the generator
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
    removable: false,
    source: SchemaCreators.user,
    configuration: {},
};

export const emailAttribute: Attribute = {
    id: "email-attr",
    datatype: Datatype.STRING,
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
    source: SchemaCreators.user,
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
            datatype: Datatype.STRING,
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
            source: SchemaCreators.user,
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
    removable: false,
    source: SchemaCreators.user,
    configuration: {},
};

// // // // // //

export const dummyGeneratorMeta: PluginMetadata = {
    id: "chrome_extension_generator", // unique ID for the generator
    content: {
        label: "Chrome Extension Generator", // short label for the generator
        description: "A Codotype Generator", // brief description of the generator
        documentation: "A Codotype Generator", // Detailed description of the generator
        icon:
            "https://res.cloudinary.com/codotype/image/upload/v1553197653/tech-logos/nodejs.png", // URL to the generator's icon. Must be at least 200x200px
    },
    homepage: "https://codotype.org", // the "homepage" for this generator
    version: "0.1.0", // the current version of the generator
    codotypeVersion: "0.1.0",
    createdBy: {
        name: "Codotype",
        contact: {},
    },
    techTags: ["React", "TypeScript", "Bootstrap"], // an array of strings describing the tech used in the generator
    typeTags: ["Chrome Extension", "Infrastructure"], // describes the type of codebase produced by this generator
    experience: ExperienceRecommendations.beginner, // an optional tag detailing the level of experience required to use the code produced by the generator
    project_path: "output", // the name of the directory for the generator's output
    exampleProjects: [],
    schemaEditorConfiguration: {
        configurationGroups: [],
        documentation: "",
        defaultSchemas: [],
        supportedDatatypes: [
            Datatype.STRING,
            Datatype.TEXT,
            Datatype.NUMERIC,
            Datatype.TIMESTAMP,
        ], // The datatypes supported by this generator.Only an array of DATATYPE_ * identifiers that correspond to values defined in @codotype/core are accepted.
        supportedRelations: [RelationTypes.TO_ONE, RelationTypes.TO_MANY], // The relation types supported by this generator.Only an array of RELATION_TYPE_ * identifiers that correspond to values defined in @codotype/core are accepted.
        defaultAttributes: [
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
                    [ATTRIBUTE_ADDON_PRIMARY_KEY.identifier]: true,
                },
                datatype: Datatype.UUID,
                locked: true,
                source: SchemaCreators.plugin,
                internalNote: "",
                defaultValue: null,
            },
        ],
        defaultRelations: [],
        attributeAddons: [],
        enableAttributeDefaultValue: true,
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
            layoutVariant: GroupLayoutVariant.DOCS_6x6,
            properties: [twitterApiOption],
        },
        ComponentBuilderConfigurationGroup,
    ], // an array of OptionGroup objects that expose additional configuration provided by the generator
};
