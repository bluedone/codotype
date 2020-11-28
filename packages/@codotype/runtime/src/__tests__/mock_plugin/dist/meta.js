"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicConfigurationGroup = void 0;
const types_1 = require("@codotype/core");
// // // //
const BASE_CONFIGURATION_GROUP_PROPERTY = {
    identifier: "BASE_PROPERTY",
    content: {
        label: "BASE_PROPERTY",
        description: "",
        documentation: "",
        icon: "",
    },
    type: types_1.PropertyTypes.STRING,
    layoutVariant: types_1.PropertyLayoutVariants.HIDDEN,
    defaultValue: false,
    enabled: true,
    required: false,
    allowDisable: false,
    properties: [],
    dropdownOptions: [],
    filters: [],
    validations: [],
};
const BASE_CONFIGURATION_GROUP = {
    content: {
        label: "BASE_CONFIGURATION_GROUP",
        description: "BASE_CONFIGURATION_GROUP DESC.",
        documentation: "",
        icon: "",
    },
    identifier: "base_configuration_group",
    enabled: true,
    allowDisable: false,
    layoutVariant: types_1.GroupLayoutVariants.TABS,
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
        type: types_1.PropertyTypes.STRING,
        defaultValue: "",
    },
);
const NumberProperty = Object.assign(
    Object.assign({}, BASE_CONFIGURATION_GROUP_PROPERTY),
    {
        label: "Number",
        identifier: "number",
        description: "Standard Number input",
        type: types_1.PropertyTypes.NUMBER,
        defaultValue: "",
    },
);
const BooleanProperty = Object.assign(
    Object.assign({}, BASE_CONFIGURATION_GROUP_PROPERTY),
    {
        label: "Boolean",
        identifier: "boolean",
        description: "Standard Boolean input",
        type: types_1.PropertyTypes.BOOLEAN,
        defaultValue: false,
    },
);
const DropdownProperty = Object.assign(
    Object.assign({}, BASE_CONFIGURATION_GROUP_PROPERTY),
    {
        label: "Dropdown",
        identifier: "dropdown",
        description: "Standard Dropdown input",
        type: types_1.PropertyTypes.DROPDOWN,
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
    homepage: "https://github.com/codotype/codotype",
    codotypeVersion: "0.8.0",
    experience: types_1.ExperienceRecommendations.BEGINNER,
    createdBy: {
        name: "Alexander Schwartzberg",
        contact: {
            github: "https://github.com/aeksco",
            twitter: "https://twitter.com/aeksco",
        },
    },
    content: {
        label: "Full Stack Typescript Generator",
        documentation: "",
        icon:
            "https://res.cloudinary.com/codotype/image/upload/v1560045005/tech-logos/codotype.png",
        description:
            "Generate full-stack web applications with Typescript, React, Express, SQL, and TypeORM.",
    },
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
                datatype: types_1.Datatypes.UUID,
                identifiers: {
                    label: "ID",
                    snake: "id",
                    camel: "id",
                    pascal: "id",
                    kebab: "id",
                },
                defaultValue: "",
                internalNote: "",
                source: types_1.CreatedByValues.plugin,
                locked: true,
                addons: {},
            },
        ],
        defaultRelations: [],
        configurationGroups: [],
        supportedDatatypes: [
            types_1.Datatypes.STRING,
            types_1.Datatypes.NUMERIC,
            types_1.Datatypes.BOOLEAN,
            types_1.Datatypes.DATE,
        ],
        supportedRelations: [types_1.RelationTypes.TO_ONE],
    },
    configurationGroups: [exports.BasicConfigurationGroup],
};
// // // //
exports.default = FullStackTypescriptGenerator;
//# sourceMappingURL=meta.js.map
