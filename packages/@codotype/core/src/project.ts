import { Schema } from "./schema";
import { ProjectConfiguration } from "./ProjectConfiguration";
import { TokenCasing } from "./token";
import { UUID } from "./uuid";

// // // //

export interface Project {
  id: UUID;
  generatorId: string;
  generatorVersion: string;
  identifiers: TokenCasing;
  configuration: ProjectConfiguration;
  schemas: Schema[];
}
