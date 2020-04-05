import * as path from "path";
import chalk from "chalk";
import CodotypeRuntime from "@codotype/runtime";
import { buildConfiguration } from "@codotype/util/dist/buildConfiguration";

// TODO - implement `inquirer` for basic build
// import inquirer from "inquirer";

// TODO - move blueprint validator into @codotype/util
const validateBlueprint = (blueprint) => {
  return true;
};

async function runGenerator(blueprint, options) {
  // Validates blueprint data
  const result = validateBlueprint(blueprint);
  if (!result) {
    console.error(chalk.red(`Invalid blueprint: "${blueprint}"`));
    process.exit(1);
  }

  // Pulls in requisite paths for codotype runtime
  const blueprintPath = path.resolve(process.cwd(), blueprint);
  const generatorMetaPath = path.resolve(
    process.cwd(),
    "./codotype-generator.json"
  ); // TODO - constantize MAGIC STRING
  const blueprintJSON = require(blueprintPath);

  // Console debugging statements
  console.log(blueprint);
  console.log(options);

  // Handles configuration for build
  let configurationJSON;
  if (options.config) {
    try {
      const configurationPath = path.resolve(process.cwd(), options.config);
      configurationJSON = require(configurationPath);
      console.log("Loaded configuration: " + options.config);
    } catch (e) {
      console.log("Error loading configuration - using default");
      // console.log(e)
      // @ts-ignore
      configurationJSON = buildConfiguration({
        schemas: blueprintJSON.schemas,
        generator: require(generatorMetaPath),
      });
    }
  } else {
    // @ts-ignore
    configurationJSON = buildConfiguration({
      schemas: blueprintJSON.schemas,
      generator: require(generatorMetaPath),
    });
  }

  // Assembles build object for codotype runtime
  const build = {
    blueprint: blueprintJSON,
    configuration: configurationJSON,
    generator_id: require(generatorMetaPath).id,
  };

  // Invoke runtime directly with parameters
  const runtime = new CodotypeRuntime();

  // Registers this generator via relative path
  runtime.registerGenerator({ absolute_path: process.cwd() });

  // Executes the build
  await runtime.execute({ build });
}

module.exports = (...args) => {
  // @ts-ignore
  return runGenerator(...args).catch((err) => {
    // TODO - implement better error handling
    console.log("CODOTYPE CLI ERROR!!");
    console.log(err);
    if (!process.env.CODOTYPE_CLI_TEST) {
      process.exit(1);
    }
  });
};
