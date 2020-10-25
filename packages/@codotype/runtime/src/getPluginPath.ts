import * as fs from "fs";
import * as path from "path";
import { MODULES_ROOT } from "./constants";

// // // //

/**
 * getPluginPath
 * Gets the absolute path to a Codotype Plugin
 * Used by CodotypeNodeJsRuntime.registerPlugin
 * @param props.module_path
 * @param props.relative_path
 * @param props.absoluate_path
 */
export function getPluginPath(props: {
    cwd: string;
    module_path?: string;
    relative_path?: string;
    absolute_path?: string;
}): string {
    // Pulls module_path, relative_path, absoluate_path from params
    const {
        cwd,
        module_path = null,
        relative_path = null,
        absolute_path = null,
    } = props;

    // Generator is located in node_modules
    if (module_path) {
        return path.join(cwd, MODULES_ROOT, module_path);
    }

    // Generator is located relative to process.cwd()
    if (relative_path) {
        return path.join(cwd, relative_path);
    }

    // Generator path is absolute path on the filesystem, i.e. /tmp/my-generator
    if (absolute_path) {
        return absolute_path;
    }

    // Throw error
    throw new Error(
        "Codotype Plugin path is invalid - please check Codotype.registerPlugin() parameters",
    );
}
