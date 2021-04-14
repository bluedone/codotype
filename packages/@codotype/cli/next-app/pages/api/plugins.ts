// import * as path from "path"
import { LocalFileSystemAdapter, NodeRuntime } from "@codotype/runtime";
import { RuntimeLogBehaviors } from "@codotype/core";
import { NextMongoStarter } from "@codotype/ui/dist/src/pages/web_runtime/__tests__/test_state/NextMongoStarterPlugin";

const runtime = new NodeRuntime({
    cwd: process.cwd(),
    logBehavior: RuntimeLogBehaviors.normal,
    fileOverwriteBehavior: "force",
    fileSystemAdapter: new LocalFileSystemAdapter(),
});

// // // //

// GET /api/plugins
export default async (_req: any, res: any) => {
    // Registers this generator via relative path
    try {
        await runtime.registerPlugin({
            absolutePath: process.env.PLUGIN_ABSOLUTE_PATH,
        });
        const plugins = await runtime.getPlugins();
        res.statusCode = 200;
        res.json(plugins.map(p => p.pluginMetadata));
        return;
    } catch (err) {
        // throw err;
        console.error(err);
        res.statusCode = 200;
        res.json([NextMongoStarter]);
    }
};
