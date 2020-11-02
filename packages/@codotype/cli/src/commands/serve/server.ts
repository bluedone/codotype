import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import { omit } from "lodash";
import { ProjectBuild } from "@codotype/core";

// // // //

// Exports a basic Express.js app
export function server({ runtime }): any {
    // Defines Express.js app
    const app = express();

    // Print the request log on console
    // TOOD - enable this if a debug flat is passed into this function
    // app.use(
    //   morgan(":method :url :status :res[content-length] - :response-time ms")
    // );

    // Parse JSON and url-encoded query
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Serve static assets
    app.use(express.static(path.resolve(__dirname, "../../client")));

    // Serves the static Next app
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../../client/index.html"));
    });

    // List available generators
    app.get("/api/generators", (req, res) => {
        return res.send(
            runtime
                .getGenerators()
                .map((g) => omit(g, ["generator_path", "engine_path"])),
        );
    });

    // Run generator
    app.post("/api/generate", async (req, res) => {
        // Return error if req.body.project
        if (!req.body.project) {
            return res.status(304).json({
                message: "Invalid Project",
            });
        }

        // Defines bodotype build
        // TODO - verify req.body.project here
        const build: ProjectBuild = {
            id: "",
            projectInput: req.body.project,
        };

        // Generates the application
        // CLEANUP - wrap this in an error hander?
        await runtime.execute({ build });

        // Sends the local directory path to the client
        // CLEANUP - pull the destination directory from the runtime?
        return res.json({
            filepath:
                process.cwd() +
                "/codotype-build/" +
                build.projectInput.identifiers.snake,
            type: "LOCAL_PATH",
        });
    });

    // Returns the app instance
    return app;
}
