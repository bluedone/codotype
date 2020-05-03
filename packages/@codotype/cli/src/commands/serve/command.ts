import * as path from "path";
import chalk from "chalk";
import { server } from "./server";
import { CodotypeNodeRuntime } from "@codotype/runtime";

// // // //

async function serve(options: any) {
  // Logs command start message
  console.log(`\nStarting ${chalk.blue(`codotype serve`)}...`);

  // CLEANUP - wrap this in a try/catch
  // CLEANUP - this type of checking will be necessary in a number of places
  // This logic should be abstracted & generalized as much as possible
  // Pulls in requisite paths for codotype runtime
  const generatorMetaPath = path.resolve(
    process.cwd(),
    "./codotype-generator.json" // CLEANUP - constantize MAGIC STRING
  );

  // Invoke runtime directly with parameters
  const runtime = new CodotypeNodeRuntime();

  // Registers this generator via relative path
  try {
    runtime.registerGenerator({
      absolute_path: process.cwd()
    });
  } catch (err) {
    throw err;
    return;
  }

  // // // //

  // Logs server start message
  console.log("Starting Local Codotype Server...");

  // Instantiates app
  const app = server({
    runtime
  });

  // Start the app on port
  const port: number = Number(process.env.PORT) || 9090;
  app.listen(port, () => {
    console.log("Started API server...");
    console.log(`Express is running on port ${port}`);
  });
}

// // // //

// Exports `serve` command
export const serveCommand = (...args) => {
  return serve({ ...args }).catch(err => {
    console.log(chalk.red("codotype cli error"));
    console.log(chalk.yellow("generator not found in local directory"));
    console.log(err);
    if (!process.env.CODOTYPE_CLI_TEST) {
      process.exit(1);
    }
  });
};
