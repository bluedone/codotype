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
    supportedRelationTypes: [RelationTypes.TO_ONE, RelationTypes.TO_MANY],
    supportedDatatypes: [
        Datatypes.STRING,
        Datatypes.INT,
        Datatypes.FLOAT,
        Datatypes.TIMESTAMP,
        // Datatypes.STRING_ARRAY,
        // Datatypes.NUMERIC_ARRAY,
        // Datatypes.OBJECT,
    ],
    configurationGroups: [],
    attributeAddons: [],
    relationAddons: [...relationAddons],
    newSchemaDefaults: {
        relations: [],
        attributes: [
            {
                id: "ObjectID-Attribute",
                identifiers: {
                    title: "_id",
                    snake: "_id",
                    camel: "_id",
                    pascal: "_id",
                    kebab: "_id",
                },
                addons: {
                    // [ATTRIBUTE_ADDON_PRIMARY_KEY.identifier]: true,
                },
                datatype: Datatypes.OBJECT_ID,
                locked: true,
                createdBy: CreatedByValues.plugin,
                internalNote: "The MongoDB ObjectID",
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
                    id: "ObjectID-Attribute",
                    identifiers: {
                        title: "_id",
                        snake: "_id",
                        camel: "_id",
                        pascal: "_id",
                        kebab: "_id",
                    },
                    addons: {},
                    datatype: Datatypes.STRING,
                    locked: true,
                    createdBy: CreatedByValues.plugin,
                    internalNote: "The MongoDB ObjectID of the user",
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
                    addons: {},
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
