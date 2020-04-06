import { Schema } from "./schema";
import { OptionValueInstance } from "./configuration-option-types";

// // // //

export interface ProjectConfiguration {
  [key: string]: OptionValueInstance;
}

export interface Project {
  label: string;
  identifier: string;
  // TODO - project should support cased tokens
  generatorId: string;
  generatorVersion: string;
  configuration: ProjectConfiguration;
  schemas: Schema[];
}

// From @codotype/util
// interface CodotypeProject {
//   label: string;
//   identifier: string;
//   camel_case: string;
//   class_name: string;
//   configuration: Configuration;
//   schemas: Schema[];
// }
