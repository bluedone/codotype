import { ConfigurationGroup } from "./configuration-option-types";
import { Datatype } from "./datatype";
import { RelationTypes, RelationInput } from "./relation";
import { SchemaInput } from "./schema";
import { AttributeInput } from "./attribute";
import { AttributeAddon, RelationAddon } from "./schema-editor-addon";

// // // //

/**
 * SchemaEditorConfiguration
 * Defines a Plugin's configuration for the SchemaEditor React Component
 * Determines:
 * - which Datatypes + RelationTypes are available
 * - when to apply an AddonProperty to an AttributeInput or RelationInput
 * - the ConfigurationGroups scoped to each SchemaInput
 * - the behavior when creating a new SchemaInput
 * - the default
 */
export interface SchemaEditorConfiguration {
    configurationGroups: ConfigurationGroup[]; // ConfigurationGroups scoped to each schema

    // The default SchemaInput data included in a new Project
    defaultSchemas: SchemaInput[];

    // The default RelationInput data included in a new Project
    defaultRelations: RelationInput[];

    // Configures the behavior when adding a new SchemaInput to a Project
    newSchemaDefaults: {
        attributes: AttributeInput[]; // Default Attribute[] added to _every_ new SchemaInput
        relations: RelationInput[]; // Default Relation[] added to _every_ new SchemaInput
    };

    // The Datatypes + RelationTypes supported by the Plugin
    supportedDatatypes: Datatype[];
    supportedRelationTypes: RelationTypes[];

    // Addons made available to the AttributeEditor + RelationEditor
    attributeAddons: AttributeAddon[];
    relationAddons: RelationAddon[];
}
