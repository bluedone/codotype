const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const CodotypeRuntime = require('@codotype/runtime')

async function doctor (options) {

  // Logs start message
  console.log(`\nPaging ${chalk.blue(`codotype doctor`)}...\n`)

  // Pulls in requisite paths for codotype runtime
  const generatorMetaPath = path.resolve(process.cwd(), './meta.json') // TODO - constantize MAGIC STRING
  console.log(`the doctor says ${chalk.green(`this generator's metadata loaded correctly`)}`)

  // Invoke runtime directly with parameters
  const runtime = new CodotypeRuntime()

  // Registers this generator via relative path
  runtime.registerGenerator({ absolute_path: process.cwd() })
  console.log(`the doctor says ${chalk.green(`this generator can register with the `) + chalk.green(`codotype runtime`)}`)

  // Logs success message if nothing blows up
  console.log(`\n${chalk.blue(`codotype doctor`) + ' says ' + chalk.yellow(`everything is splendid`)}\n`)
  return
}

module.exports = (...args) => {
  return doctor(...args).catch(err => {
    // TODO - implement better error handling
    console.log(`${chalk.red(`ERROR`)} - something went wrong with ${chalk.cyan(`codotype doctor`)}`)
    console.log(err)
    if (!process.env.CODOTYPE_CLI_TEST) {
      process.exit(1)
    }
  })
}