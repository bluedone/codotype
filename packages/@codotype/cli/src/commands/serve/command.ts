import chalk from "chalk";
import * as open from "open";
import { server } from "./server";
import {
    InMemoryFileSystemAdapter,
    LocalFileSystemAdapter,
    NodeRuntime,
} from "@codotype/runtime";
import { RuntimeLogBehaviors } from "@codotype/core";

// // // //

async function serve(options: any) {
    // Logs command start message
    console.log(`\nStarting ${chalk.blue(`codotype plugin-serve`)}...`);

    // Invoke runtime directly with parameters
    const runtime = new NodeRuntime({
        cwd: process.cwd(),
        logBehavior: RuntimeLogBehaviors.normal,
        fileOverwriteBehavior: "force", // FEATURE - add option for "ask" in CLI
        fileSystemAdapter: new LocalFileSystemAdapter(),
    });

    // Initializ previewRuntime with InMemoryFileSystemAdapter
    const previewFileSystemAdapter = new InMemoryFileSystemAdapter();
    const previewRuntime = new NodeRuntime({
        cwd: process.cwd(),
        logBehavior: RuntimeLogBehaviors.normal,
        fileOverwriteBehavior: "force",
        fileSystemAdapter: previewFileSystemAdapter,
    });

    // Registers this generator via relative path
    try {
        runtime.registerPlugin({
            absolutePath: process.cwd(),
        });
        previewRuntime.registerPlugin({
            absolutePath: process.cwd(),
        });
    } catch (err) {
        throw err;
    }

    // // // //

    // Logs server start message
    console.log("Starting Codotype server...");

    // Instantiates app
    const app = server({
        runtime,
        previewRuntime,
        previewFileSystemAdapter,
    });

    // Start the app on port
    const port: number = Number(process.env.PORT) || 3030;
    app.listen(port, () => {
        // Logs start message
        console.log(`Codotype is running on port ${port}`);

        // Opens app in default browser
        open(`http://localhost:${port}`);
    });
}

// // // //

// Exports `serve` command
export const serveCommand = (...args) => {
    return serve({ ...args }).catch((err) => {
        // FEATURE - add better error handling
        console.log(chalk.red("codotype cli error"));
        console.log(chalk.yellow("generator not found in local directory"));
        console.log(err);
        if (!process.env.CODOTYPE_CLI_TEST) {
            process.exit(1);
        }
    });
};
