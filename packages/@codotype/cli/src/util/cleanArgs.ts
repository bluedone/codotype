import { CommandOptions } from "../types";

// // // //

/**
 * camelize
 * @param str - string that's being camelized
 */
function camelize(str: string): string {
    return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
export function cleanArgs(cmd): CommandOptions {
    const args = {};
    cmd.options.forEach((o) => {
        const key: string = camelize(o.long.replace(/^--/, ""));
        // if an option is not present and Command has a method with the same name
        // it should not be copied
        if (typeof cmd[key] !== "function" && typeof cmd[key] !== "undefined") {
            args[key] = cmd[key];
        }
    });
    return args;
}
