import { SchemaEditorConfiguration } from "..";
import { Datatype } from "../datatype";
import { RelationTypes, RelationInput } from "../relation";
import { AttributeAddon, RelationAddon } from "../schema-editor-addon";
import { SchemaInput } from "../schema";
import { Attribute } from "../attribute";
import { ConfigurationGroup } from "../configuration-option-types";

// // // //

interface SchemaEditorBuilderParams {
    supportedDatatypes: Datatype[];
    supportedRelations: RelationTypes[];
    enableAttributeDefaultValue?: boolean;
    documentation?: string;
    defaultSchemas?: SchemaInput[];
    attributeAddons?: AttributeAddon[];
    defaultAttributes?: Attribute[];
    defaultRelations?: RelationInput[];
    configurationGroups?: ConfigurationGroup[];
}

export class SchemaEditorBuilder implements SchemaEditorConfiguration {
    supportedDatatypes: Datatype[];
    supportedRelations: RelationTypes[];

    enableAttributeDefaultValue: boolean = false;
    documentation: string = "";
    defaultSchemas: SchemaInput[] = [];
    attributeAddons: AttributeAddon[] = [];
    defaultAttributes: Attribute[] = [];
    defaultRelations: RelationInput[] = [];
    configurationGroups: ConfigurationGroup[] = [];

    constructor(params: SchemaEditorBuilderParams) {
        this.supportedDatatypes = params.supportedDatatypes;
        this.supportedRelations = params.supportedRelations;

        this.enableAttributeDefaultValue =
            params.enableAttributeDefaultValue !== undefined
                ? params.enableAttributeDefaultValue
                : this.enableAttributeDefaultValue;
        this.documentation = params.documentation || this.documentation;
        this.defaultSchemas = params.defaultSchemas || this.defaultSchemas;
        this.attributeAddons = params.attributeAddons || this.attributeAddons;
        this.defaultAttributes =
            params.defaultAttributes || this.defaultAttributes;
        this.defaultRelations =
            params.defaultRelations || this.defaultRelations;
        this.configurationGroups =
            params.configurationGroups || this.configurationGroups;
    }
}
