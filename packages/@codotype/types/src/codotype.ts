import { ConfigurationGroupPropertyBuilder } from "./factories/ConfigurationGroupProperty";
import { SchemaBuilder } from "./factories/Schema";
import { ConfigurationGroupBuilder } from "./factories/ConfigurationGroup";

// // // //

export interface CodotypeFactory {
  ConfigurationGroup: typeof ConfigurationGroupBuilder;
  ConfigurationGroupProperty: typeof ConfigurationGroupPropertyBuilder;
  Schema: typeof SchemaBuilder;
}

export const Codotype: CodotypeFactory = {
  ConfigurationGroup: ConfigurationGroupBuilder,
  ConfigurationGroupProperty: ConfigurationGroupPropertyBuilder,
  Schema: SchemaBuilder,
};
