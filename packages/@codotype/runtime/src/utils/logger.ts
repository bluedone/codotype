import { RuntimeLogLevel } from "../types";

// // // //

/**
 * log
 * A logging function used internally by the Runtime
 * Use RuntimeLogLevel to set different levels of logging based on environment / development
 * TODO - add `chalk` dependency for pretty logging
 * TODO - add support for RuntimeLogLevel.info
 * TODO - add support for RuntimeLogLevel.success
 * TODO - add support for RuntimeLogLevel.warning
 * TODO - add support for RuntimeLogLevel.error
 * TODO - add support for RuntimeLogLevel.debug
 * TODO - add tests for this function
 * @param args - arguments passed into `console.log` statement
 */
export function logger(
    args: any,
    options: { level: RuntimeLogLevel },
    runtimeLogLevel: RuntimeLogLevel,
) {
    const { level } = options;

    // Only output verbose logs when runtime.options.logLevel is "verbose"
    if (
        level === RuntimeLogLevel.verbose &&
        [RuntimeLogLevel.verbose, RuntimeLogLevel.debug].includes(
            runtimeLogLevel,
        )
    ) {
        console.log(args);
        return;
    }

    // Logs other statements
    console.log(args);
}
