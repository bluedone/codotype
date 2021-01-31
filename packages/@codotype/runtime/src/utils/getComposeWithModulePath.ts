// @ts-ignore
import * as fsExtra from "fs-extra";
import * as path from "path";
import { PluginRegistration, RuntimeAdapter } from "@codotype/core";
import { MODULES_ROOT } from "../constants";

// // // //

/**
 * getComposeWithModulePath
 * Gets the absolute path for a generator module included via the RuntimeProxy.composeWith method
 * @param generatorModulePath
 * @param parentRuntimeAdapter
 * @param activePlugin
 */
export function getComposeWithModulePath(
    generatorModulePath: string,
    parentRuntimeAdapter: RuntimeAdapter,
    activePlugin: PluginRegistration,
): string {
    // Handle relative paths
    if (
        generatorModulePath.startsWith("./") ||
        generatorModulePath.startsWith("../")
    ) {
        // Defines a variable to store the absolute path to the module
        let baseModulePath: string = path.dirname(
            parentRuntimeAdapter.props.generatorResolvedPath,
        );
        // Reads the stats for the generatorResolvedPath from parentRuntimeAdapter.props
        const stats = fsExtra.statSync(
            parentRuntimeAdapter.props.generatorResolvedPath,
        );
        // If the parent RuntimeAdaptor connects to a Generator whose module path ends
        // in `index.js` (thus making it the default module resolved by the `composeWith` function call),
        // we use the parent directory of that Generator as the baseModulePath which will
        // be used to resolve the newly composed module via its relative path
        if (stats.isDirectory()) {
            baseModulePath = parentRuntimeAdapter.props.generatorResolvedPath;
        }
        // Returns the module path built by combining baseModulePath + generatorModule path
        return path.join(baseModulePath, generatorModulePath);
    }
    // Handle absolute path
    if (generatorModulePath.startsWith("/")) {
        return path.join(generatorModulePath);
    }
    // Handle import from node_modules directory
    // NOTE - must be in the `node_modules` directory relative to plugin that invoked composeWith
    return path.join(
        activePlugin.pluginDynamicImportPath,
        MODULES_ROOT,
        generatorModulePath,
    );
}
