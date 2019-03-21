const ejs = require('ejs')
const path = require('path');
const fsExtra = require('fs-extra')
const indent = require('@codotype/util/lib/indent')
const trailingComma = require('@codotype/util/lib/trailingComma')
const { buildDefault } = require('@codotype/util/lib/buildDefault')
const datatypes = require('@codotype/types/lib/datatypes')
const relationTypes = require('@codotype/types/lib/relation-types')

// // // //

// CodotypeGenerator class definition
module.exports = class CodotypeGenerator {

  // constructor
  // Handles build options
  constructor (constructorOptions, options) {

    // Assigns constructorOptions
    this.write = constructorOptions.write || this.write
    this.forEachSchema = constructorOptions.forEachSchema || this.forEachSchema
    this.compileInPlace = constructorOptions.compileInPlace || []

    // Assigns this.options
    this.options = options;

    // Assigns helper libraries to class variables
    this.fs = fsExtra

    // Assigns buildDefault helpers from @codotype/util
    this.buildDefault = buildDefault;

    // PASS this.options.resolved in from @codotype/runtime
    this.resolved = this.options.resolved;

    // Returns the instance
    return this
  }

  // write
  // Method for write files to the filesystem
  async write () {
    // console.log('NOTHING TO WRITE - this should be overwritten by a subclassed generator.')
  }

  // forEachSchema
  // TODO - rename this to `writeSchema`, maybe?
  // Method to write files to the filesystem for each schema in blueprints.schemas
  forEachSchema({ schema, blueprint, configuration }) {
    // console.log('NOTHING TO WRITE - this should be overwritten by a subclassed generator.')
  }

  // ensureDir
  // Ensures presence of directory for template compilation
  async ensureDir (dir) {
    const destination_path = path.join(this.options.dest, dir)
    return new Promise((resolve, reject) => {
      return fsExtra.ensureDir(destination_path, (err) => {
        if (err) return reject(err)
        return resolve()
      })
    })
  }

  // copyDir
  // copy a directory from src to dest
  async copyDir (src, dest) {
    return new Promise((resolve, reject) => {
      return this.fs.copy(src, dest, (err) => {
        if (err) return reject(err)
        return resolve()
      })
    })
  }

  // compileInPlace
  // Returns an array of filenames whos
  // templatePath and destinationPath are identical
  // Helpful for compiling lots of one-off templates without writing lots of machinery around them
  // compileInPlace () {
  //   return []
  // }

  // compileTemplatesInPlace
  // Compiles and writes each template defined in the `compileInPlace` method
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
  // Compiles and writes each template defined in the `compileInPlace` method
  renderComponent ({ src, dest, options = {} }) {
    // For each inPlaceTemplate, compile and write
    return this.copyTemplate(
      this.templatePath(src),
      this.destinationPath(dest),
      options
    )
  }

  // renderTemplate
  // Compiles an EJS template and returns the result
  renderTemplate (src, options = {}) {
    return new Promise((resolve, reject) => {

      // default options padded into the renderFile
      let renderOptions = {}

      // // // //
      // // // //
      // TODO - document this structure
      // The `data` object is passed into each file that gets rendered
      // TODO - this should be abstracted into a separate function
      const data = {
        blueprint: this.options.blueprint,
        meta: this.options.meta,
        configuration: this.options.configuration,
        helpers: {
          indent,
          trailingComma
        },
        ...datatypes,
        ...relationTypes,
        ...options
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

  // copyTemplate
  // Compiles a template and writes to the dest location
  copyTemplate (src, dest, options = {}) {
    // console.log('Copying:' + dest)
    return new Promise(async (resolve, reject) => {

      // console.log('Rendering:' + dest)
      const compiledTemplate = await this.renderTemplate(src, options)
      // console.log('Rendered:' + dest)

      // Does the destination already exist?
      const exists = fsExtra.existsSync(dest)

      // If it doesn't exist, OKAY TO WRITE
      if (exists) {
        const existing = fsExtra.readFileSync(dest, 'utf8')
        // If exists, and it's the same, SKIP
        if (compiledTemplate === existing) {
          return resolve()
        } else {
          // TODO - this needs a GitHub issue
          // If exists, and it's different, WRITE (add PROMPT option later, for safety)
        }
      }

      // Writes the compiled template to the dest location
      // console.log('Writing: ' + dest)
      this.fs.writeFile(dest, compiledTemplate, (err) => {
        if (err) return reject(err)
        // console.log('Wrote: ' + dest)
        // console.log('\n')
        return resolve();
      });

    })
  }

  // templatePath
  // TODO - document
  // TODO - document
  templatePath (template_path = './') {
    return path.join(this.resolved, 'templates', template_path)
  }

  // destinationPath
  // TODO - document
  // TODO - document
  destinationPath (destination_path = './') {
    return path.join(this.options.dest, destination_path)
  }

  // composeWith
  // Enables one generator to fire off several child generators
  // TODO - clean up + document this function
  // TODO - clean up + document this function
  // TODO - clean up + document this function
  async composeWith (generatorModule, options={}) {

    // Defines module path
    let modulePath

    // // // //
    // // // //
    // TODO - love into verbose logging function

    // console.log('Compose with')
    // console.log(generatorModule)
    // console.log(options)
    // console.log(this.resolved)
    // // console.log(this)
    // console.log('\n')

    // // // //
    // // // //


    // // // //
    // // // //
    // // // //
    // TODO - move this into a function ( `getModulePath`, perhaps )
    // Handle relative paths
    if (generatorModule.startsWith('./') || generatorModule.startsWith('../')) {

      // TODO - document
      let base = ''

      // TODO - abstract into helper function?
      const stats = fsExtra.statSync(this.resolved)

      // TODO - document
      // TODO - document
      if (stats.isDirectory()) {
        base = this.resolved
      } else {
        base = path.dirname(this.resolved)
      }

      // TODO - document
      modulePath = path.join(base, generatorModule)

    // Handle absolute path
    // } else if (generatorModule.absolute_path) {
    } else if (generatorModule.startsWith('/')) {

      modulePath = path.join(generatorModule)

    // Handle module path
    } else {
      modulePath = path.join(this.options.meta.engine_path, 'node_modules', generatorModule)
    }
    // // // //
    // // // //

    try {
      // console.log(modulePath)

      // TODO - document
      // TODO - document
      const generatorPrototype = require(modulePath); // eslint-disable-line import/no-dynamic-require
      generatorPrototype.resolved = require.resolve(modulePath);

      // TODO - document
      // TODO - document
      // TODO - move into independent function, `getResolvedGeneratorPath`, perhaps
      let resolvedGeneratorPath = generatorPrototype.resolved.split('/')
      resolvedGeneratorPath.pop()
      resolvedGeneratorPath = resolvedGeneratorPath.join('/')

      // // // //
      // // // //
      // TODO - move into independent function, `resolveDestination`, perhaps
      // TODO - document
      // TODO - document
      // TODO - document
      let resolvedDestination = this.options.dest
      if (options.scope) {
        resolvedDestination = path.resolve(this.options.dest, options.scope)
      }

      // // // //
      // // // //
      // TODO - add verbose logging function call here

      // console.log('\n')
      // console.log('this.options.dest')
      // console.log(this.options.dest)
      // console.log('\n')
      // console.log('RESOLVEDDESTINATION')
      // console.log(resolvedDestination)

      // // // //
      // // // //

      // Creates new instance of generatorPrototype
      // TODO - document this a bit more
      const generator = new CodotypeGenerator(generatorPrototype, {
        ...this.options,
        dest: resolvedDestination,
        resolved: resolvedGeneratorPath
      })

      // Invokes `generator.forEachSchema` once for each in blueprint.schemas
      await Promise.all(this.options.blueprint.schemas.map((schema) => generator.forEachSchema({ schema: schema, ...this.options })))

      // Invokes `generator.write()` once
      await generator.write(this.options)

      // Invokes generator.compileTemplatesInPlace()
      await generator.compileTemplatesInPlace()

      // Logs output
      // TODO - add --verbose flag to conditionally print this output
      console.log(`Generated ${generatorPrototype.name}.\n`)

      // Logs which generator is being run
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        console.log('MODULE NOT FOUND')
      } else {
        console.log('OTHER ERROR')
        console.log(err)
        throw err;
      }
    }

  }

}
