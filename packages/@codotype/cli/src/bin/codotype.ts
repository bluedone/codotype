#!/usr/bin/env node

// Check node version before requiring/doing anything else
// The user may be on a very old node version
// import minimist from "minimist";
import * as program from "commander";
import chalk from "chalk";
import { runCommand } from "../commands/run";
import { serveCommand } from "../commands/serve";
import { testCommand } from "../commands/test";
import { doctorCommand } from "../commands/doctor";
import { checkNodeVersion } from "../util/checkNodeVersion";
import { cleanArgs } from "../util/cleanArgs";
const packageJson = require("../../package.json");

// FEATURE - pull required node version from package.json
const requriedNodeVersion = ">=8.9";
checkNodeVersion(requriedNodeVersion, "@codotype/cli");

// // // //
// Setup CLI with Commander
program.version(String(packageJson.version)).usage("<command> [options]");

// Setup `plugin-doctor` command
program
    .command("plugin-doctor")
    .description(
        "Validates the Plugin defined in the current working directory and surfaces any issues",
    )
    .action(cmd => {
        const options = cleanArgs(cmd);
        doctorCommand(options);
    });

// Setup `plugin-run` command
program
    .command("plugin-run <project>")
    .option(
        "-p --project <codotype-project.json>",
        "Runs the Plugin against the codotype-project.json file and outputs the generated code in ./codotype-out",
    )
    .description(
        "run the Plugin in the current working directory against the blueprint argument",
    )
    .action((project, cmd) => {
        const options = cleanArgs(cmd);
        runCommand(project, options);
    });

// Setup `plugin-test` command
program
    .command("plugin-test")
    .option(
        "Runs the Plugin against a default (empty) project and outputs the generated code in ./codotype-out",
    )
    .description("run the Plugin in the current working directory")
    .action(cmd => {
        const options = cleanArgs(cmd);
        testCommand(options);
    });

// Setup `plugin-serve` command
program
    .command("plugin-serve")
    .description("Serves the Codotype UI locally for a single Codotype plugin")
    .action(cmd => {
        const options = cleanArgs(cmd);
        serveCommand(options);
    });

// output help information on unknown commands
program.arguments("<command>").action(cmd => {
    program.outputHelp();
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
    console.log();
});

// add some useful info on help
program.on("--help", () => {
    console.log();
    console.log(
        `  Run ${chalk.cyan(
            `codotype <command> --help`,
        )} for detailed usage of given command.`,
    );
    console.log();
});

// Stub-out dedicated help command for each individual command
program.commands.forEach(c => c.on("--help", () => console.log()));

// Parse arguments into commander program
program.parse(process.argv);

// Output --help if there are no arguments passed
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
