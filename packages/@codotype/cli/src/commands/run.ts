import * as path from "path";
import { CodotypeNodeRuntime, CodotypeBuildJob } from "@codotype/runtime";
import { CommandOptions } from "../types";
import { Project } from "@codotype/types";

// TODO - implement `inquirer` for basic build
// import inquirer from "inquirer";

// // // //

// TODO - move project validator into @codotype/util
// Validates Project instance against a Generator
// const validateProject = (project, generator) => {
//   return true;
// };

// // // //

/**
 * transformJsonProject
 * TODO - move this into @codotype/util
 * @param jsonProject - Codotype Project parsed from codotype-project.json
 */
export function transformJsonProject(jsonProject: any): Project {
  // Defines the project instance
  // TODO - ProjectConfiguation should have a separate validation/transformation function
  const projectInstance: Project = {
    id: Math.random().toString(), // TODO - use `UUID` function from `@codotype/util`
    identifiers: {
      label: String(jsonProject.identifiers.label),
      snake: String(jsonProject.identifiers.snake),
      camel: String(jsonProject.identifiers.camel),
      pascal: String(jsonProject.identifiers.pascal),
      kebab: String(jsonProject.identifiers.kebab),
    },
    generatorId: String(jsonProject.generatorId),
    generatorVersion: String(jsonProject.generatorVersion),
    configuration: jsonProject.configuration || {},
    schemas: jsonProject.schemas,
  };

  // Returns the Project instance
  return projectInstance;
}

// // // //

/**
 * runGenerator
 * Runs the Codotype generator in the current working directory
 * @param projectPath - path to the codotype-project.json file to generate
 * @param options
 */
async function runGenerator(projectPath: string, options: CommandOptions) {
  // Pulls in requisite paths for codotype runtime
  const projectRequirePath = path.resolve(process.cwd(), projectPath);

  // NOTE - this will be needed for validating the project + project configuration
  // const generatorMetaPath = path.resolve(
  //   process.cwd(),
  //   "./codotype-generator.json"
  // ); // TODO - constantize MAGIC STRING

  // Validates project data
  // const result = validateProject(project);
  // if (!result) {
  //   console.error(chalk.red(`Invalid project path: "${project}"`));
  //   process.exit(1);
  // }

  // Pulls in projectJSON using the `projectRequirePath` and a dynamic import statement
  // TODO - define a function that takes the project JSON and transforms it into a type-safe Project instance
  const projectJSON: any = require(projectRequirePath);

  // Transforms project JSON into projectInstance
  const projectInstance: Project = transformJsonProject(projectJSON);

  // Assembles build job for codotype runtime
  // NOTE - build.id is an empty string when building locally
  const build: CodotypeBuildJob = {
    id: "",
    project: projectInstance,
  };

  // Invoke runtime directly with parameters
  const runtime = new CodotypeNodeRuntime();

  // Registers this generator via relative path
  runtime.registerGenerator({
    absolute_path: process.cwd(),
  });

  // Executes the build
  await runtime.execute({ build });
}

// // // //

export const runCommand = (projectPath: string, options: CommandOptions) => {
  return runGenerator(projectPath, options).catch((err) => {
    // TODO - implement better error handling
    console.log("CODOTYPE CLI ERROR!!");
    console.log(err);
    if (!process.env.CODOTYPE_CLI_TEST) {
      process.exit(1);
    }
  });
};
