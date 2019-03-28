const { buildDefault } = require('@codotype/util/lib/buildDefault')

// // // //

// CodotypeGenerator class definition
module.exports = class CodotypeGenerator {

  // constructor
  // Handles build options
  // TODO - pass in @codotype/runtime instance into this constructor (in options, maybe?)
  constructor (constructorOptions, options) {

    // TODO - document this!
    if (!options.runtime) {
      throw Error('CodotypeGenerator options requires options.runtime');
      return;
    }

    // TODO - document this!
    if (!options.resolved) {
      throw Error('CodotypeGenerator options requires options.resolved');
      return;
    }

    // TODO - document this!
    if (!constructorOptions.write && !constructorOptions.forEachSchema && !constructorOptions.compileInPlace) {
      throw Error('CodotypeGenerator constructorOptions requires either write, forEachSchema, or compileInPlace properties');
      return;
    }

    // Assigns this.runtime
    // this.runtime must be a compliant CodotypeRuntime class instance
    this.runtime = options.runtime;

    // Assigns constructorOptions
    this.write = constructorOptions.write || this.write;
    this.forEachSchema = constructorOptions.forEachSchema || this.forEachSchema;
    this.compileInPlace = constructorOptions.compileInPlace || [];

    // Assigns this.options
    this.options = options;

    // Assigns buildDefault helpers from @codotype/util
    this.buildDefault = buildDefault;

    // PASS this.options.resolved in from @codotype/runtime
    // TODO - throw error if this.options.resolved is undefined
    this.resolved = this.options.resolved;

    // Returns the instance
    return this;
  }

  // write
  // Method for write files to the filesystem
  async write () {
    // console.log('NOTHING TO WRITE - this should be overwritten by a subclassed generator.')
  }

  // forEachSchema
  // TODO - rename this to `writeSchema`, maybe?
  // Method to write files to the filesystem for each schema in blueprints.schemas
  async forEachSchema({ schema, blueprint, configuration }) {
    // console.log('NOTHING TO WRITE - this should be overwritten by a subclassed generator.')
  }

  // ensureDir
  // Ensures presence of directory for template compilation
  async ensureDir (dir) {
    return this.runtime.ensureDir(this.destinationPath(dir))
  }

  // copyDir
  // copy a directory from src to dest'
  // TODO - abstract FS-level operations into @codotype/runtime
  async copyDir (src, dest) {
    return this.runtime.copyDir(src, dest)
  }

  // compileTemplatesInPlace
  // Compiles and writes each template defined in the `compileInPlace` property
  compileTemplatesInPlace () {
    // For each inPlaceTemplate, compile and write
    return Promise.all(this.compileInPlace.map((template) => {
      return this.copyTemplate(
        this.templatePath(template),
        this.destinationPath(template)
      )
    }))
  }

  // renderComponent
  // Compiles and writes each template defined in the `compileInPlace` property
  // TODO - this should be updated to proxy `data` into the `copyTemplate` method
  renderComponent ({ src, dest, options = {} }) {
    // For each inPlaceTemplate, compile and write
    return this.copyTemplate(
      this.templatePath(src),
      this.destinationPath(dest),
      options
    )
  }

  // copyTemplate
  // Compiles a template and writes to the dest location
  // TODO - split this up to rely on runtime methods instead of referencing FS directly
  copyTemplate (src, dest, options = {}) {
    // console.log('Copying:' + dest)
    return new Promise(async (resolve, reject) => {

      // TODO - DOCUMENT!!!
      // this.runtime.log('Rendering:' + dest)

      // TODO - DOCUMENT!!!
      const compiledTemplate = await this.runtime.renderTemplate(this, src, options)

      // TODO - DOCUMENT!!!
      // this.runtime.log('Rendered:' + dest)

      // TODO - DOCUMENT!!!
      // Does the destination already exist?
      const exists = this.runtime.existsSync(dest)

      // TODO - DOCUMENT!!!
      // If it doesn't exist, OKAY TO WRITE
      if (exists) {
        if (this.runtime.compareFile(dest, compiledTemplate)) {
          return resolve()
        } else {
          // TODO - this needs a GitHub issue
          // If exists, and it's different, WRITE (add PROMPT option later, for safety)
          // TODO - this should happen inside the runtime, as input checking will vary depending on environment
        }
      }

      // Writes the compiled template to the dest location
      this.runtime.writeFile(dest, compiledTemplate)
      .then(() => {
        return resolve()
      })

    })
  }

  // templatePath
  // TODO - DOCUMENT!!
  // TODO - DOCUMENT!!
  templatePath (template_path = './') {
    return this.runtime.templatePath(this.resolved, template_path)
  }

  // destinationPath
  // TODO - DOCUMENT!!
  // TODO - DOCUMENT!!
  destinationPath (destination_path = './') {
    return this.runtime.destinationPath(this.options.dest, destination_path)
  }

  // composeWith
  // Enables one generator to fire off several child generators
  async composeWith (generatorModule, options) {
    return this.runtime.composeWith(this, generatorModule, options)
  }
}
