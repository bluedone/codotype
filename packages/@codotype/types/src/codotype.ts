import { ConfigurationGroupPropertyBuilder } from "./factories/ConfigurationGroupProperty";
import { SchemaBuilder } from "./factories/Schema";

// // // //

export interface CodotypeFactory {
  ConfigurationGroupProperty: typeof ConfigurationGroupPropertyBuilder;
  Schema: typeof SchemaBuilder;
}

export const Codotype: CodotypeFactory = {
  ConfigurationGroupProperty: ConfigurationGroupPropertyBuilder,
  Schema: SchemaBuilder,
};
