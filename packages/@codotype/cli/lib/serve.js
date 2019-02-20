const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const server = require('@codotype/api/server')
const { spawn } = require('child_process')
const CodotypeRuntime = require('@codotype/runtime')

async function serve (options) {

  // Logs start message
  console.log(`\nStarting ${chalk.blue(`codotype serve`)}...`)

  // // // //
  // TODO - wrap this in a try/catch
  // TODO - this type of checking will be necessary in a number of places
  // This logic should be abstracted & generalized as much as possible
  // Pulls in requisite paths for codotype runtime
  const generatorMetaPath = path.resolve(process.cwd(), './meta.json') // TODO - constantize MAGIC STRING
  // console.log(`the doctor says ${chalk.green(`this generator's metadata loaded correctly`)}`)

  // Invoke runtime directly with parameters
  const runtime = new CodotypeRuntime()

  // Registers this generator via relative path
  try {
    runtime.registerGenerator({ absolute_path: process.cwd() })
  } catch (err) {
    throw err
    return
  }

  //
  // // // //

  console.log('Starting API server...')

  // Starts server
  const port = process.env.PORT || 9090

  const app = server({
    port,
    runtime
  })

  app.listen(port, () => {
    console.log('Started API server...')
    // console.log(`Express is running on port ${port}`)
  })

  // // // //
  // TODO - running a user interface service will necessary in an number of places
  // This process should be abstracted as much as possible

  // Generates path from here to node_modules/@codotype/cli-ui
  const uiPath = path.resolve(__dirname, '../node_modules/@codotype/cli-ui')

  // TODO - add cleaner output message here
  console.log('Starting UI Webpack server...')

  // Assembles arguments to start the UI server
  let args = ['--cwd', uiPath, 'run', 'serve']
  const uiProc = spawn('yarn', args);

  uiProc.stdout.on('data', (data) => console.log(data.toString()))

  // uiProc.stderr.on('data', (data) => {
  //   console.log(`stderr: ${data}`);
  // });

  uiProc.on('close', (code) => {
    console.log('CLOSED')
    // return resolve(); // TODO - resolve is NOT a thing, remove it
  });

  //
  // // // //

}

module.exports = (...args) => {
  return serve(...args).catch(err => {
    console.log(chalk.red('codotype cli error'))
    console.log(chalk.yellow('generator not found in local directory'))
    // console.log(err)
    if (!process.env.CODOTYPE_CLI_TEST) {
      process.exit(1)
    }
  })
}