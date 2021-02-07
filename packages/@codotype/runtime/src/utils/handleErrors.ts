import { RuntimeLogBehavior, RuntimeLogLevels } from "@codotype/core";
import { logger } from "./logger";

// // // //

/**
 * handlePluginImportError
 * @param error - the error from Runtime.registerPlugin
 * @param runtimeLogBehavior - the RuntimeLogBehavior from Rutnime
 */
export function handlePluginImportError(
    error: any,
    runtimeLogBehavior: RuntimeLogBehavior,
): Promise<null> {
    logger(error, { level: RuntimeLogLevels.error }, runtimeLogBehavior);
    // Handle "Plugin Not Found" error
    if (error.code === "MODULE_NOT_FOUND") {
        logger(
            "REGISTRATION ERROR - PLUGIN NOT FOUND",
            { level: RuntimeLogLevels.error },
            runtimeLogBehavior,
        );
    } else {
        logger(
            "REGISTRATION ERROR - OTHER",
            { level: RuntimeLogLevels.error },
            runtimeLogBehavior,
        );
    }

    // Logs error
    logger(error, { level: RuntimeLogLevels.error }, runtimeLogBehavior);

    // Resolves promise
    return Promise.resolve(null);
}

export function handleExecuteImportError(
    error: any,
    runtimeLogBehavior: RuntimeLogBehavior,
): Promise<void> {
    if (error.code === "MODULE_NOT_FOUND") {
        logger(
            "RUNTIME ERROR - GENERATOR NOT FOUND",
            { level: RuntimeLogLevels.error },
            runtimeLogBehavior,
        );
    } else {
        logger(
            "RUNTIME ERROR - OTHER",
            { level: RuntimeLogLevels.error },
            runtimeLogBehavior,
        );
    }

    // Logs error
    logger(error, { level: RuntimeLogLevels.error }, runtimeLogBehavior);

    // Resolves with Promise<void>
    return Promise.resolve();
}
