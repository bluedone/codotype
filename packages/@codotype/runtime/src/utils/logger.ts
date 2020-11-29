import {
    RuntimeLogLevel,
    RuntimeLogBehavior,
    RuntimeLogLevels,
    RuntimeLogBehaviors,
} from "@codotype/core";
import chalk from "chalk";

// // // //

/**
 * log
 * A logging function used internally by the Runtime
 * Use RuntimeLogLevel to set different levels of logging based on environment / development
 * @param args - arguments passed into `console.log` statement
 * @param options.level - the RuntimeLogLevel for the log statement
 * @param runtimeLogBehavior - the RuntimeLogLevel for the log statement
 */
export function logger(
    args: any,
    options: { level: RuntimeLogLevel },
    runtimeLogBehavior: RuntimeLogBehavior,
) {
    const { level } = options;

    // If runtimeLogLevel === suppress -> short-circuit
    if (runtimeLogBehavior === RuntimeLogBehaviors.suppress) {
        return;
    }

    // Only output verbose logs when runtime.options.logBehavior is "verbose"
    if (
        level === RuntimeLogLevels.verbose &&
        runtimeLogBehavior === RuntimeLogBehaviors.verbose
    ) {
        console.log(chalk.white(args));
        return;
    }

    // Handle RuntimeLogLevels.info
    if (level === RuntimeLogLevels.info) {
        console.log(chalk.blue(args));
        return;
    }

    // Handle RuntimeLogLevels.warning
    if (level === RuntimeLogLevels.warning) {
        console.log(chalk.yellow(args));
        return;
    }

    // Handle RuntimeLogLevels.error
    if (level === RuntimeLogLevels.error) {
        console.log(chalk.red(args));
        return;
    }
}
