import * as path from "path";
import chalk from "chalk";
import { CodotypeNodeRuntime } from "@codotype/runtime";
import { validateGenerator } from "@codotype/core";

async function doctor() {
  // Logs start message
  console.log(`\nPaging ${chalk.blue(`codotype doctor`)}...\n`);

  // Pulls in requisite paths for codotype runtime
  // TODO - constantize `./generator/meta.js` magic string
  const generatorMetaPath = path.resolve(process.cwd(), "./generator/meta.js");
  console.log(
    `the doctor says ${chalk.green(
      `this generator's metadata loaded correctly`
    )}`
  );

  // Invoke runtime directly with parameters
  const runtime = new CodotypeNodeRuntime();

  // Registers this generator via relative path
  runtime.registerGenerator({
    absolute_path: process.cwd()
  });

  console.log(
    `the doctor says ${chalk.green(`this generator can register with the `) +
    chalk.green(`codotype runtime`)}`
  );

  // Runs the generator through validateGenerator
  const generatorMeta = require(generatorMetaPath);
  const validations = validateGenerator({ generator: generatorMeta });

  // Logs validation of properties
  // TODO - should be part of @codotype/core
  console.log(`the doctor is ${chalk.blue(`validating the generator:`)}`);
  validations.forEach(v => {
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
  if (validations.map(v => v.valid).some(bool => bool === false)) {
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
    `\n${chalk.blue(`codotype doctor`) +
    " says " +
    chalk.yellow(`everything is splendid`)}\n`
  );
  return;
}

export const doctorCommand = (...args) => {
  return doctor().catch(err => {
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
