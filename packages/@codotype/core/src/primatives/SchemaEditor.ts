import { AttributeInput, SchemaEditorConfiguration } from "..";
import { Datatype } from "../datatype";
import { RelationTypes, RelationInput } from "../relation";
import { AttributeAddon, RelationAddon } from "../schema-editor-addon";
import { SchemaInput } from "../schema";
import { ConfigurationGroup } from "../configuration-option-types";

// // // //

interface SchemaEditorBuilderParams {
    supportedDatatypes: Datatype[];
    supportedRelations: RelationTypes[];
    defaultSchemas?: SchemaInput[];
    attributeAddons?: AttributeAddon[];
    relationAddons?: RelationAddon[];
    defaultRelations?: RelationInput[];
    configurationGroups?: ConfigurationGroup[];
    newSchemaDefaints?: ConfigurationGroup[];
    newSchemaInputDefaults?: {
        attributes: AttributeInput[];
        relations: RelationInput[];
    };
}

const defaultSchemaInputDefaults = {
    attributes: [],
    relations: [],
};

export class SchemaEditorBuilder implements SchemaEditorConfiguration {
    supportedDatatypes: Datatype[];
    supportedRelationTypes: RelationTypes[];
    defaultSchemas: SchemaInput[] = [];
    attributeAddons: AttributeAddon[] = [];
    relationAddons: RelationAddon[] = [];
    defaultRelations: RelationInput[] = [];
    configurationGroups: ConfigurationGroup[] = [];
    newSchemaDefaults: {
        attributes: AttributeInput[];
        relations: RelationInput[];
    } = {
        ...defaultSchemaInputDefaults,
    };

    constructor(params: SchemaEditorBuilderParams) {
        this.supportedDatatypes = params.supportedDatatypes;
        this.supportedRelationTypes = params.supportedRelations;

        this.defaultSchemas = params.defaultSchemas || this.defaultSchemas;
        this.attributeAddons = params.attributeAddons || this.attributeAddons;
        this.relationAddons = params.relationAddons || this.relationAddons;
        this.defaultRelations =
            params.defaultRelations || this.defaultRelations;
        this.configurationGroups =
            params.configurationGroups || this.configurationGroups;

        if (params.newSchemaInputDefaults !== undefined) {
            this.newSchemaDefaults = {
                attributes: this.newSchemaDefaults.attributes,
                relations: this.newSchemaDefaults.relations,
            };
        }
    }
}
