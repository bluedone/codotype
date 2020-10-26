"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicConfigurationGroup = void 0;
const types_1 = require("@codotype/core");
// // // //
const BASE_CONFIGURATION_GROUP_PROPERTY = {
    label: "BASE_PROPERTY",
    identifier: "BASE_PROPERTY",
    type: types_1.OptionType.STRING,
    description: "",
    documentation: "",
    layoutVariant: types_1.PropertyLayoutVariant.HIDDEN,
    defaultValue: false,
    icon: "",
    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    filters: [],
    validations: [],
};
const BASE_CONFIGURATION_GROUP = {
    label: "BASE_CONFIGURATION_GROUP",
    identifier: "base_configuration_group",
    description: "BASE_CONFIGURATION_GROUP DESC.",
    documentation: "",
    enabled: true,
    allowDisable: false,
    layoutVariant: types_1.GroupLayoutVariant.TABS,
    sections: [],
    properties: [],
};
// // // //
// Basic Configuration Group
const StringProperty = Object.assign(
    Object.assign({}, BASE_CONFIGURATION_GROUP_PROPERTY),
    {
        label: "String",
        identifier: "string",
        description: "Standard string input",
        type: types_1.OptionType.STRING,
        defaultValue: "",
    },
);
const NumberProperty = Object.assign(
    Object.assign({}, BASE_CONFIGURATION_GROUP_PROPERTY),
    {
        label: "Number",
        identifier: "number",
        description: "Standard Number input",
        type: types_1.OptionType.NUMBER,
        defaultValue: "",
    },
);
const BooleanProperty = Object.assign(
    Object.assign({}, BASE_CONFIGURATION_GROUP_PROPERTY),
    {
        label: "Boolean",
        identifier: "boolean",
        description: "Standard Boolean input",
        type: types_1.OptionType.BOOLEAN,
        defaultValue: false,
    },
);
const DropdownProperty = Object.assign(
    Object.assign({}, BASE_CONFIGURATION_GROUP_PROPERTY),
    {
        label: "Dropdown",
        identifier: "dropdown",
        description: "Standard Dropdown input",
        type: types_1.OptionType.DROPDOWN,
        defaultValue: "one",
        dropdownOptions: [
            { value: "one", label: "Option One" },
            { value: "two", label: "Option Two" },
            { value: "three", label: "Option Three" },
        ],
    },
);
exports.BasicConfigurationGroup = Object.assign(
    Object.assign({}, BASE_CONFIGURATION_GROUP),
    {
        label: "Basic Configuration Group",
        identifier: "basic",
        description: "Basic Configuration Group",
        documentation: "",
        properties: [
            StringProperty,
            NumberProperty,
            BooleanProperty,
            DropdownProperty,
        ],
    },
);
// // // //
const FullStackTypescriptGenerator = {
    id: "full-stack-typescript-generator",
    label: "Full Stack Typescript Generator",
    homepage: "https://github.com/codotype/codotype",
    codotypeVersion: "0.8.0",
    experience: types_1.ExperienceRecommendation.BEGINNER,
    documentation: "",
    createdBy: {
        name: "Alexander Schwartzberg",
        contact: {
            github: "https://github.com/aeksco",
            twitter: "https://twitter.com/aeksco",
        },
    },
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1560045005/tech-logos/codotype.png",
    description:
        "Generate full-stack web applications with Typescript, React, Express, SQL, and TypeORM.",
    techTags: ["TypeScript", "Node", "TypeOrm", "React"],
    typeTags: ["Full-Stack", "Web Application"],
    project_path: "full_stack_typescript_generator",
    version: "0.1.0",
    schemaEditorConfiguration: {
        enableAttributeDefaultValue: true,
        documentation: "",
        defaultSchemas: [],
        attributeAddons: [],
        defaultAttributes: [
            {
                id: "ID-ATTRIBUTE",
                datatype: types_1.Datatype.UUID,
                identifiers: {
                    label: "ID",
                    snake: "id",
                    camel: "id",
                    pascal: "id",
                    kebab: "id",
                },
                defaultValue: "",
                internalNote: "",
                source: types_1.SchemaCreators.plugin,
                locked: true,
                addons: {},
            },
        ],
        defaultRelations: [],
        configurationGroups: [],
        supportedDatatypes: [
            types_1.Datatype.STRING,
            types_1.Datatype.NUMERIC,
            types_1.Datatype.BOOLEAN,
            types_1.Datatype.DATE,
        ],
        supportedRelations: [types_1.RelationType.TO_ONE],
    },
    configurationGroups: [exports.BasicConfigurationGroup],
};
// // // //
exports.default = FullStackTypescriptGenerator;
//# sourceMappingURL=meta.js.map
