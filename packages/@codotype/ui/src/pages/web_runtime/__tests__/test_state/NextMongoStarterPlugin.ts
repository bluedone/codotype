import { pluginReadme } from "../../../../components/MarkdownRenderer/__tests__/test_state";
import {
    PluginMetadata,
    PropertyTypes,
    Primitives,
    ConfigurationGroup,
    buildDefaultConfiguration,
} from "@codotype/core";
import {
    SchemaEditorConfiguration,
    RelationTypes,
    Datatypes,
    GroupLayoutVariants,
    PropertyLayoutVariants,
    CreatedByValues,
    buildTokenPluralization,
    ProjectInput,
    buildTokenCasing,
} from "@codotype/core";
import { ATTRIBUTE_ADDON_UNIQUE, relationAddons } from "./Addons";
import { NextJsWebsiteStarterPluginVariant } from "./NextJsWebsiteStarterPlugin";

// // // //
// Example Project

const userDataModel = new Primitives.Schema({
    identifiers: buildTokenPluralization("User"),
    attributes: [
        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("_id"),
            datatype: Datatypes.STRING,
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

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Employee Id"),
            datatype: Datatypes.STRING,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Past Employee"),
            datatype: Datatypes.BOOLEAN,
        }),
    ],
});

const lockerTypeDataModel = new Primitives.Schema({
    identifiers: buildTokenPluralization("Locker Type"),
    attributes: [
        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("_id"),
            datatype: Datatypes.OBJECT_ID,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Label"),
            datatype: Datatypes.STRING,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Description"),
            datatype: Datatypes.STRING,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Price"),
            datatype: Datatypes.FLOAT,
        }),
    ],
});

const lockerDataModel = new Primitives.Schema({
    identifiers: buildTokenPluralization("Locker"),
    attributes: [
        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("_id"),
            datatype: Datatypes.OBJECT_ID,
        }),
    ],
});

const lockerRentalDataModel = new Primitives.Schema({
    identifiers: buildTokenPluralization("Locker Rental"),
    attributes: [
        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("_id"),
            datatype: Datatypes.OBJECT_ID,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Active"),
            datatype: Datatypes.BOOLEAN,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Rental Start"),
            datatype: Datatypes.TIMESTAMP,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Rental End"),
            datatype: Datatypes.TIMESTAMP,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Rebate"),
            datatype: Datatypes.FLOAT,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Subtotal"),
            datatype: Datatypes.FLOAT,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Taxes"),
            datatype: Datatypes.FLOAT,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Fees"),
            datatype: Datatypes.FLOAT,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Total"),
            datatype: Datatypes.FLOAT,
        }),
    ],
});

const stationDataModel = new Primitives.Schema({
    identifiers: buildTokenPluralization("Station"),
    attributes: [
        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("_id"),
            datatype: Datatypes.OBJECT_ID,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Name"),
            datatype: Datatypes.STRING,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Address One"),
            datatype: Datatypes.STRING,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Address Two"),
            datatype: Datatypes.STRING,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("City"),
            datatype: Datatypes.STRING,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("State"),
            datatype: Datatypes.STRING,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Zipcode"),
            datatype: Datatypes.INT,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Wheelchair Accessible"),
            datatype: Datatypes.BOOLEAN,
        }),
    ],
});

const promotionDataModel = new Primitives.Schema({
    identifiers: buildTokenPluralization("Promotion"),
    attributes: [
        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("_id"),
            datatype: Datatypes.OBJECT_ID,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Name"),
            datatype: Datatypes.STRING,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Description"),
            datatype: Datatypes.STRING,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Rental Savings Percent"),
            datatype: Datatypes.FLOAT,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Start Date"),
            datatype: Datatypes.TIMESTAMP,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("End Date"),
            datatype: Datatypes.TIMESTAMP,
        }),

        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("Archived"),
            datatype: Datatypes.BOOLEAN,
        }),
    ],
});

const customerDataModel = new Primitives.Schema({
    identifiers: buildTokenPluralization("Customer"),
    attributes: [
        new Primitives.AttributeInput({
            identifiers: buildTokenCasing("_id"),
            datatype: Datatypes.OBJECT_ID,
        }),
    ],
});

const busStationLockerRentalsProject: ProjectInput = {
    id: "",
    pluginID: "next-mongo-starter",
    pluginVersion: "0.0.1",
    identifiers: buildTokenCasing("Bus Station Locker Rentals"),
    configuration: buildDefaultConfiguration([
        NextJsWebsiteStarterPluginVariant.configurationGroups[0],
    ]),
    schemas: [
        userDataModel,
        lockerTypeDataModel,
        lockerDataModel,
        lockerRentalDataModel,
        stationDataModel,
        promotionDataModel,
        customerDataModel,
    ],
    relations: [
        new Primitives.Relation({
            sourceSchemaID: lockerRentalDataModel.id,
            destinationSchemaID: lockerDataModel.id,
            sourceSchemaAlias: "",
            destinationSchemaAlias: "",
            type: RelationTypes.TO_ONE,
        }),

        new Primitives.Relation({
            sourceSchemaID: lockerRentalDataModel.id,
            destinationSchemaID: customerDataModel.id,
            sourceSchemaAlias: "",
            destinationSchemaAlias: "",
            type: RelationTypes.TO_ONE,
        }),

        new Primitives.Relation({
            sourceSchemaID: lockerRentalDataModel.id,
            destinationSchemaID: userDataModel.id,
            sourceSchemaAlias: "",
            destinationSchemaAlias: "Sales Representative",
            type: RelationTypes.TO_ONE,
        }),

        new Primitives.Relation({
            sourceSchemaID: lockerDataModel.id,
            destinationSchemaID: lockerTypeDataModel.id,
            sourceSchemaAlias: "",
            destinationSchemaAlias: "",
            type: RelationTypes.TO_ONE,
        }),

        new Primitives.Relation({
            sourceSchemaID: promotionDataModel.id,
            destinationSchemaID: lockerTypeDataModel.id,
            sourceSchemaAlias: "",
            destinationSchemaAlias: "",
            type: RelationTypes.TO_ONE,
        }),

        new Primitives.Relation({
            sourceSchemaID: lockerDataModel.id,
            destinationSchemaID: stationDataModel.id,
            sourceSchemaAlias: "",
            destinationSchemaAlias: "",
            type: RelationTypes.TO_ONE,
        }),

        new Primitives.Relation({
            sourceSchemaID: userDataModel.id,
            destinationSchemaID: stationDataModel.id,
            sourceSchemaAlias: "",
            destinationSchemaAlias: "",
            type: RelationTypes.TO_ONE,
        }),
    ],
};
// // // //
// Next.js + MongoDB Starter Plugin

export const SchemaEditor: SchemaEditorConfiguration = {
    supportedRelationTypes: [RelationTypes.TO_ONE, RelationTypes.TO_MANY],
    supportedDatatypes: [
        Datatypes.STRING,
        Datatypes.INT,
        Datatypes.BOOLEAN,
        Datatypes.FLOAT,
        Datatypes.DATE,
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
const hostingConfigurationGroup: ConfigurationGroup = new Primitives.ConfigurationGroup(
    {
        identifier: "hosting",
        content: {
            label: "Hosting",
            description: "Configure the hosting of your Next.js app",
            icon: "",
            documentation: "",
        },
        properties: [
            new Primitives.ConfigurationProperty({
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

export const NextMongoStarter: PluginMetadata = new Primitives.Plugin({
    identifier: "next-mongo-starter",
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
    exampleProjects: [busStationLockerRentalsProject],
    schemaEditorConfiguration: SchemaEditor,
});
