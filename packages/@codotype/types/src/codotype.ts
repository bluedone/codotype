import { ConfigurationGroupPropertyBuilder } from "./factories/ConfigurationGroupProperty";
import { SchemaBuilder } from "./factories/Schema";
import { ConfigurationGroupBuilder } from "./factories/ConfigurationGroup";
import { ConfigurationGroupSectionBuilder } from "./factories/ConfigurationGroupSection";
import { SchemaEditorBuilder } from "./factories/SchemaEditor";

// // // //

export interface CodotypeFactory {
  ConfigurationGroup: typeof ConfigurationGroupBuilder;
  ConfigurationGroupSection: typeof ConfigurationGroupSectionBuilder;
  ConfigurationGroupProperty: typeof ConfigurationGroupPropertyBuilder;
  Schema: typeof SchemaBuilder;
  SchemaEditor: typeof SchemaEditorBuilder;
}

export const Codotype: CodotypeFactory = {
  ConfigurationGroup: ConfigurationGroupBuilder,
  ConfigurationGroupSection: ConfigurationGroupSectionBuilder,
  ConfigurationGroupProperty: ConfigurationGroupPropertyBuilder,
  Schema: SchemaBuilder,
  SchemaEditor: SchemaEditorBuilder,
};
