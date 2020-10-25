import * as fs from "fs";
import * as path from "path";
import { MODULES_ROOT } from "./constants";

// // // //

/**
 * getPluginPath
 * Gets the absolute path to a Codotype Plugin
 * Used by CodotypeNodeJsRuntime.registerPlugin
 * @param props.cwd the current working directory where the build is being executed by the Runtime
 * @param props.modulePath (optional) the path in node_modules directory relative to CWD where the Codotype Plugin is located
 * @param props.relativePath (optional) the relative path to CWD where the Codotype Plugin is located
 * @param props.absoluatePath (optional) the absolute path to the Codotype Plugin
 */
export function getPluginPath(props: {
    cwd: string;
    modulePath?: string;
    relativePath?: string;
    absolutePath?: string;
}): string {
    // Pulls modulePath, relativePath, absoluatePath from params
    const {
        cwd,
        modulePath = null,
        relativePath = null,
        absolutePath = null,
    } = props;

    // Generator is located in node_modules
    if (modulePath) {
        return path.join(cwd, MODULES_ROOT, modulePath);
    }

    // Generator is located relative to process.cwd()
    if (relativePath) {
        return path.join(cwd, relativePath);
    }

    // Generator path is absolute path on the filesystem, i.e. /tmp/my-generator
    if (absolutePath) {
        return absolutePath;
    }

    // Throw error
    throw new Error(
        "Codotype Plugin path is invalid - please check Codotype.registerPlugin() parameters",
    );
}
