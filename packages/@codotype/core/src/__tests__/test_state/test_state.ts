import {
  Datatype,
  ConfigurationGroup,
  RelationType,
  GroupLayoutVariant,
  ConfigurationGroupProperty,
  OptionType,
  ExperienceRecommendation,
  GeneratorMeta,
  SchemaSource,
  Schema,
  Attribute
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
  chartjsApiOption
} from "./configuration-properties";
import { syntaxHighlighting } from "./documentation";
import { ATTRIBUTE_ADDON_PRIMARY_KEY } from "../../attribute-addon";
import { DataPreviewLayoutVariant } from "../../DataPreview";

// // // //

export const ComponentBuilderConfigurationGroupProperty: ConfigurationGroupProperty = {
  label: "Component",
  identifier: "components",
  description: "Define the component data",
  documentation: "",
  type: OptionType.COLLECTION,
  defaultValue: [],
  icon:
    "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
  enabled: true,
  required: false,
  allowDisable: false,
  dropdownOptions: [],
  filters: [],
  validations: [],
  dataPreview: {
    rules: [],
    variant: DataPreviewLayoutVariant.CODE_DARK
  },
  properties: [
    {
      label: "Component Name",
      identifier: "componentName",
      description: "Name of the component",
      documentation: "",
      type: OptionType.STRING,
      defaultValue: "",
      icon: "",
      enabled: true,
      required: false,
      allowDisable: false,
      properties: [],
      dropdownOptions: [],
      filters: [],
      validations: [],
      dataPreview: {
        rules: [],
        variant: DataPreviewLayoutVariant.CODE_DARK
      }
    },
    {
      label: "Component Slug",
      identifier: "componentSlug",
      description: "Slug of the component",
      documentation: "",
      type: OptionType.STRING,
      defaultValue: "",
      icon: "",
      enabled: true,
      required: false,
      allowDisable: false,
      properties: [],
      dropdownOptions: [],
      filters: [],
      validations: [],
      dataPreview: {
        rules: [],
        variant: DataPreviewLayoutVariant.CODE_DARK
      }
    },
    {
      label: "Props",
      identifier: "props",
      description: "",
      documentation: "",
      dropdownOptions: [],
      type: OptionType.COLLECTION,
      defaultValue: "",
      icon: "",
      enabled: true,
      required: false,
      allowDisable: false,
      filters: [],
      validations: [],
      dataPreview: {
        rules: [],
        variant: DataPreviewLayoutVariant.CODE_DARK
      },
      properties: [
        {
          label: "Type",
          identifier: "type",
          description: "",
          documentation: "",
          type: OptionType.DROPDOWN,
          defaultValue: "",
          icon: "",
          enabled: true,
          required: false,
          allowDisable: false,
          dropdownOptions: [{ label: "String", value: "string" }],
          properties: [],
          filters: [],
          validations: [],
          dataPreview: {
            rules: [],
            variant: DataPreviewLayoutVariant.CODE_DARK
          }
        },
        {
          label: "Name",
          identifier: "name",
          description: "",
          documentation: "",
          type: OptionType.STRING,
          defaultValue: "",
          icon: "",
          enabled: true,
          required: false,
          allowDisable: false,
          dropdownOptions: [],
          properties: [],
          filters: [],
          validations: [],
          dataPreview: {
            rules: [],
            variant: DataPreviewLayoutVariant.CODE_DARK
          }
        },
        {
          label: "Desc",
          identifier: "desc",
          description: "",
          documentation: "",
          type: OptionType.STRING,
          defaultValue: "",
          icon: "",
          enabled: true,
          required: false,
          allowDisable: false,
          dropdownOptions: [],
          properties: [],
          filters: [],
          validations: [],
          dataPreview: {
            rules: [],
            variant: DataPreviewLayoutVariant.CODE_DARK
          }
        }
      ]
    },
    {
      label: "Tests",
      identifier: "tests",
      description: "",
      documentation: "",
      type: OptionType.INSTANCE,
      defaultValue: "",
      icon: "",
      enabled: true,
      required: false,
      allowDisable: true,
      dropdownOptions: [],
      filters: [],
      validations: [],
      properties: [
        {
          label: "Test Type",
          identifier: "testType",
          description: "",
          documentation: "",
          type: OptionType.DROPDOWN,
          defaultValue: "",
          icon: "",
          enabled: true,
          required: false,
          allowDisable: false,
          dropdownOptions: [
            { value: "table", label: "Table Test" },
            { value: "snapshot", label: "Snapshot Test" }
          ],
          properties: [],
          filters: [],
          validations: [],
          dataPreview: {
            rules: [],
            variant: DataPreviewLayoutVariant.CODE_DARK
          }
        }
      ],
      dataPreview: {
        rules: [],
        variant: DataPreviewLayoutVariant.CODE_DARK
      }
    }
  ]
};

export const ComponentBuilderConfigurationGroupPropertySingleText: ConfigurationGroupProperty = {
  label: "Component Name",
  identifier: "componentName",
  description: "Name of the component",
  documentation: "",
  type: OptionType.STRING,
  defaultValue: "",
  icon: "",
  enabled: true,
  required: false,
  allowDisable: false,
  properties: [],
  dropdownOptions: [],
  filters: [],
  validations: [],
  dataPreview: {
    rules: [],
    variant: DataPreviewLayoutVariant.CODE_DARK
  }
};

export const ComponentBuilderConfigurationGroupPropertySingleDropdown: ConfigurationGroupProperty = {
  label: "Dropdown Test",
  identifier: "dropdownTest",
  description: "Dropdown Testing",
  documentation: "",
  type: OptionType.DROPDOWN,
  defaultValue: "",
  icon:
    "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
  enabled: true,
  required: false,
  allowDisable: false,
  properties: [],
  filters: [],
  validations: [],
  dropdownOptions: [
    {
      value: "OPTION_01",
      label: "One"
    },
    { value: "OPTION_02", label: "Two" }
  ],
  dataPreview: {
    rules: [],
    variant: DataPreviewLayoutVariant.CODE_DARK
  }
};

export const ComponentBuilderConfigurationGroupPropertySingleNumber: ConfigurationGroupProperty = {
  label: "Number Test",
  identifier: "numberTest",
  description:
    "This is a number for testing. Don't overthink it. It's just a number. I'll should pull some configuration options from an existing generator to populate this placeholder.",
  documentation: "",
  type: OptionType.NUMBER,
  defaultValue: "",
  icon: "",
  enabled: true,
  required: false,
  allowDisable: false,
  properties: [],
  dropdownOptions: [],
  filters: [],
  validations: [],
  dataPreview: {
    rules: [],
    variant: DataPreviewLayoutVariant.CODE_DARK
  }
};

export const ComponentBuilderConfigurationGroupPropertyWithInstance01: ConfigurationGroupProperty = {
  label: "RandomInstanceTest",
  identifier: "random_instance",
  description: "",
  documentation: "",
  type: OptionType.INSTANCE,
  defaultValue: "",
  icon: "",
  enabled: true,
  required: false,
  allowDisable: true,
  filters: [],
  validations: [],
  dropdownOptions: [],
  properties: [ComponentBuilderConfigurationGroupPropertySingleDropdown],
  dataPreview: {
    rules: [],
    variant: DataPreviewLayoutVariant.CODE_DARK
  }
};

export const ComponentBuilderConfigurationGroupPropertyWithInstance: ConfigurationGroupProperty = {
  label: "Tests",
  identifier: "tests",
  description: "",
  documentation: "",
  type: OptionType.INSTANCE,
  defaultValue: "",
  icon:
    "https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png",
  enabled: true,
  required: false,
  allowDisable: true,
  dropdownOptions: [],
  filters: [],
  validations: [],
  dataPreview: {
    rules: [],
    variant: DataPreviewLayoutVariant.CODE_DARK
  },
  properties: [
    ComponentBuilderConfigurationGroupPropertySingleDropdown,
    ComponentBuilderConfigurationGroupPropertySingleText,
    {
      label: "Nested Instance",
      identifier: "nested_instance",
      description: "",
      documentation: "",
      type: OptionType.INSTANCE,
      defaultValue: "",
      icon: "",
      enabled: true,
      required: false,
      allowDisable: true,
      dropdownOptions: [],
      filters: [],
      validations: [],
      dataPreview: {
        rules: [],
        variant: DataPreviewLayoutVariant.CODE_DARK
      },
      properties: [
        ComponentBuilderConfigurationGroupPropertySingleText,
        ComponentBuilderConfigurationGroupPropertySingleDropdown,
        ComponentBuilderConfigurationGroupPropertyWithInstance01
      ]
    }
  ]
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
  layoutVariant: GroupLayoutVariant.TABS,
  sections: [],
  properties: [
    ComponentBuilderConfigurationGroupPropertySingleText,
    ComponentBuilderConfigurationGroupPropertySingleNumber,
    ComponentBuilderConfigurationGroupPropertySingleDropdown,
    ComponentBuilderConfigurationGroupPropertyWithInstance
    // ComponentBuilderConfigurationGroupProperty,
  ]
};

// // // //

export const LambdaBuilderNameProperty: ConfigurationGroupProperty = {
  label: "Lambda Name",
  identifier: "lambdaName",
  description: "How the Lambda function will be namd in the AWS dashboard",
  documentation: "",
  type: OptionType.STRING,
  defaultValue: "",
  icon: "",
  enabled: true,
  required: false,
  allowDisable: false,
  properties: [],
  dropdownOptions: [],
  filters: [],
  validations: [],
  dataPreview: {
    rules: [],
    variant: DataPreviewLayoutVariant.CODE_DARK
  }
};

export const LambdaLanguageProperty: ConfigurationGroupProperty = {
  label: "Language",
  identifier: "language",
  description: "The programming language used to build the Lambda",
  documentation: "",
  type: OptionType.DROPDOWN,
  defaultValue: "",
  icon: "",
  enabled: true,
  required: false,
  allowDisable: false,
  properties: [],
  filters: [],
  validations: [],
  dataPreview: {
    rules: [],
    variant: DataPreviewLayoutVariant.CODE_DARK
  },
  dropdownOptions: [
    {
      label: "TypeScript",
      value: "typescript"
    },
    {
      label: "JavaScript",
      value: "javascrtip"
    }
  ]
};

export const LambdaBuilderConfigurationGroup: ConfigurationGroup = {
  label: "Lambda Builder",
  identifier: "lambda_builder",
  description: "Generate AWS Lambdas",
  documentation: syntaxHighlighting,
  enabled: true,
  allowDisable: false,
  layoutVariant: GroupLayoutVariant.LIST,
  sections: [],
  properties: [
    {
      label: "Lambdas",
      identifier: "lambda_collection",
      description: "",
      documentation: "",
      type: OptionType.COLLECTION,
      defaultValue: [],
      icon: "",
      enabled: true,
      required: false,
      allowDisable: true,
      dropdownOptions: [],
      filters: [],
      validations: [],
      properties: [LambdaBuilderNameProperty, LambdaLanguageProperty],
      dataPreview: {
        rules: [],
        variant: DataPreviewLayoutVariant.CODE_DARK
      }
    }
  ]
};

// // // //

export const ApiExamplesConfigurationGroup: ConfigurationGroup = {
  label: "API Examples",
  identifier: "api_examples",
  description: "Configurate API examples for the Application",
  documentation: syntaxHighlighting,
  enabled: true,
  allowDisable: false,
  layoutVariant: GroupLayoutVariant.LIST,
  sections: [],
  properties: [twitterApiOption]
};

export const SideBySideConfigurationGroup: ConfigurationGroup = {
  ...ComponentBuilderConfigurationGroup,
  label: "Architecture Configuration",
  identifier: "component_builder_side_by_side",
  layoutVariant: GroupLayoutVariant.DOCS_4x8,
  description: "Configure the server architecture of your application",
  documentation: syntaxHighlighting,
  properties: [twitterApiOption]
};

// // // // // // //
// GeneratorMeta

export const cdkGeneratorMeta: GeneratorMeta = {
  id: "aws_cdk_starter", // unique ID for the generator
  label: "AWS CDK Starter", // short label for the generator
  description: "A Codotype Generator for AWS CDK", // brief description of the generator
  documentation: "",
  icon:
    "https://res.cloudinary.com/codotype/image/upload/v1553197653/tech-logos/nodejs.png", // URL to the generator's icon. Must be at least 200x200px
  homepage: "https://codotype.org", // the "homepage" for this generator
  version: "0.1.0", // the current version of the generator
  codotypeVersion: "0.1.0",
  createdBy: {
    name: "Codotype",
    contact: {
      website: "https://codotype.io"
    }
  },
  techTags: ["AWS", "React", "TypeScript", "CDK", "Lambda", "DynamoDB", "S3"], // an array of strings describing the tech used in the generator
  typeTags: ["Full-stack", "Infrastructure"], // describes the type of codebase produced by this generator
  experience: ExperienceRecommendation.BEGINNER, // an optional tag detailing the level of experience required to use the code produced by the generator
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
    enableAttributeDefaultValue: false
  },
  configurationGroups: [
    LambdaBuilderConfigurationGroup,
    {
      ...ComponentBuilderConfigurationGroup,
      label: "API Examples",
      identifier: "api_examples",
      properties: [twitterApiOption]
    },
    ComponentBuilderConfigurationGroup,
    SideBySideConfigurationGroup
  ], // an array of OptionGroup objects that expose additional configuration provided by the generator
  exampleProjects: []
};

// // // //
// Schemas
export const userSchema: Schema = {
  id: "12345",
  identifiers: {
    singular: {
      label: "User",
      snake: "user",
      camel: "user",
      pascal: "User",
      kebab: "user"
    },
    plural: {
      label: "Users",
      snake: "users",
      camel: "users",
      pascal: "Users",
      kebab: "users"
    }
  },
  attributes: [],
  relations: [],
  locked: false,
  removable: false,
  source: SchemaSource.USER,
  configuration: {}
};

export const emailAttribute: Attribute = {
  id: "email-attr",
  datatype: Datatype.STRING,
  defaultValue: null,
  identifiers: {
    label: "Email",
    snake: "email",
    camel: "email",
    pascal: "Email",
    kebab: "email"
  },
  internalNote: "the email of the user",
  locked: false,
  source: SchemaSource.USER,
  addons: {
    required: true
  }
};

export const movieSchema: Schema = {
  id: "45678",
  identifiers: {
    singular: {
      label: "Movie",
      snake: "movie",
      camel: "movie",
      pascal: "Movie",
      kebab: "movie"
    },
    plural: {
      label: "Movies",
      snake: "movies",
      camel: "movies",
      pascal: "Movies",
      kebab: "movies"
    }
  },
  attributes: [
    {
      id: "name-attr",
      datatype: Datatype.STRING,
      defaultValue: null,
      identifiers: {
        label: "Name",
        snake: "name",
        camel: "name",
        pascal: "Name",
        kebab: "name"
      },
      internalNote: "the name of the user",
      locked: false,
      source: SchemaSource.USER,
      addons: {
        required: true
      }
    },
    {
      ...emailAttribute
    }
  ],
  relations: [
    {
      id: "relation-example-01",
      type: RelationType.BELONGS_TO,
      required: false,
      destinationSchemaId: userSchema.id,
      source: SchemaSource.USER,
      sourceSchemaAlias: "Directed Movie",
      destinationSchemaAlias: "Director"
    }
  ],
  locked: false,
  removable: false,
  source: SchemaSource.USER,
  configuration: {}
};

// // // // // //

export const dummyGeneratorMeta: GeneratorMeta = {
  id: "chrome_extension_generator", // unique ID for the generator
  label: "Chrome Extension Generator", // short label for the generator
  description: "A Codotype Generator", // brief description of the generator
  documentation: "A Codotype Generator", // Detailed description of the generator
  icon:
    "https://res.cloudinary.com/codotype/image/upload/v1553197653/tech-logos/nodejs.png", // URL to the generator's icon. Must be at least 200x200px
  homepage: "https://codotype.org", // the "homepage" for this generator
  version: "0.1.0", // the current version of the generator
  codotypeVersion: "0.1.0",
  createdBy: {
    name: "Codotype",
    contact: {}
  },
  techTags: ["React", "TypeScript", "Bootstrap"], // an array of strings describing the tech used in the generator
  typeTags: ["Chrome Extension", "Infrastructure"], // describes the type of codebase produced by this generator
  experience: ExperienceRecommendation.BEGINNER, // an optional tag detailing the level of experience required to use the code produced by the generator
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
      Datatype.TIMESTAMP
    ], // The datatypes supported by this generator.Only an array of DATATYPE_ * identifiers that correspond to values defined in @codotype/core are accepted.
    supportedRelations: [RelationType.TO_ONE, RelationType.TO_MANY], // The relation types supported by this generator.Only an array of RELATION_TYPE_ * identifiers that correspond to values defined in @codotype/core are accepted.
    defaultAttributes: [
      {
        id: "UUID-Attribute",
        identifiers: {
          label: "ID",
          snake: "id",
          camel: "id",
          pascal: "Id",
          kebab: "id"
        },
        addons: {
          [ATTRIBUTE_ADDON_PRIMARY_KEY.identifier]: true
        },
        datatype: Datatype.UUID,
        locked: true,
        source: SchemaSource.GENERATOR,
        internalNote: "",
        defaultValue: null
      }
    ],
    defaultRelations: [],
    attributeAddons: [],
    enableAttributeDefaultValue: true
  },
  configurationGroups: [
    {
      ...ComponentBuilderConfigurationGroup,
      label: "API Examples",
      identifier: "api_examples",
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
        chartjsApiOption
      ]
    },
    {
      ...ComponentBuilderConfigurationGroup,
      label: "Architecture Configuration",
      identifier: "component_builder_side_by_side",
      layoutVariant: GroupLayoutVariant.DOCS_6x6,
      description: "Configure the server architecture of your application",
      documentation: syntaxHighlighting,
      properties: [twitterApiOption]
    },
    ComponentBuilderConfigurationGroup
  ] // an array of OptionGroup objects that expose additional configuration provided by the generator
};
