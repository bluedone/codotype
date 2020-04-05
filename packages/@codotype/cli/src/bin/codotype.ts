#!/usr/bin/env node

// Check node version before requiring/doing anything else
// The user may be on a very old node version
import minimist from "minimist";
// @ts-ignore
import * as program from "commander";
import chalk from "chalk";
import semver from "semver";
import { buildCommand } from "../commands/build";
import { runCommand } from "../commands/run";
import { serveCommand } from "../commands/serve";
import { doctorCommand } from "../commands/doctor";
import { uiCommand } from "../commands/ui";

// TODO - pull this from package.json
const requiredVersion = ">=8.9";

function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(
      chalk.red(
        "You are using Node " +
          process.version +
          ", but this version of " +
          id +
          " requires Node " +
          wanted +
          ".\nPlease upgrade your Node version."
      )
    );
    process.exit(1);
  }
}

checkNodeVersion(requiredVersion, "codotype-cli");

// // // //

program.version(require("../package").version).usage("<command> [options]");

program
  .command("ui")
  .description("runs the Codotype ui")
  .action((cmd) => {
    const options = cleanArgs(cmd);
    uiCommand(options);
  });

program
  .command("generator-doctor")
  .description("validates the generator in the current working directory")
  .action((cmd) => {
    const options = cleanArgs(cmd);
    doctorCommand(options);
  });

program
  .command("generator-build")
  .description(
    "builds a distributable client app for a single Codotype generator"
  )
  .action((cmd) => {
    const options = cleanArgs(cmd);

    buildCommand(options);
  });

program
  .command("generator-run <blueprint>")
  .option(
    "-c --config <configuration>",
    "Path to generator configuration file to pass into Codotype runtime"
  )
  // .parse(process.argv)
  .description(
    "run the generator in the current working directory against the blueprint argument"
  )
  .action((blueprint, cmd) => {
    const options = cleanArgs(cmd);
    runCommand(blueprint, options);
  });

program
  .command("generator-serve")
  .description("serves the UI for a single Codotype generator")
  .action((cmd) => {
    const options = cleanArgs(cmd);
    serveCommand(options);
  });

// output help information on unknown commands
program.arguments("<command>").action((cmd) => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
});

// add some useful info on help
program.on("--help", () => {
  console.log();
  console.log(
    `  Run ${chalk.cyan(
      `codotype <command> --help`
    )} for detailed usage of given command.`
  );
  console.log();
});

program.commands.forEach((c) => c.on("--help", () => console.log()));

// Parse arguments into commander program
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd) {
  const args = {};
  cmd.options.forEach((o) => {
    const key = camelize(o.long.replace(/^--/, ""));
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== "function" && typeof cmd[key] !== "undefined") {
      args[key] = cmd[key];
    }
  });
  return args;
}
