import { SchemaEditorConfiguration } from "..";
import { Datatype } from "../datatype";
import { RelationType, Relation } from "../relation";
import { AttributeAddon } from "../attribute-addon";
import { Schema } from "../schema";
import { Attribute } from "../attribute";
import { ConfigurationGroup } from "../configuration-option-types";

interface SchemaEditorBuilderParams {
    supportedDatatypes: Datatype[];
    supportedRelations: RelationType[];
    enableAttributeDefaultValue?: boolean;
    documentation?: string;
    defaultSchemas?: Schema[];
    attributeAddons?: AttributeAddon[];
    defaultAttributes?: Attribute[];
    defaultRelations?: Relation[];
    configurationGroups?: ConfigurationGroup[];
}

export class SchemaEditorBuilder implements SchemaEditorConfiguration {
    supportedDatatypes: Datatype[];
    supportedRelations: RelationType[];

    enableAttributeDefaultValue: boolean = false;
    documentation: string = "";
    defaultSchemas: Schema[] = [];
    attributeAddons: AttributeAddon[] = [];
    defaultAttributes: Attribute[] = [];
    defaultRelations: Relation[] = [];
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
