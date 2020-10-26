import { ConfigurationGroupPropertyBuilder } from "./factories/ConfigurationGroupProperty";
import { SchemaBuilder } from "./factories/Schema";
import { ConfigurationGroupBuilder } from "./factories/ConfigurationGroup";
import { ConfigurationGroupSectionBuilder } from "./factories/ConfigurationGroupSection";
import { SchemaEditorBuilder } from "./factories/SchemaEditor";
import { RelationBuilder } from "./factories/Relation";
import { AttributeBuilder } from "./factories/Attribute";

// // // //

export interface CodotypeFactory {
    ConfigurationGroup: typeof ConfigurationGroupBuilder;
    ConfigurationGroupSection: typeof ConfigurationGroupSectionBuilder;
    ConfigurationGroupProperty: typeof ConfigurationGroupPropertyBuilder;
    Attribute: typeof AttributeBuilder;
    Relation: typeof RelationBuilder;
    Schema: typeof SchemaBuilder;
    SchemaEditor: typeof SchemaEditorBuilder;
    // Generator: typeof GeneratorBuilder; // TODO - add GeneratorBuilder
    // Plugin: typeof PluginBuilder; // TODO - add PluginBuilder
}

// TODO - abstract into @codotype/primatives
export const Codotype: CodotypeFactory = {
    ConfigurationGroup: ConfigurationGroupBuilder,
    ConfigurationGroupSection: ConfigurationGroupSectionBuilder,
    ConfigurationGroupProperty: ConfigurationGroupPropertyBuilder,
    Attribute: AttributeBuilder,
    Relation: RelationBuilder,
    Schema: SchemaBuilder,
    SchemaEditor: SchemaEditorBuilder,
};
