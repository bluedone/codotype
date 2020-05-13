import { ConfigurationGroupPropertyBuilder } from "./factories/ConfigurationGroupProperty";

// // // //

export interface CodotypeFactory {
  ConfigurationGroupProperty: typeof ConfigurationGroupPropertyBuilder;
}

export const Codotype: CodotypeFactory = {
  ConfigurationGroupProperty: ConfigurationGroupPropertyBuilder
};
