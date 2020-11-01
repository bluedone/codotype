import { ConfigurationPropertyBuilder } from "./primatives/ConfigurationProperty";
import { SchemaBuilder } from "./primatives/Schema";
import { ConfigurationGroupBuilder } from "./primatives/ConfigurationGroup";
import { ConfigurationGroupSectionBuilder } from "./primatives/ConfigurationGroupSection";
import { SchemaEditorBuilder } from "./primatives/SchemaEditor";
import { RelationBuilder } from "./primatives/Relation";
import { AttributeBuilder } from "./primatives/Attribute";
import { PluginBuilder } from "./primatives/Plugin";
import { TokenCasingBuilder } from "./primatives/TokenCasing";
import { TokenPluralizationBuilder } from "./primatives/TokenPluralization";

// // // //

/**
 * CodotypePrimatives
 * Defines an interface to describe the "Primatives" singleton that exposes
 * the various constructors for the different Primative types in Codotype
 */
export interface CodotypePrimatives {
    Schema: typeof SchemaBuilder;
    Attribute: typeof AttributeBuilder;
    Relation: typeof RelationBuilder;
    Plugin: typeof PluginBuilder;
    SchemaEditor: typeof SchemaEditorBuilder;
    ConfigurationGroup: typeof ConfigurationGroupBuilder;
    ConfigurationGroupSection: typeof ConfigurationGroupSectionBuilder;
    ConfigurationProperty: typeof ConfigurationPropertyBuilder;
    TokenCasing: typeof TokenCasingBuilder;
    TokenPluralization: typeof TokenPluralizationBuilder;
    // TODO - add AddonProperty
    // TODO - add RelationAddon
    // TODO - add AttributeAddon
}

/**
 * Primatives
 * Singleton that exposes the constructors for the different Primatives in Codotype
 */
export const Primatives: CodotypePrimatives = {
    Schema: SchemaBuilder,
    Attribute: AttributeBuilder,
    Relation: RelationBuilder,
    Plugin: PluginBuilder,
    SchemaEditor: SchemaEditorBuilder,
    ConfigurationGroup: ConfigurationGroupBuilder,
    ConfigurationGroupSection: ConfigurationGroupSectionBuilder,
    ConfigurationProperty: ConfigurationPropertyBuilder,
    TokenCasing: TokenCasingBuilder,
    TokenPluralization: TokenPluralizationBuilder,
};
