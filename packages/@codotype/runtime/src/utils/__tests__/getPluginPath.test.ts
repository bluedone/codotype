import { getPluginPath } from "../getPluginPath";

// // // //

describe("getPluginPath", () => {
    test("relativePath", () => {
        const pluginPath = getPluginPath({
            cwd: "/home/user/plugins",
            relativePath: "./my-plugin",
        });
        expect(pluginPath).toBe("/home/user/plugins/my-plugin");
    });

    test("modulePath", () => {
        const pluginPath = getPluginPath({
            cwd: "/home/user/plugins",
            modulePath: "./my-plugin",
        });
        expect(pluginPath).toBe("/home/user/plugins/node_modules/my-plugin");
    });

    test("absolutePath", () => {
        const pluginPath = getPluginPath({
            cwd: "/home/user/plugins",
            absolutePath: "/path/to/my-plugin",
        });
        expect(pluginPath).toBe("/path/to/my-plugin");
    });
});
