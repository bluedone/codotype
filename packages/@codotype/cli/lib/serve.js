const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const server = require('@codotype/api/server')
const { spawn } = require('child_process')
const CodotypeRuntime = require('@codotype/runtime')

async function serve (options) {

  // Pulls in requisite paths for codotype runtime
  // console.log(options)

  // Logs start message
  console.log(`\nStarting ${chalk.blue(`codotype serve`)}...\n`)

  // // // //
  // TODO - wrap this in a try/catch
  // TODO - this type of checking will be necessary in a number of places
  // This logic should be abstracted & generalized as much as possible
  // Pulls in requisite paths for codotype runtime
  const generatorMetaPath = path.resolve(process.cwd(), './meta.json') // TODO - constantize MAGIC STRING
  console.log(`the doctor says ${chalk.green(`this generator's metadata loaded correctly`)}`)

  // Invoke runtime directly with parameters
  const runtime = new CodotypeRuntime()

  // Registers this generator via relative path
  runtime.registerGenerator({ absolute_path: process.cwd() })

  //
  // // // //

  console.log('Starting API server...')

  // Starts server
  server({ runtime })


  // // // //
  //
  // TODO - import the @codotype/api server and run it here

  // TODO - update the @codotype/api server to accept parameters
  // for different host environments & configurations
  //
  // // // //


  // // // //
  // TODO - running a user interface service will necessary in an number of places
  // This process should be abstracted as much as possible

  // Generates path from here to packages/@codotype/cli-ui
  const uiPath = path.resolve(__dirname, '../../cli-ui')

  // TODO - add cleaner output message here
  console.log('Starting UI Webpack server...')

  // Assembles arguments to start the UI server
  let args = ['--cwd', uiPath, 'run', 'serve']
  const uiProc = spawn('yarn', args);

  uiProc.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  uiProc.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  uiProc.on('close', (code) => {
    console.log('CLOSED')
    // return resolve(); // TODO - resolve is NOT a thing, remove it
  });

  //
  // // // //

}

module.exports = (...args) => {
  return serve(...args).catch(err => {
    // TODO - implement better error handling
    console.log('CODOTYPE CLI ERROR!!')
    console.log(err)
    if (!process.env.CODOTYPE_CLI_TEST) {
      process.exit(1)
    }
  })
}