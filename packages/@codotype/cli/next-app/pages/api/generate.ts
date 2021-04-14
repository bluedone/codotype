import { LocalFileSystemAdapter, NodeRuntime } from "@codotype/runtime";
import { OUTPUT_DIRECTORY } from "@codotype/runtime/dist/constants";
import { RuntimeLogBehaviors, ProjectBuild } from "@codotype/core";

const runtime = new NodeRuntime({
    cwd: process.cwd(),
    logBehavior: RuntimeLogBehaviors.normal,
    fileOverwriteBehavior: "force",
    fileSystemAdapter: new LocalFileSystemAdapter(),
});

// // // //

// POST /api/generate
export default async (req: any, res: any) => {
    try {
        await runtime.registerPlugin({
            absolutePath: process.env.PLUGIN_ABSOLUTE_PATH,
        });

        // Defines bodotype build
        // FEATURE - verify ProjectInput here
        // TODO - add new ProjectBuild primative to core, i.e. "new Primatives.ProjectBuild({ ... })"
        const build: ProjectBuild = {
            id: "local-docker",
            projectInput: req.body.projectInput,
            startTime: "",
            endTime: "",
        };

        // Runs the build
        await runtime.execute({ build });

        // Sends the local directory path to the client
        res.statusCode = 200;
        res.json({
            filepath:
                process.cwd() +
                "/" +
                OUTPUT_DIRECTORY +
                "/" +
                build.projectInput.identifiers.snake,
            type: "LOCAL_PATH", // TODO - pull this into enum
            // TODO - add support for "LOCAL_DOWNLOAD" from local path + download API route?
        });
        return;
    } catch (err) {
        // throw err;
        console.error(err);
        res.statusCode = 500;
        res.json({
            error: "An error has occured",
        });
    }

    res.statusCode = 200;
};
