// import Promise from 'bluebird';
import * as fs from 'fs';
import fsExtra from 'fs-extra';
import * as path from 'path';
import ejs from 'ejs';
import {
  indent,
  inflate,
  trailingComma
} from '@codotype/util';
import {
  Datatype,
  RelationType
} from '@codotype/types';
import CodotypeGenerator from '@codotype/generator';

// // // //
// Constants

const OUTPUT_DIRECTORY: string = 'codotype-build';
const CODOTYPE_MANIFEST_DIRECTORY: string = '.codotype';
const MODULES_ROOT: string = 'node_modules';
const GENERATOR_META_FILENAME: string = 'codotype-generator.json';
const GENERATOR_CLASS_PATH: string = 'generator';
const GENERATOR_README_FILENAME: string = 'README.md';

// // // //

// CodotypeRuntime class definition
export class CodotypeNodeRuntime {
  fs: any;
  options: { [key: string]: any };
  generators: any[];

  // constructor
  // Handles options to run a single generator instance
  constructor(options = {}) {

    // Assigns this.options
    this.options = options;

    // TODO - add option for LOG_LEVEL
    // TODO - add option for FORCE (overwrite existing files, or prompt user to overwrite if changes are detected)

    // Assigns this.generators
    this.generators = [];

    // Assigns this.options.cwd
    this.options.cwd = process.cwd();

    // Attaches fsExtra as this.fs
    this.fs = fsExtra

    // Returns the runtime instance
    return this
  }

  // registerGenerator
  // Registers an individual generator by it's node_modules name
  // i.e. 'codotype-generator-nuxt' in `node_modules/codotype-generator-nuxt'`
  registerGenerator({ module_path, relative_path, absolute_path }) {

    // Resolves path to generator
    let engine_path: string = '';

    // Generator is located in node_modules
    if (module_path) {
      engine_path = path.join(this.options.cwd, MODULES_ROOT, module_path)
    } else if (relative_path) {
      engine_path = path.join(this.options.cwd, relative_path)
    } else {
      engine_path = absolute_path
    }

    // Construct the module path
    const generator_path: string = path.join(engine_path, GENERATOR_CLASS_PATH)
    const generator_meta_path: string = path.join(engine_path, GENERATOR_META_FILENAME)
    const generator_readme_path: string = path.join(engine_path, GENERATOR_README_FILENAME)

    // // // //
    // // // //
    // TODO - implement logging function
    // console.log(generator_path)
    // console.log(generator_meta_path)
    // console.log(generator_readme_path)
    // // // //
    // // // //

    // Try to load up the generator & associated metadata, catch error
    try {
      // Require the class dynamically
      const GeneratorClass = require(generator_path); // eslint-disable-line import/no-dynamic-require
      const GeneratorMeta = require(generator_meta_path); // eslint-disable-line import/no-dynamic-require

      // Pull in the generator's README.md
      const foundReadme: boolean = fs.existsSync(generator_readme_path);

      // Adds generator to this.generators if requirements are met
      // if (GeneratorClass && GeneratorMeta && foundReadme) {
      if (GeneratorClass && GeneratorMeta && foundReadme) {

        // Adds generator_path (VERY IMPORTANT) to GeneratorMeta
        GeneratorMeta.engine_path = engine_path
        GeneratorMeta.generator_path = generator_path

        // Adds readme_markown to GeneratorMeta
        GeneratorMeta.readme = fs.readFileSync(generator_readme_path, 'utf8')

        // Tracks GeneratorMeta in this.generators
        this.generators.push(GeneratorMeta)

        // Logs
        // console.info(`Registered ${GeneratorClass.name} generator`)
        // console.info(`Registered generator`)
        return
      }

      // Logs which generator is being run
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        console.log('REGISTRATION ERROR - GENERATOR NOT FOUND')
        throw err;
      } else {
        console.log('REGISTRATION ERROR - OTHER')
        throw err;
      }
    }
  }

  // writeBuildManifest
  // Writes the build and the blueprint data to the destination directory
  async writeBuildManifest({ build }) {
    let output_directory = build.id || ''
    const destRoot = path.join(this.options.cwd, OUTPUT_DIRECTORY, output_directory, build.blueprint.identifier);
    await this.ensureDir(destRoot)

    const manifestDest = path.join(destRoot, CODOTYPE_MANIFEST_DIRECTORY);
    await this.ensureDir(manifestDest)

    // Writes two source files into the `.codotype` directory
    return new Promise((resolve, reject) => {
      fs.writeFileSync(path.join(manifestDest + '/codotype-build.json'), JSON.stringify(build, null, 2))
      fs.writeFileSync(path.join(manifestDest + `/${build.blueprint.identifier}-codotype-blueprint.json`), JSON.stringify(build.blueprint, null, 2))
      return resolve()
    });
  }

  // ensureDir
  // Ensures presence of directory for template compilation
  // TODO - this is repeated in @codotype/generator - should be abstracted, or only encapsulated in the runtime
  ensureDir(dir) {
    return new Promise((resolve, reject) => {
      return this.fs.ensureDir(dir, (err) => {
        if (err) return reject(err)
        return resolve()
      })
    })
  }

  // getGenerators
  // Returns an array of generators registered to this runtime instance
  getGenerators() {
    return this.generators;
  }

  // write
  // Method for write files to the filesystem
  // TODO - accept OUTPUT_DIRECTORY override
  async execute({ build }) {

    // Pulls attributes out of build object
    let {
      id,
      blueprint,
      configuration,
      generator_id
    } = build

    // Inflates blueprint metadata
    // TODO - handle missing blueprint object
    blueprint = inflate({ blueprint });

    // TODO - annotate this
    await this.writeBuildManifest({ build })

    // Pulls generator from registry runtime registry
    // TODO - conflate each stage to its respective generator,
    // skipping / throwing errors on those whos generator is missing
    const generator = this.generators.find(g => g.id === generator_id)
    if (!generator) return
    const { generator_path } = generator

    // Sets output_directory default to build ID by default
    const output_directory = id || '';

    // Assigns `dest` option for generator
    // TODO - handle condition of missing blueprint.identifier
    const dest = path.join(this.options.cwd, OUTPUT_DIRECTORY, output_directory, blueprint.identifier);

    // Try to load up the generator from generator_path, catch error
    // TODO - this final check should be abstracted into a separate function
    try {
      // const GeneratorClass = require(generator_path); // eslint-disable-line import/no-dynamic-require
      const generatorPrototype = require(generator_path); // eslint-disable-line import/no-dynamic-require
      const resolved = require.resolve(generator_path);

      // Defines options for generator instance
      const generatorOptions = {
        blueprint,
        dest,
        resolved,
        meta: generator,
        configuration,
        runtime: this
      }

      // Logging
      // console.info(`Executing ${GeneratorClass.name} generators:`)
      console.info(`Executing generators:`)

      // Creates CodotypeGenerator instance
      // TODO - pass runtime into this constructor (in generatorOptions)
      const generatorInstance = new CodotypeGenerator(generatorPrototype, generatorOptions)

      // Invokes `generator.forEachSchema` once for each in blueprint.schemas
      await Promise.all(blueprint.schemas.map((schema) => generatorInstance.forEachSchema({ schema: schema, ...this.options })))

      // Invokes `generator.forEachRelation` once for each in blueprint.schemas
      await Promise.all(blueprint.schemas.map((schema) => {
        return Promise.all(schema.relations.map((relation) => {
          return generatorInstance.forEachRelation({ schema: schema, relation, ...this.options })
        }))
      }))

      // Invokes `generator.forEachReverseRelation` once for each in blueprint.schemas
      await Promise.all(blueprint.schemas.map((schema) => {
        return Promise.all(schema.reverse_relations.map((relation) => {
          return generatorInstance.forEachReverseRelation({ schema: schema, relation, ...this.options })
        }))
      }))

      // Invokes `generator.write()` once
      await generatorInstance.write(this.options)

      // Invokes generator.compileTemplatesInPlace()
      await generatorInstance.compileTemplatesInPlace()

      // Logs which generator is being run
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        console.log('RUNTIME ERROR - GENERATOR NOT FOUND')
      } else {
        console.log('RUNTIME ERROR - OTHER')
        throw err;
      }
      // return reject(err)
    }

    // Thank you message
    console.log('\nBuild complete\nThank you for using Codotype :)\nFollow us on github.com/codotype\n')
  }

  // // // //

  /**
   * templatePath
   * Generates the full path to a specific template file, relative to the filepath of the generator in-which the template is compiled
   * @param {string} generatorResolved
   * @param {string} template_path
   */
  templatePath(generatorResolved, template_path = './') {
    return path.join(generatorResolved, 'templates', template_path)
  }

  // destinationPath
  // Takes the destination name for a template and Generates
  destinationPath(destPath, dest = './') {
    return path.join(destPath, dest)
  }

  // // // //
  // // // //

  // renderTemplate
  // Compiles an EJS template and returns the result
  renderTemplate(generatorInstance, src, options = {}) {
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
        ...Datatype,
        ...RelationType,
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

  // // // //
  // // // //

  // TODO - document
  existsSync(dest) {
    return this.fs.existsSync(dest)
  }

  // TODO - document
  compareFile(dest, compiledTemplate) {
    // TODO - document
    const existing = this.fs.readFileSync(dest, 'utf8')

    // If exists, and it's the same, SKIP
    if (compiledTemplate === existing) {
      return true
    } else {
      return false
    }
  }

  // TODO - document
  writeFile(dest, compiledTemplate) {
    return new Promise((resolve, reject) => {
      this.fs.writeFile(dest, compiledTemplate, (err) => {
        if (err) return reject(err)
        // console.log('Wrote: ' + dest)
        // console.log('\n')
        return resolve();
      });
    })
  }

  // // // //
  // // // //

  // copyDir
  // copy a directory from src to dest'
  // TODO - abstract FS-level operations into @codotype/runtime
  async copyDir(src, dest) {
    return new Promise((resolve, reject) => {
      return this.fs.copy(src, dest, (err) => {
        if (err) return reject(err)
        return resolve()
      })
    })
  }

  // // // //
  // // // //

  // TODO - document
  // TODO - Add `verbose` option to runtime to conditionally output log statements
  // TODO - add `chalk` dependency for pretty logging
  log(...args) {
    console.log(...args)
  }

  // // // //
  // // // //

  // composeWith
  // Enables one generator to fire off several child generators
  // TODO - clean up + document this function
  // TODO - clean up + document this function
  // TODO - clean up + document this function
  // TODO - abstract most of this into @codotype/runtime
  async composeWith(parentGeneratorInstance, generatorModule, options = {}) {

    // Defines module path
    let modulePath

    // // // //
    // // // //
    // // // //
    // TODO - move this into a function ( `getModulePath`, perhaps )
    // Handle relative paths
    if (generatorModule.startsWith('./') || generatorModule.startsWith('../')) {

      // TODO - document
      let base = ''

      // TODO - abstract into helper function?
      const stats = this.fs.statSync(parentGeneratorInstance.resolved)

      // TODO - document
      // TODO - document
      if (stats.isDirectory()) {
        base = parentGeneratorInstance.resolved
      } else {
        base = path.dirname(parentGeneratorInstance.resolved)
      }

      // TODO - document
      modulePath = path.join(base, generatorModule)

      // Handle absolute path
      // } else if (generatorModule.absolute_path) {
    } else if (generatorModule.startsWith('/')) {

      modulePath = path.join(generatorModule)

      // Handle module path
    } else {
      modulePath = path.join(parentGeneratorInstance.options.meta.engine_path, 'node_modules', generatorModule)
    }
    // // // //
    // // // //

    try {
      // console.log(modulePath)

      // TODO - document
      // TODO - document
      // TODO - abstract into @codotype/runtime
      const generatorPrototype = require(modulePath); // eslint-disable-line import/no-dynamic-require
      generatorPrototype.resolved = require.resolve(modulePath);

      // TODO - document
      // TODO - document
      // TODO - move into independent function, `getResolvedGeneratorPath`, perhaps
      // TODO - abstract into @codotype/runtime HELPER function
      let resolvedGeneratorPath = generatorPrototype.resolved.split('/')
      resolvedGeneratorPath.pop()
      resolvedGeneratorPath = resolvedGeneratorPath.join('/')

      // // // //
      // // // //
      // TODO - move into independent function, `resolveDestination`, perhaps
      // TODO - document
      // TODO - document
      // TODO - document
      // TODO - abstract into @codotype/runtime
      let resolvedDestination = parentGeneratorInstance.options.dest
      // @ts-ignore
      if (options.scope) {
        // @ts-ignore
        resolvedDestination = path.resolve(parentGeneratorInstance.options.dest, options.scope)
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
      // TODO - abstract into @codotype/runtime
      // TODO - pass in @codotype/runtime instance here
      const generator = new CodotypeGenerator(generatorPrototype, {
        ...parentGeneratorInstance.options,
        dest: resolvedDestination,
        resolved: resolvedGeneratorPath
      })

      // Invokes `generator.forEachSchema` once for each in blueprint.schemas
      // TODO - abstract into @codotype/runtime
      await Promise.all(parentGeneratorInstance.options.blueprint.schemas.map((schema) => generator.forEachSchema({ schema: schema, ...parentGeneratorInstance.options })))

      // Invokes `generator.forEachRelation` once for each in blueprint.schemas
      await Promise.all(parentGeneratorInstance.options.blueprint.schemas.map((schema) => {
        return Promise.all(schema.relations.map((relation) => {
          return generator.forEachRelation({ relation, schema: schema, ...parentGeneratorInstance.options })
        }))
      }))

      // Invokes `generator.forEachReverseRelation` once for each in blueprint.schemas
      await Promise.all(parentGeneratorInstance.options.blueprint.schemas.map((schema) => {
        return Promise.all(schema.reverse_relations.map((relation) => {
          return generator.forEachReverseRelation({ relation, schema: schema, ...parentGeneratorInstance.options })
        }))
      }))

      // Invokes `generator.write()` once
      // TODO - abstract into @codotype/runtime
      await generator.write(parentGeneratorInstance.options)

      // Invokes generator.compileTemplatesInPlace()
      // TODO - abstract into @codotype/runtime
      await generator.compileTemplatesInPlace()

      // Logs output
      // TODO - add --verbose flag to conditionally print this output
      // TODO - all logging should take place in @codotype/runtime
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

  // // // //
  // // // //

}
