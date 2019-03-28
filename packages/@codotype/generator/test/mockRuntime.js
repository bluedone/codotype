const path = require('path')

// Mock CodotypeRuntime class definition
module.exports = class CodotypeRuntime {

  // constructor
  // Handles options to run a single generator instance
  constructor(options = {}) {

    // Assigns this.options
    this.options = options;

    this._mocks_ = {}

    // Assigns this.generators
    this.generators = [];

    // Assigns this.options.cwd
    this.options.cwd = process.cwd();

    // Returns the runtime instance
    return this
  }

  // ensureDir
  // Ensures presence of directory for template compilation
  // TODO - this is repeated in @codotype/generator - should be abstracted, or only encapsulated in the runtime
  async ensureDir (dir) {
    this._mocks_.ensuredDir = dir
    return new Promise((resolve, reject) => {
      return resolve()
    })
  }

  // templatePath
  templatePath (generatorResolved, template_path = './') {
    return path.join(generatorResolved, 'templates', template_path)
  }

  // destinationPath
  destinationPath (destPath, dest = './') {
    return path.join(destPath, dest)
  }

  // renderTemplate
  // Compiles an EJS template and returns the result
  renderTemplate (generatorInstance, src, options = {}) {
    return new Promise((resolve, reject) => {

      // default options padded into the renderFile
      let renderOptions = {}

      // // // //
      // // // //
      // TODO - document this structure
      // The `data` object is passed into each file that gets rendered
      // TODO - this should be abstracted into a separate function
      const data = {
        blueprint: generatorInstance.options.blueprint,
        meta: generatorInstance.options.meta,
        configuration: generatorInstance.options.configuration,
        helpers: {
          indent,
          trailingComma
        },
        ...datatypes,
        ...relationTypes,
        ...options // QUESTION - are options ever used here?
      }
      // // // //
      // // // //

      // Compiles EJS template
      return ejs.renderFile(src, data, renderOptions, (err, str) => {

        // Handles template compilation error
        if (err) return reject(err)

        // Resolves with compiled template
        return resolve(str);

      })

    })
  }

  existsSync (dest) {
    return this.fs.existsSync(dest)
  }

  compareFile (dest, compiledTemplate) {
    return true
  }

  writeFile (dest, compiledTemplate) {
  }

  // copyDir
  copyDir (src, dest) {
    this._mocks_.copiedDirSrc = src
    this._mocks_.copiedDirDest = dest
    return new Promise((resolve, reject) => {
      return resolve()
    })
  }

  // composeWith
  async composeWith (parentGeneratorInstance, generatorModule, options={}) {
  }

}
