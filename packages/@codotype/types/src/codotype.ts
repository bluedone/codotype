import { ConfigurationGroupPropertyBuilder } from "./factories/ConfigurationGroupProperty";
import { AttributeBuilder } from "./factories/Attribute";

// // // //

export interface CodotypeFactory {
  Attribute: typeof AttributeBuilder;
  ConfigurationGroupProperty: typeof ConfigurationGroupPropertyBuilder;
}

export const Codotype: CodotypeFactory = {
  Attribute: AttributeBuilder,
  ConfigurationGroupProperty: ConfigurationGroupPropertyBuilder,
};
