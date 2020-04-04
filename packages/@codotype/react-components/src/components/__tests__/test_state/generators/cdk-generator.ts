import {
    ConfigurationGroup,
    ConfigurationGroupProperty,
    OptionType,
    ExperienceRecommendation,
    GeneratorMeta,
} from "@src/components/types";
// import { syntaxHighlighting } from "@src/components/markdown_renderer/__tests__/test_state";

// // // //

export const syntaxHighlighting = `

#### TypeScript
\`\`\`ts
const foo: string = "bar";
console.log(foo);
\`\`\`

#### Javascript
\`\`\`js
const foo = "bar";
console.log(foo);
\`\`\`

#### JSON
\`\`\`json
{
  "foo": "bar",
  "isJson": true,
  "count": 12
}
\`\`\`

#### Python
\`\`\`py
foo = "bar"
print(foo)
\`\`\`

`;

// // // //

export const twitterApiOption: ConfigurationGroupProperty = {
    label: "Twitter API",
    identifier: "twitter",
    type: OptionType.BOOLEAN,
    description: "Read Tweets and user profiles with the Twitter API.",
    defaultValue: false,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",

    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    // more_info_url: "https://dev.twitter.com/rest/public",
};

// // // //

export const ComponentBuilderConfigurationGroupProperty: ConfigurationGroupProperty = {
    label: "Component",
    identifier: "components",
    description: "Define the component data",
    type: OptionType.COLLECTION,
    defaultValue: [],
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
    enabled: true,
    required: false,
    allowDisable: false,
    dropdownOptions: [],
    properties: [
        {
            label: "Component Name",
            identifier: "componentName",
            description: "Name of the component",
            type: OptionType.STRING,
            defaultValue: "",
            icon: "",
            enabled: true,
            required: false,
            allowDisable: false,
            properties: [],
            dropdownOptions: [],
        },
        {
            label: "Component Slug",
            identifier: "componentSlug",
            description: "Slug of the component",
            type: OptionType.STRING,
            defaultValue: "",
            icon: "",
            enabled: true,
            required: false,
            allowDisable: false,
            properties: [],
            dropdownOptions: [],
        },
        {
            label: "Props",
            identifier: "props",
            description: "",
            dropdownOptions: [],
            type: OptionType.COLLECTION,
            defaultValue: "",
            icon: "",
            enabled: true,
            required: false,
            allowDisable: false,
            properties: [
                {
                    label: "Type",
                    identifier: "type",
                    description: "",
                    type: OptionType.DROPDOWN,
                    defaultValue: "",
                    icon: "",
                    enabled: true,
                    required: false,
                    allowDisable: false,
                    dropdownOptions: [{ label: "String", value: "string" }],
                    properties: [],
                },
                {
                    label: "Name",
                    identifier: "name",
                    description: "",
                    type: OptionType.STRING,
                    defaultValue: "",
                    icon: "",
                    enabled: true,
                    required: false,
                    allowDisable: false,
                    dropdownOptions: [],
                    properties: [],
                },
                {
                    label: "Desc",
                    identifier: "desc",
                    description: "",
                    type: OptionType.STRING,
                    defaultValue: "",
                    icon: "",
                    enabled: true,
                    required: false,
                    allowDisable: false,
                    dropdownOptions: [],
                    properties: [],
                },
            ],
        },
        {
            label: "Tests",
            identifier: "tests",
            description: "",
            type: OptionType.INSTANCE,
            defaultValue: "",
            icon: "",
            enabled: true,
            required: false,
            allowDisable: true,
            dropdownOptions: [],
            properties: [
                {
                    label: "Test Type",
                    identifier: "testType",
                    description: "",
                    type: OptionType.DROPDOWN,
                    defaultValue: "",
                    icon: "",
                    enabled: true,
                    required: false,
                    allowDisable: false,
                    dropdownOptions: [
                        { value: "table", label: "Table Test" },
                        { value: "snapshot", label: "Snapshot Test" },
                    ],
                    properties: [],
                },
            ],
        },
    ],
};

export const ComponentBuilderConfigurationGroupPropertySingleText: ConfigurationGroupProperty = {
    label: "Component Name",
    identifier: "componentName",
    description: "Name of the component",
    type: OptionType.STRING,
    defaultValue: "",
    icon: "",
    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
};

export const ComponentBuilderConfigurationGroupPropertySingleDropdown: ConfigurationGroupProperty = {
    label: "Dropdown Test",
    identifier: "dropdownTest",
    description: "Dropdown Testing",
    type: OptionType.DROPDOWN,
    defaultValue: "",
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [
        {
            value: "OPTION_01",
            label: "One",
        },
        { value: "OPTION_02", label: "Two" },
    ],
};

export const ComponentBuilderConfigurationGroupPropertySingleNumber: ConfigurationGroupProperty = {
    label: "Number Test",
    identifier: "numberTest",
    description:
        "This is a number for testing. Don't overthink it. It's just a number. I'll should pull some configuration options from an existing generator to populate this placeholder.",
    type: OptionType.NUMBER,
    defaultValue: "",
    icon: "",
    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
};

export const ComponentBuilderConfigurationGroupPropertyWithInstance01: ConfigurationGroupProperty = {
    label: "RandomInstanceTest",
    identifier: "random_instance",
    description: "",
    type: OptionType.INSTANCE,
    defaultValue: "",
    icon: "",
    enabled: true,
    required: false,
    allowDisable: true,
    dropdownOptions: [],
    properties: [ComponentBuilderConfigurationGroupPropertySingleDropdown],
};

export const ComponentBuilderConfigurationGroupPropertyWithInstance: ConfigurationGroupProperty = {
    label: "Tests",
    identifier: "tests",
    description: "",
    type: OptionType.INSTANCE,
    defaultValue: "",
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
    enabled: true,
    required: false,
    allowDisable: true,
    dropdownOptions: [],
    properties: [
        ComponentBuilderConfigurationGroupPropertySingleDropdown,
        ComponentBuilderConfigurationGroupPropertySingleText,
        {
            label: "Nested Instance",
            identifier: "nested_instance",
            description: "",
            type: OptionType.INSTANCE,
            defaultValue: "",
            icon: "",
            enabled: true,
            required: false,
            allowDisable: true,
            dropdownOptions: [],
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
    label: "Component Generator",
    identifier: "components_group",
    description: "Generate React components",
    documentation: "Generate React components",
    enabled: true,
    allowDisable: false,
    variant: "LIST",
    scope: "",
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
    label: "Lambda Name",
    identifier: "lambdaName",
    description: "How the Lambda function will be namd in the AWS dashboard",
    type: OptionType.STRING,
    defaultValue: "",
    icon: "",
    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
};

export const LambdaLanguageProperty: ConfigurationGroupProperty = {
    label: "Language",
    identifier: "language",
    description: "The programming language used to build the Lambda",
    type: OptionType.DROPDOWN,
    defaultValue: "",
    icon: "",
    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
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
    label: "Lambda Builder",
    identifier: "lambda_builder",
    description: "Generate AWS Lambdas",
    documentation: syntaxHighlighting,
    enabled: true,
    allowDisable: false,
    variant: "LIST",
    scope: "", // TODO - ditch scope!
    properties: [
        {
            label: "Lambdas",
            identifier: "lambda_collection",
            description: "",
            type: OptionType.COLLECTION,
            defaultValue: [],
            icon: "",
            enabled: true,
            required: false,
            allowDisable: true,
            dropdownOptions: [],
            properties: [LambdaBuilderNameProperty, LambdaLanguageProperty],
        },
    ],
};

// // // //

export const ApiExamplesConfigurationGroup: ConfigurationGroup = {
    label: "API Examples",
    identifier: "api_examples",
    description: "Configurate API examples for the Application",
    documentation: syntaxHighlighting,
    enabled: true,
    allowDisable: false,
    variant: "LIST",
    scope: "",
    properties: [twitterApiOption],
};

export const SideBySideConfigurationGroup: ConfigurationGroup = {
    ...ComponentBuilderConfigurationGroup,
    label: "Architecture Configuration",
    identifier: "component_builder_side_by_side",
    variant: "SIDEBYSIDE",
    description: "Configure the server architecture of your application",
    documentation: syntaxHighlighting,
    properties: [twitterApiOption],
};

// // // // // // //
// GeneratorMeta

export const cdkGeneratorMeta: GeneratorMeta = {
    id: "aws_cdk_starter", // unique ID for the generator
    label: "AWS CDK Starter", // short label for the generator
    description: "A Codotype Generator for AWS CDK", // brief description of the generator
    icon: "https://codotype.org/logo.png", // URL to the generator's icon. Must be at least 200x200px
    homepage: "https://codotype.org", // the "homepage" for this generator
    version: "0.1.0", // the current version of the generator
    created_by: "Codotype", // optional (replaces "official")
    tech_tags: [], // an array of strings describing the tech used in the generator
    type_tags: [], // describes the type of codebase produced by this generator
    experience: ExperienceRecommendation.BEGINNER, // an optional tag detailing the level of experience required to use the code produced by the generator
    project_path: "output", // the name of the directory for the generator's output
    schemaConfigurationGroup: {
        // configurationGroups: [ComponentBuilderConfigurationGroup],
        configurationGroups: [],
        supportedDatatypes: [], // The datatypes supported by this generator.Only an array of DATATYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
        supportedRelations: [], // The relation types supported by this generator.Only an array of RELATION_TYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
    },
    configuration_groups: [
        LambdaBuilderConfigurationGroup,
        {
            ...ComponentBuilderConfigurationGroup,
            label: "API Examples",
            identifier: "api_examples",
            properties: [twitterApiOption],
        },
        ComponentBuilderConfigurationGroup,
        SideBySideConfigurationGroup,
    ], // an array of OptionGroup objects that expose additional configuration provided by the generator
};
