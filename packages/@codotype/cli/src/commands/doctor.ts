import * as path from "path";
import chalk from "chalk";
import { LocalFileSystemAdapter, NodeRuntime } from "@codotype/runtime";
import {
    PLUGIN_DISTRIBUTABLE_DIR,
    PLUGIN_METADATA_FILENAME,
} from "@codotype/runtime/src/constants";
import { validatePlugin, RuntimeLogLevels } from "@codotype/core";

// // // //

async function doctor() {
    // Logs start message
    console.log(`\nPaging ${chalk.blue(`codotype doctor`)}...\n`);

    // Pulls in requisite paths for codotype runtime
    const generatorMetaPath = path.resolve(
        process.cwd(),
        `./${PLUGIN_DISTRIBUTABLE_DIR}/${PLUGIN_METADATA_FILENAME}`,
    );
    console.log(
        `the doctor says ${chalk.green(
            `this generator's metadata loaded correctly`,
        )}`,
    );

    // Invoke runtime directly with parameters
    const runtime = new NodeRuntime({
        cwd: process.cwd(),
        logLevel: RuntimeLogLevels.info,
        fileOverwriteBehavior: "force", // FEATURE - add option for "ask" in CLI
        fileSystemAdapter: new LocalFileSystemAdapter(),
    });

    // Registers this plugin via relative path
    runtime.registerPlugin({
        absolutePath: process.cwd(),
    });

    console.log(
        `the doctor says ${
            chalk.green(`this generator can register with the `) +
            chalk.green(`codotype runtime`)
        }`,
    );

    // Runs the generator through validatePlugin
    const generatorMeta = require(generatorMetaPath);
    const validations = validatePlugin({ plugin: generatorMeta });

    // Logs validation of properties
    console.log(`the doctor is ${chalk.blue(`validating the generator:`)}`);
    validations.forEach((v) => {
        if (v.valid) {
            console.log(
                `\t${
                    chalk.blue(`${v.property}`) +
                    " is " +
                    chalk.green(`is present`)
                }`,
            );
        } else {
            console.log(
                `\t${
                    chalk.blue(`${v.property}`) +
                    " is " +
                    chalk.red(`is missing`)
                }`,
            );
        }
    });

    // Logs validation success and error messages
    if (validations.map((v) => v.valid).some((bool) => bool === false)) {
        console.log(
            `the doctor says ${chalk.red(
                `this generator is missing some critical properties `,
            )}`,
        );
    } else {
        console.log(
            `the doctor says ${chalk.green(
                `this generator has all required properties`,
            )}`,
        );
    }

    // Logs success message if nothing blows up
    console.log(
        `\n${
            chalk.blue(`codotype doctor`) +
            " says " +
            chalk.yellow(`everything is splendid`)
        }\n`,
    );
    return;
}

export const doctorCommand = (...args) => {
    return doctor().catch((err) => {
        // FEATURE - implement better error handling
        console.log(
            `${chalk.red(`ERROR`)} - something went wrong with ${chalk.cyan(
                `codotype doctor`,
            )}`,
        );
        console.log(err);
        if (!process.env.CODOTYPE_CLI_TEST) {
            process.exit(1);
        }
    });
};
