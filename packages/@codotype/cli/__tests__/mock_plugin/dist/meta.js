"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@codotype/core");
// // // //
const BASE_CONFIGURATION_GROUP_PROPERTY = new core_1.Primatives.ConfigurationProperty(
    {
        identifier: "BASE_PROPERTY",
        content: {
            icon: "",
            label: "BASE_PROPERTY",
            description: "",
            documentation: "",
        },
        type: core_1.PropertyTypes.STRING,
        layoutVariant: core_1.PropertyLayoutVariants.CARD_COL_12,
        defaultValue: false,
        // enabled: true,
        required: false,
        allowDisable: false,
        properties: [],
        dropdownOptions: [],
        // filters: [],
        validations: [],
    },
);
const BASE_CONFIGURATION_GROUP = new core_1.Primatives.ConfigurationGroup({
    identifier: "base_configuration_group",
    content: {
        label: "BASE_CONFIGURATION_GROUP",
        description: "BASE_CONFIGURATION_GROUP DESC.",
        documentation: "",
    },
    enabled: true,
    allowDisable: false,
    layoutVariant: core_1.GroupLayoutVariants.TABS,
    sections: [],
    properties: [],
});
// // // //
// GeneratorMeta Configuration Group
const GeneratorNameProperty = Object.assign(
    Object.assign({}, BASE_CONFIGURATION_GROUP_PROPERTY),
    {
        identifier: "generatorName",
        content: Object.assign(
            Object.assign({}, BASE_CONFIGURATION_GROUP.content),
            {
                label: "Generator Name",
                description: "Name of the Generator",
                documentation: "",
            },
        ),
        type: core_1.PropertyTypes.STRING,
        defaultValue: "",
    },
);
const GeneratorIdentifierProperty = Object.assign(
    Object.assign({}, BASE_CONFIGURATION_GROUP_PROPERTY),
    {
        identifier: "generatorIdentifier",
        content: Object.assign(
            Object.assign({}, BASE_CONFIGURATION_GROUP_PROPERTY.content),
            {
                label: "Generator Identifier",
                description: "Identifier of the Generator",
                documentation: "",
            },
        ),
        type: core_1.PropertyTypes.STRING,
        defaultValue: "",
    },
);
const GeneratorDescriptionProperty = Object.assign(
    Object.assign({}, BASE_CONFIGURATION_GROUP_PROPERTY),
    {
        identifier: "generatorDescription",
        content: Object.assign(
            Object.assign({}, BASE_CONFIGURATION_GROUP_PROPERTY.content),
            {
                label: "Generator Description",
                description: "Description of the Generator",
                documentation: "",
            },
        ),
        type: core_1.PropertyTypes.STRING,
        defaultValue: "",
    },
);
const GeneratorMetaConfigurationGroup = Object.assign(
    Object.assign({}, BASE_CONFIGURATION_GROUP),
    {
        identifier: "generator_meta",
        content: {
            label: "Generator Meta",
            description: "Metadata for the Codotype Generator",
            documentation: "",
            icon: "",
        },
        properties: [
            GeneratorNameProperty,
            GeneratorIdentifierProperty,
            GeneratorDescriptionProperty,
        ],
    },
);
// // // //
// // // //
const CodotypeGeneratorStarterMeta = {
    identifier: "codotype-generator-starter-generator",
    content: {
        label: "Codotype Generator Starter",
        documentation: "",
        icon:
            "https://res.cloudinary.com/codotype/image/upload/v1560045005/tech-logos/codotype.png",
        description: "Generate a starter for a new Codotype Generator",
    },
    homepage: "https://github.com/codotype/codotype-generator-starter",
    codotypeVersion: "0.8.0",
    experience: core_1.ExperienceRecommendations.beginner,
    createdBy: {
        name: "Alexander Schwartzberg",
        contact: {
            github: "https://github.com/aeksco",
            twitter: "https://twitter.com/aeksco",
        },
    },
    exampleProjects: [],
    techTags: ["Codotype", "TypeScript"],
    typeTags: ["Codotype Generator"],
    project_path: "codotype-generator-starter",
    version: "0.1.0",
    schemaEditorConfiguration: {
        defaultSchemas: [],
        attributeAddons: [],
        defaultRelations: [],
        configurationGroups: [],
        supportedDatatypes: [],
        supportedRelationTypes: [],
        newSchemaDefaults: {
            attributes: [],
            relations: [],
        },
        relationAddons: [],
    },
    configurationGroups: [GeneratorMetaConfigurationGroup],
};
// // // //
exports.default = CodotypeGeneratorStarterMeta;
//# sourceMappingURL=meta.js.map
