import { ConfigurationGroupPropertyBuilder } from "./factories/ConfigurationGroupProperty";
import { SchemaBuilder } from "./factories/Schema";
import { ConfigurationGroupBuilder } from "./factories/ConfigurationGroup";
import { ConfigurationGroupSectionBuilder } from "./factories/ConfigurationGroupSection";

// // // //

export interface CodotypeFactory {
  ConfigurationGroup: typeof ConfigurationGroupBuilder;
  ConfigurationGroupSection: typeof ConfigurationGroupSectionBuilder;
  ConfigurationGroupProperty: typeof ConfigurationGroupPropertyBuilder;
  Schema: typeof SchemaBuilder;
}

export const Codotype: CodotypeFactory = {
  ConfigurationGroup: ConfigurationGroupBuilder,
  ConfigurationGroupSection: ConfigurationGroupSectionBuilder,
  ConfigurationGroupProperty: ConfigurationGroupPropertyBuilder,
  Schema: SchemaBuilder,
};
