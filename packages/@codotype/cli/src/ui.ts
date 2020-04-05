const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const { spawn } = require("child_process");

async function runUi(options: any) {
  // Pulls in requisite paths for codotype runtime
  console.log(options);

  // TODO - generate path from here to packages/@codotype/cli-ui
  // TODO - this should reference an installed package, rather than a direct path
  const uiPath = path.resolve(__dirname, "../../cli-ui");

  // TODO - add cleaner output message here
  console.log("Starting UI...");

  // Assembles arguments to start the UI server
  let args = ["--cwd", uiPath, "run", "serve"];
  const uiProc = spawn("yarn", args);

  uiProc.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  uiProc.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  uiProc.on("close", (code) => {
    return Promise.resolve();
  });
}

module.exports = (...args) => {
  return runUi({ ...args }).catch((err) => {
    // TODO - implement better error handling
    console.log("CODOTYPE CLI ERROR!!");
    console.log(err);
    if (!process.env.CODOTYPE_CLI_TEST) {
      process.exit(1);
    }
  });
};
