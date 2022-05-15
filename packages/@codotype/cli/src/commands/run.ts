import * as path from "path";
import { LocalFileSystemAdapter, NodeRuntime } from "@codotype/runtime";
import { CommandOptions } from "../types";
import {
    ProjectInput,
    ProjectBuild,
    transformJsonProjectInput,
    RuntimeLogBehaviors,
} from "@codotype/core";

// FEATURE - implement `inquirer` for when RuntimeConstructor overwrite behavior is "ask"
// import inquirer from "inquirer";

// // // //

/**
 * runPlugin
 * Runs the Codotype plugin in the current working directory
 * @param projectPath - path to the codotype-project.json file to generate
 * @param options
 */
async function runPlugin(projectPath: string, options: CommandOptions) {
    // Pulls in requisite paths for codotype runtime
    const projectRequirePath = path.resolve(process.cwd(), projectPath);

    // Pulls in projectJSON using the `projectRequirePath` and a dynamic import statement
    // CHORE - wrap this in try/catch
    const projectJSON: any = require(projectRequirePath);

    // Transforms project JSON into projectInstance
    const projectInput: ProjectInput = transformJsonProjectInput(projectJSON);

    // Assembles build job for codotype runtime
    // NOTE - build.id is an empty string when building locally
    // TODO - add new ProjectBuild primative
    const build: ProjectBuild = {
        id: "",
        projectInput,
        startTime: "", // TODO - set actual end time
        endTime: "", // TODO - set actual end time
    };

    // Invoke runtime directly with parameters
    const runtime = new NodeRuntime({
        cwd: process.cwd(),
        logBehavior: RuntimeLogBehaviors.normal,
        fileOverwriteBehavior: "force", // FEATURE - add option for "ask" in CLI
        fileSystemAdapter: new LocalFileSystemAdapter(),
    });

    // Registers this generator via relative path
    runtime.registerPlugin({
        absolutePath: process.cwd(),
    });

    // Executes the build
    await runtime.execute({ build });
}

// // // //

export const runCommand = (projectPath: string, options: CommandOptions) => {
    return runPlugin(projectPath, options).catch((err) => {
        // FEATURE - implement better error handling
        console.log("CODOTYPE CLI ERROR!!");
        console.log(err);
        if (!process.env.CODOTYPE_CLI_TEST) {
            process.exit(1);
        }
    });
};
