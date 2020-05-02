import * as morgan from "morgan";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import next from "next";
import { parse } from "url";
// import { omit } from "lodash";

// // // //

// Exports a basic Express.js app
export function server({ runtime }): any {
  // Next.js App & Configuration
  const nextApp = next({
    dev: true,
    dir: path.resolve(__dirname, "../../../next-app")
  });

  // Next.js handler
  const nextHandler = nextApp.getRequestHandler();
  const app = express();

  // Next.js prepare
  nextApp.prepare().then(() => {
    // Print the request log on console
    app.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    );

    // Parse JSON and url-encoded query
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.get("/", (req, res) => {
      const parsedUrl = parse(req.url, true);
      // const { pathname, query } = parsedUrl;
      return nextHandler(req, res, parsedUrl);
      // return nextHandler(req, res);
      // return handle(req, res)
    });

    app.get("/_next/*", (req, res) => {
      console.log("");
      // const handle = nextApp.getRequestHandler();
      const parsedUrl = parse(req.url, true);
      nextHandler(req, res, parsedUrl);
    });

    // List available generators
    app.get("/api/generators", (req, res) => {
      return res.send(
        runtime.getGenerators()
        // .map(g => omit(g, ["generator_path", "engine_path"]))
      );
    });

    // Run generator
    app.post("/api/generate", async (req, res) => {
      const { build } = req.body;
      build.id = build.blueprint.identifier;

      // Generates the application
      // CLEANUP - wrap this in an error hander?
      await runtime.execute({ build });

      // Sends the local directory path to the client
      // CLEANUP - pull the destination directory from the runtime?
      return res.json({
        filepath:
          process.cwd() + "/codotype-build/" + build.blueprint.identifier,
        type: "LOCAL_PATH"
      });
    });

    // Start the app listening
    const port: number = Number(process.env.PORT) || 9090;

    app.listen(port, () => {
      console.log("Started API server...");
      console.log(`Express is running on port ${port}`);
    });
  });

  // Returns the app instance
  return app;
}
