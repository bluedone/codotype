import { Schema } from "./schema";
import { OptionValueInstance } from "./configuration-option-types";

// // // //

export interface ProjectConfiguration {
  [key: string]: OptionValueInstance;
}

export interface Project {
  label: string;
  generatorId: string;
  generatorVersion: string;
  configuration: ProjectConfiguration;
  schemas: Schema[];
}
