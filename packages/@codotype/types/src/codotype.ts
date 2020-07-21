import { ConfigurationGroupPropertyBuilder } from "./factories/ConfigurationGroupProperty";
import { RelationBuilder } from "./factories/RelationBuilder";

// // // //

export interface CodotypeFactory {
  ConfigurationGroupProperty: typeof ConfigurationGroupPropertyBuilder;
  Relation: typeof RelationBuilder;
}

export const Codotype: CodotypeFactory = {
  ConfigurationGroupProperty: ConfigurationGroupPropertyBuilder,
  Relation: RelationBuilder,
};
