import * as semver from "semver";
import chalk from "chalk";

// // // //

/**
 * checkNodeVersion
 * Ensures valid minimum Node.js version is running on the host machine
 * If Node.js version isn't valid, checkNodeVersion will log an error message and exit the program
 * @param wanted - the required Node.js version
 * @param id - the ID of the package being checked (@codotype/cli, in this case)
 */
export function checkNodeVersion(wanted: string, id: string): void {
    if (!semver.satisfies(process.version, wanted)) {
        console.log(
            chalk.red(
                "You are using Node " +
                    process.version +
                    ", but this version of " +
                    id +
                    " requires Node " +
                    wanted +
                    ".\nPlease upgrade your Node version.",
            ),
        );
        process.exit(1);
    }
}
