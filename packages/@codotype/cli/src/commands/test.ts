import { LocalFileSystemAdapter, NodeRuntime } from "@codotype/runtime";
import { CommandOptions } from "../types";
import {
    ProjectInput,
    ProjectBuild,
    RuntimeLogBehaviors,
    buildDefaultProjectInput,
} from "@codotype/core";

// FEATURE - implement `inquirer` for when RuntimeConstructor overwrite behavior is "ask"
// import inquirer from "inquirer";

// // // //

/**
 * testPlugin
 * Runs the Codotype generator in the current working directory
 * @param projectPath - path to the codotype-project.json file to generate
 * @param options
 */
async function testPlugin(options: CommandOptions) {
    // Invoke runtime directly with parameters
    const runtime = new NodeRuntime({
        cwd: process.cwd(),
        logBehavior: RuntimeLogBehaviors.normal,
        fileOverwriteBehavior: "force", // FEATURE - add option for "ask" in CLI
        fileSystemAdapter: new LocalFileSystemAdapter(),
    });

    // Registers this generator via relative path
    const pluginRegistration = await runtime.registerPlugin({
        absolutePath: process.cwd(),
    });

    // Transforms project JSON into projectInstance
    const projectInput: ProjectInput = buildDefaultProjectInput(
        pluginRegistration.pluginMetadata,
    );

    // Assembles build job for codotype runtime
    // NOTE - build.id is an empty string when building locally
    // TODO - add new ProjectBuild primative
    const build: ProjectBuild = {
        id: "",
        projectInput,
        startTime: "", // TODO - set actual end time
        endTime: "", // TODO - set actual end time
    };

    // Executes the build
    await runtime.execute({ build });
}

// // // //

export const testCommand = (options: CommandOptions) => {
    return testPlugin(options).catch(err => {
        // FEATURE - implement better error handling
        console.log("CODOTYPE CLI ERROR!!");
        console.log(err);
        if (!process.env.CODOTYPE_CLI_TEST) {
            process.exit(1);
        }
    });
};
