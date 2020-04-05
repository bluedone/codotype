import * as path from "path";
import chalk from "chalk";
import CodotypeRuntime from "@codotype/runtime";
import { validateGenerator } from "@codotype/util/dist/validateGenerator"; // CLEANUP - would be nice to just import from `@codotype/util`

async function doctor(options) {
  // Logs start message
  console.log(`\nPaging ${chalk.blue(`codotype doctor`)}...\n`);
  // TODO - remove
  console.log(options);

  // Pulls in requisite paths for codotype runtime
  // TODO - constantize `codotype-generator.json` magic string
  const generatorMetaPath = path.resolve(
    process.cwd(),
    "./codotype-generator.json"
  );
  console.log(
    `the doctor says ${chalk.green(
      `this generator's metadata loaded correctly`
    )}`
  );

  // Invoke runtime directly with parameters
  const runtime = new CodotypeRuntime();

  // Registers this generator via relative path
  runtime.registerGenerator({ absolute_path: process.cwd() });
  console.log(
    `the doctor says ${
      chalk.green(`this generator can register with the `) +
      chalk.green(`codotype runtime`)
    }`
  );

  // Runs the generator through validateGenerator
  const generatorMeta = require(generatorMetaPath);
  const validations = validateGenerator({ generator: generatorMeta });

  // Logs validation of properties in `codotype-generator.json`
  console.log(`the doctor is ${chalk.blue(`validating the generator:`)}`);
  validations.forEach((v) => {
    if (v.valid) {
      console.log(
        `\t${chalk.blue(`${v.property}`) + " is " + chalk.green(`is present`)}`
      );
    } else {
      console.log(
        `\t${chalk.blue(`${v.property}`) + " is " + chalk.red(`is missing`)}`
      );
    }
  });

  // Logs validation success and error messages
  if (validations.map((v) => v.valid).includes(false)) {
    console.log(
      `the doctor says ${chalk.red(
        `this generator is missing some critical properties `
      )}`
    );
  } else {
    console.log(
      `the doctor says ${chalk.green(
        `this generator has all required properties`
      )}`
    );
  }

  // Logs success message if nothing blows up
  console.log(
    `\n${
      chalk.blue(`codotype doctor`) +
      " says " +
      chalk.yellow(`everything is splendid`)
    }\n`
  );
  return;
}

module.exports = (...args) => {
  return doctor({ ...args }).catch((err) => {
    // TODO - implement better error handling
    console.log(
      `${chalk.red(`ERROR`)} - something went wrong with ${chalk.cyan(
        `codotype doctor`
      )}`
    );
    console.log(err);
    if (!process.env.CODOTYPE_CLI_TEST) {
      process.exit(1);
    }
  });
};
