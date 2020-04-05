import * as morgan from "morgan";
import * as express from "express";
import * as bodyParser from "body-parser";
import { omit } from "lodash";
import { handleRequest } from "./handleRequest";

// // // //

// Exports a basic Express.js app
export function server({
  port,
  runtime,
  zipBuild,
  generateBuildId,
  uploadZipToS3,
}) {
  // Generates requestHandler
  const requestHandler = handleRequest({
    runtime,
    zipBuild,
    generateBuildId,
    uploadZipToS3,
  });

  // Express.js App & Configuration
  const app = express();

  // Print the request log on console
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );

  // Parse JSON and url-encoded query
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // List available generators
  app.get("/api/generators", (req, res) => {
    return res.send(
      runtime
        .getGenerators()
        .map((g) => omit(g, ["generator_path", "engine_path"]))
    );
  });

  // Run generator
  app.post("/api/generate", requestHandler);

  // Returns the app instance
  return app;
}
