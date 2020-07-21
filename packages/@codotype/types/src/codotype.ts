import { ConfigurationGroupPropertyBuilder } from "./factories/ConfigurationGroupProperty";
import { RelationBuilder } from "./factories/RelationBuilder";
import { AttributeBuilder } from "./factories/Attribute";

// // // //

export interface CodotypeFactory {
  Attribute: typeof AttributeBuilder;
  Relation: typeof RelationBuilder;
  ConfigurationGroupProperty: typeof ConfigurationGroupPropertyBuilder;
}

export const Codotype: CodotypeFactory = {
  Attribute: AttributeBuilder,
  Relation: RelationBuilder,
  ConfigurationGroupProperty: ConfigurationGroupPropertyBuilder,
};
