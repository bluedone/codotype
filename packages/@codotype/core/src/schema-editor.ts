import { ConfigurationGroup } from "./configuration-option-types";
import { Datatype } from "./datatype";
import { RelationTypes, RelationInput } from "./relation";
import { SchemaInput } from "./schema";
import { Attribute } from "./attribute";
import { AttributeAddon, RelationAddon } from "./schema-editor-addon";

// // // //

// TODO - split up into better separation of concerns
// i.e. AttributeEditorConfiguration, SchemaEditorConfiguration, RelationEditorConfiguration
export interface SchemaEditorConfiguration {
    documentation: string; // Any documentation for the SchemaEditor
    configurationGroups: ConfigurationGroup[]; // ConfigurationGroups scoped to each schema
    defaultSchemas: SchemaInput[]; // The default schemas included in a new project
    defaultRelations: RelationInput[]; // The default relations included in a new project
    supportedDatatypes: Datatype[]; // The datatypes supported by this generator
    supportedRelations: RelationTypes[]; // The relation types supported by this generator
    defaultAttributes: Attribute[]; // Default attributes applied to _every_ new Attribute - QUESTION - how do we enforce Addon value for any Attributes defined here?
    attributeAddons: AttributeAddon[]; // Addons made available to the AttributeEditor
    enableAttributeDefaultValue: boolean; // Whether or not to enable the `Default Value` input in the AttributeEditor
    // TODO - add RelationAddon here
}
