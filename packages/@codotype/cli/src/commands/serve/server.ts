import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import { ProjectBuild, RuntimeLogLevels } from "@codotype/core";
import { OUTPUT_DIRECTORY } from "@codotype/runtime/dist/constants";
import { NodeRuntime } from "@codotype/runtime";

// // // //

// Exports a basic Express.js app
export function server({ runtime }: { runtime: NodeRuntime }): any {
    // Defines Express.js app
    const app = express();

    // Parse JSON and url-encoded query
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Serve static assets
    app.use(express.static(path.resolve(__dirname, "../../client")));

    // Serves the static Next app
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../../client/index.html"));
    });

    // List available plugins
    app.get("/api/plugins", async (req, res) => {
        const plugins = await runtime.getPlugins();
        return res.send(plugins.map((p) => p.pluginMetadata));
    });

    // Run generator
    app.post("/api/generate", async (req, res) => {
        // Return error if req.body.project
        if (!req.body.projectInput) {
            return res.status(304).json({
                message: "Invalid ProjectInput",
            });
        }

        // Defines start time
        const startTime: number = Date.now();

        // Defines bodotype build
        // FEATURE - verify ProjectInput here here
        // TODO - add new ProjectBuild primative to core
        const build: ProjectBuild = {
            id: "",
            projectInput: req.body.projectInput,
            startTime: "",
            endTime: "",
        };

        // Generates the application
        // CHORE - wrap this in an error hander
        await runtime.execute({ build });

        // Calculate total build time
        const endTime: number = Date.now();
        const totalTime: number = endTime - startTime;

        // Log total build time
        runtime.log(`Build finished in ${totalTime / 1000}`, {
            level: RuntimeLogLevels.info,
        });

        // Sends the local directory path to the client
        return res.json({
            filepath:
                process.cwd() +
                OUTPUT_DIRECTORY +
                build.projectInput.identifiers.snake,
            type: "LOCAL_PATH", // TODO - replace with ResponseTypes.local from @codotype/core@^0.8.16
        });
    });

    // Returns the app instance
    return app;
}
