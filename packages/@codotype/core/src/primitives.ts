import { ConfigurationPropertyBuilder } from "./primitives/ConfigurationProperty";
import { SchemaBuilder } from "./primitives/Schema";
import { ConfigurationGroupBuilder } from "./primitives/ConfigurationGroup";
import { ConfigurationGroupSectionBuilder } from "./primitives/ConfigurationGroupSection";
import { SchemaEditorBuilder } from "./primitives/SchemaEditor";
import { RelationBuilder } from "./primitives/Relation";
import { AttributeInputBuilder } from "./primitives/Attribute";
import { PluginBuilder } from "./primitives/Plugin";
import { TokenCasingBuilder } from "./primitives/TokenCasing";
import { TokenPluralizationBuilder } from "./primitives/TokenPluralization";
import { ProjectBuildBuilder } from "./primitives/ProjectBuild";

// // // //

/**
 * CodotypePrimitives
 * Defines an interface to describe the "Primitives" singleton that exposes
 * the various constructors for the different Primative types in Codotype
 */
export interface CodotypePrimitives {
    Schema: typeof SchemaBuilder;
    AttributeInput: typeof AttributeInputBuilder;
    Relation: typeof RelationBuilder;
    Plugin: typeof PluginBuilder;
    SchemaEditor: typeof SchemaEditorBuilder;
    ConfigurationGroup: typeof ConfigurationGroupBuilder;
    ConfigurationGroupSection: typeof ConfigurationGroupSectionBuilder;
    ConfigurationProperty: typeof ConfigurationPropertyBuilder;
    TokenCasing: typeof TokenCasingBuilder;
    TokenPluralization: typeof TokenPluralizationBuilder;
    ProjectBuild: typeof ProjectBuildBuilder;
    // FEATURE - add AddonProperty
    // FEATURE - add RelationAddon
    // FEATURE - add AttributeAddon
}

/**
 * Primitives
 * Singleton that exposes the constructors for the different Primitives in Codotype
 */
export const Primitives: CodotypePrimitives = {
    Schema: SchemaBuilder,
    AttributeInput: AttributeInputBuilder,
    Relation: RelationBuilder,
    Plugin: PluginBuilder,
    SchemaEditor: SchemaEditorBuilder,
    ConfigurationGroup: ConfigurationGroupBuilder,
    ConfigurationGroupSection: ConfigurationGroupSectionBuilder,
    ConfigurationProperty: ConfigurationPropertyBuilder,
    TokenCasing: TokenCasingBuilder,
    TokenPluralization: TokenPluralizationBuilder,
    ProjectBuild: ProjectBuildBuilder,
};
