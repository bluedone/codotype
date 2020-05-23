import * as fs from "fs";
import * as fsExtra from "fs-extra";
import * as path from "path";
import * as ejs from "ejs";
import { indent, trailingComma, inflateProject } from "@codotype/util";
import {
  Datatype,
  InflatedProject,
  RelationType,
  Project,
  InflatedSchema
} from "@codotype/types";
import { CodotypeGenerator, GeneratorOptions } from "@codotype/generator";

// // // //
// Constants

const OUTPUT_DIRECTORY: string = "codotype-build";
const CODOTYPE_MANIFEST_DIRECTORY: string = ".codotype";
const MODULES_ROOT: string = "node_modules";
const GENERATOR_META_FILENAME: string = "generator/meta.js";
const GENERATOR_CLASS_PATH: string = "generator";
const GENERATOR_README_FILENAME: string = "README.md";

// // // //

interface CodotypeRuntimeConstructorOptions {
  cwd: string;
}

export interface CodotypeBuildJob {
  id: string;
  project: Project;
}

// // // //

// CodotypeRuntime class definition
export class CodotypeNodeRuntime {
  fs: any;
  options: CodotypeRuntimeConstructorOptions;
  generators: any[];

  // constructor
  // Handles options to run a single generator instance
  constructor(options = {}) {
    // Assigns this.options
    // Assigns this.options.cwd
    this.options = {
      ...options,
      cwd: process.cwd()
    };

    // TODO - add option for LOG_LEVEL
    // TODO - add option for FORCE (overwrite existing files, or prompt user to overwrite if changes are detected)

    // Assigns this.generators
    this.generators = [];

    // Attaches fsExtra as this.fs
    this.fs = fsExtra;

    // Returns the runtime instance
    return this;
  }

  // registerGenerator
  // Registers an individual generator by it's node_modules name
  // i.e. 'codotype-generator-nuxt' in `node_modules/codotype-generator-nuxt'`
  registerGenerator(params: {
    module_path?: string;
    relative_path?: string;
    absolute_path?: string;
  }) {
    // Resolves path to generator
    let engine_path: string = "";

    // Pulls module_path, relative_path, absoluate_path from params
    const {
      module_path = null,
      relative_path = null,
      absolute_path = null
    } = params;

    if (module_path) {
      // Generator is located in node_modules
      engine_path = path.join(this.options.cwd, MODULES_ROOT, module_path);
    } else if (relative_path) {
      // Generator is located relative to process.cwd()
      engine_path = path.join(this.options.cwd, relative_path);
    } else if (absolute_path) {
      // Generator path is absolute path on the filesystem, i.e. /tmp/my-generator
      engine_path = absolute_path;
    } else {
      throw new Error("No generator path provided");
    }

    // Construct path to the generator module
    const generator_path: string = path.join(engine_path, GENERATOR_CLASS_PATH);

    // Path to GENERATOR_META
    // NOTE - this should be reworked to accept `codotype-generator.js` or `codotype-generator.ts`
    const generator_meta_path: string = path.join(
      engine_path,
      GENERATOR_META_FILENAME
    );

    // Defines path to generator README.md
    const generator_readme_path: string = path.join(
      engine_path,
      GENERATOR_README_FILENAME
    );

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
      let GeneratorMeta = require(generator_meta_path); // eslint-disable-line import/no-dynamic-require

      // Destructures the default export into GeneratorMeta
      GeneratorMeta = { ...GeneratorMeta.default };

      // Debugging new GeneratorMeta import
      // console.log("GeneratorMeta");
      // console.log(JSON.stringify(GeneratorMeta, null, 4));

      // Pull in the generator's README.md
      const foundReadme: boolean = fs.existsSync(generator_readme_path);

      // Adds generator to this.generators if requirements are met
      // if (GeneratorClass && GeneratorMeta && foundReadme) {
      if (GeneratorClass && GeneratorMeta && foundReadme) {
        // Adds generator_path (VERY IMPORTANT) to GeneratorMeta
        GeneratorMeta.engine_path = engine_path;
        GeneratorMeta.generator_path = generator_path;

        // Adds readme_markown to GeneratorMeta
        GeneratorMeta.documentation = fs.readFileSync(
          generator_readme_path,
          "utf8"
        );

        // Tracks GeneratorMeta in this.generators
        this.generators.push(GeneratorMeta);

        // Logs
        // console.info(`Registered ${GeneratorClass.name} generator`)
        console.info(`Registered generator`);
        return;
      }

      // Logs which generator is being run
    } catch (err) {
      if (err.code === "MODULE_NOT_FOUND") {
        console.log("REGISTRATION ERROR - GENERATOR NOT FOUND");
        throw err;
      } else {
        console.log("REGISTRATION ERROR - OTHER");
        throw err;
      }
    }
  }

  /**
   * writeBuildManifest
   * Writes the build and the blueprint data to the destination directory
   * @param param.build - see CodotypeBuildJob
   */
  async writeBuildManifest({ build }: { build: CodotypeBuildJob }) {
    // Debug log statements
    console.log("Wroting build manfiest");

    // Defines directory to encapsulate build IFF build.id is defined
    let buildID: string = build.id || "";

    // Defines the destination directory for the build output
    const destRoot: string = path.join(
      this.options.cwd,
      OUTPUT_DIRECTORY,
      buildID,
      build.project.identifiers.snake
    );

    // Ensures presence of the destination directory
    await this.ensureDir(destRoot);

    // Defines destination directory for codotype-project.json (.codotype/ by default)
    const manifestDest = path.join(destRoot, CODOTYPE_MANIFEST_DIRECTORY);

    // Ensures presence of the manifestDest directory
    await this.ensureDir(manifestDest);

    // Writes two source files into the `.codotype` directory
    return new Promise((resolve, reject) => {
      // Writes Project JSON to output directory
      fs.writeFileSync(
        path.join(
          manifestDest +
            `/${build.project.identifiers.kebab}-codotype-project.json`
        ),
        JSON.stringify(build.project, null, 2)
      );

      // Debug log statement
      console.log("Wrote codotype-project.json");

      // Resolves the Promise
      return resolve();
    });
  }

  // ensureDir
  // Ensures presence of directory for template compilation
  // TODO - this is repeated in @codotype/generator - should be abstracted, or only encapsulated in the runtime
  ensureDir(dir) {
    return new Promise((resolve, reject) => {
      return fsExtra.ensureDir(dir, err => {
        if (err) return reject(err);
        return resolve();
      });
    });
  }

  // getGenerators
  // Returns an array of generators registered to this runtime instance
  getGenerators() {
    return this.generators;
  }

  // write
  // Method for write files to the filesystem
  // TODO - accept OUTPUT_DIRECTORY override
  async execute({ build }: { build: CodotypeBuildJob }) {
    // Logs debug statements
    console.log("CodotypeNodeRuntime - start execute({ build })");

    // Pulls attributes out of build object
    let { id, project } = build;

    // Inflates blueprint metadata
    const inflatedProject: InflatedProject = inflateProject({ project });

    // TODO - annotate this
    await this.writeBuildManifest({ build });

    // Pulls generator from registry runtime registry
    // TODO - conflate each stage to its respective generator,
    // skipping / throwing errors on those whos generator is missing
    const generator = this.generators.find(g => g.id === project.generatorId);

    // If generator is not found, log error message and short-circuit execution
    if (!generator) return;

    // Pulls generator_path from generator
    // TODO - why is this necessary...?
    const { generator_path } = generator;

    // Sets output_directory default to build ID by default
    const output_directory = id || "";

    // Assigns `dest` option for project output
    const dest = path.join(
      this.options.cwd,
      OUTPUT_DIRECTORY,
      output_directory,
      inflatedProject.identifiers.snake
    );

    // Try to load up the generator from generator_path, catch error
    // TODO - this final check should be abstracted into a separate function
    try {
      // const GeneratorClass = require(generator_path); // eslint-disable-line import/no-dynamic-require
      const generatorPrototype = require(generator_path); // eslint-disable-line import/no-dynamic-require
      const resolved = require.resolve(generator_path);

      // Defines options for generator instance
      const generatorOptions: GeneratorOptions = {
        project,
        dest,
        resolved,
        meta: generator,
        configuration: project.configuration,
        // @ts-ignore
        runtime: this
      };

      // Logging
      // console.info(`Executing ${GeneratorClass.name} generators:`)
      console.info(`Executing generators:`);

      // Creates CodotypeGenerator instance
      // TODO - pass runtime into this constructor (in generatorOptions)
      // @ts-ignore
      const generatorInstance = new CodotypeGenerator(
        generatorPrototype,
        generatorOptions
      );

      // Debug log statement
      console.log("Instantiated CodotypeGenerator Instance");

      // Invokes `generator.forEachSchema` once for each in inflatedProject.schemas
      await Promise.all(
        inflatedProject.schemas.map(schema =>
          generatorInstance.forEachSchema({
            schema,
            project: inflatedProject
          })
        )
      );

      // Invokes `generator.forEachRelation` once for each in inflatedProject.schemas
      await Promise.all(
        inflatedProject.schemas.map(schema => {
          return Promise.all(
            schema.relations.map(relation => {
              return generatorInstance.forEachRelation({
                schema: schema,
                relation,
                project: inflatedProject
              });
            })
          );
        })
      );

      // Invokes `generator.forEachReverseRelation` once for each in inflatedProject.schemas
      await Promise.all(
        inflatedProject.schemas.map(schema => {
          return Promise.all(
            schema.references.map(relation => {
              return generatorInstance.forEachReverseRelation({
                schema: schema,
                relation,
                project: inflatedProject
              });
            })
          );
        })
      );

      // Invokes `generator.write()` once
      await generatorInstance.write({ project: inflatedProject });

      // Invokes generator.compileTemplatesInPlace()
      await generatorInstance.compileTemplatesInPlace();

      // Logs which generator is being run
    } catch (err) {
      if (err.code === "MODULE_NOT_FOUND") {
        console.log("RUNTIME ERROR - GENERATOR NOT FOUND");
      } else {
        console.log("RUNTIME ERROR - OTHER");
        throw err;
      }
      // return reject(err)
    }

    // Thank you message
    console.log(
      "\nBuild complete\nThank you for using Codotype :)\nFollow us on github.com/codotype\n"
    );
  }

  // // // //

  /**
   * templatePath
   * Generates the full path to a specific template file, relative to the filepath of the generator in-which the template is compiled
   * @param {string} generatorResolved
   * @param {string} template_path
   */
  templatePath(generatorResolved, template_path = "./") {
    return path.join(generatorResolved, "templates", template_path);
  }

  // destinationPath
  // Takes the destination name for a template and Generates
  destinationPath(destPath, dest = "./") {
    return path.join(destPath, dest);
  }

  // // // //
  // // // //

  // renderTemplate
  // Compiles an EJS template and returns the result
  renderTemplate(generatorInstance, src, options = {}) {
    return new Promise((resolve, reject) => {
      // default options padded into the renderFile
      let renderOptions = {};

      // // // //
      // // // //
      // TODO - type this object - TemplateProps interface
      // The `data` object is passed into each file that gets rendered
      // TODO - this should be abstracted into a separate function
      const data = {
        project: generatorInstance.options.project,
        meta: generatorInstance.options.meta,
        // configuration: generatorInstance.options.configuration,
        helpers: {
          indent,
          trailingComma
          // forEachSchema
          // forEachAttribute
          // forEachRelation
          // forEachReverseRelation / forEachReference
        },
        RelationType,
        Datatype,
        ...options // QUESTION - are options ever used here?
      };
      // // // //
      // // // //

      // Compiles EJS template
      return ejs.renderFile(src, data, renderOptions, (err, str) => {
        // Handles template compilation error
        if (err) return reject(err);

        // Resolves with compiled template
        return resolve(str);
      });
    });
  }

  // // // //
  // // // //

  // TODO - document
  existsSync(dest) {
    return this.fs.existsSync(dest);
  }

  // TODO - document
  compareFile(dest, compiledTemplate) {
    // TODO - document
    const existing = this.fs.readFileSync(dest, "utf8");

    // If exists, and it's the same, SKIP
    if (compiledTemplate === existing) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * writeFile
   * Writes a compiled template to a file
   * @param dest - the destination where the compiledTemplate is being written
   * @param compiledTemplate - the text being written inside `dest`
   */
  writeFile(dest: string, compiledTemplate: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.fs.writeFile(dest, compiledTemplate, err => {
        // Handle error
        if (err) {
          // Logs debug statement
          this.log("writeFile error: " + dest);

          // Rejects error
          return reject(err);
        }

        // Logs debug statement
        this.log("writeFile: " + dest);

        // Resovles
        return resolve();
      });
    });
  }

  // // // //
  // // // //

  // copyDir
  // copy a directory from src to dest'
  // TODO - abstract FS-level operations into @codotype/runtime
  async copyDir(src, dest) {
    return new Promise((resolve, reject) => {
      return this.fs.copy(src, dest, err => {
        if (err) return reject(err);
        return resolve();
      });
    });
  }

  // // // //
  // // // //

  // TODO - document
  // TODO - Add `verbose` option to runtime to conditionally output log statements
  // TODO - add `chalk` dependency for pretty logging
  log(...args) {
    console.log(...args);
  }

  // // // //

  // composeWith
  // Enables one generator to fire off several child generators
  // TODO - clean up + document this function
  // TODO - clean up + document this function
  // TODO - clean up + document this function
  async composeWith(
    parentGeneratorInstance: CodotypeGenerator,
    generatorModule: string,
    options = {}
  ) {
    // Debug log statement
    console.log("Composing with generator");

    // Defines module path
    let modulePath: string = "";

    // // // //

    // TODO - move this into a function ( `getModulePath`, perhaps )
    // Handle relative paths
    if (generatorModule.startsWith("./") || generatorModule.startsWith("../")) {
      // TODO - document
      let base: string = "";

      // TODO - abstract into helper function?
      const stats = this.fs.statSync(parentGeneratorInstance.resolved);

      // TODO - document
      // TODO - document
      if (stats.isDirectory()) {
        base = parentGeneratorInstance.resolved;
      } else {
        base = path.dirname(parentGeneratorInstance.resolved);
      }

      // TODO - document
      modulePath = path.join(base, generatorModule);

      // Handle absolute path
      // } else if (generatorModule.absolute_path) {
    } else if (generatorModule.startsWith("/")) {
      modulePath = path.join(generatorModule);

      // Handle module path
    } else {
      modulePath = path.join(
        parentGeneratorInstance.options.meta.engine_path,
        "node_modules",
        generatorModule
      );
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
      let resolvedGeneratorPath = generatorPrototype.resolved.split("/");
      resolvedGeneratorPath.pop();
      resolvedGeneratorPath = resolvedGeneratorPath.join("/");

      // // // //
      // // // //
      // TODO - move into independent function, `resolveDestination`, perhaps
      // TODO - document
      // TODO - document
      // TODO - document
      // TODO - abstract into @codotype/runtime
      let resolvedDestination = parentGeneratorInstance.options.dest;

      // TODO - re-introduce support for options.scope
      // options.scope is super important - need it to compose packages from one generator into another
      // // @ts-ignore
      // if (options.scope) {
      //   // @ts-ignore
      //   resolvedDestination = path.resolve(
      //     parentGeneratorInstance.options.dest,
      //     options.scope
      //   );
      // }

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

      // Inflates project
      const inflatedProject: InflatedProject = inflateProject({
        project: parentGeneratorInstance.options.project
      });

      // Creates new instance of generatorPrototype
      // TODO - document this a bit more
      // TODO - abstract into @codotype/runtime
      // TODO - pass in @codotype/runtime instance here
      const generator = new CodotypeGenerator(generatorPrototype, {
        ...parentGeneratorInstance.options,
        dest: resolvedDestination,
        resolved: resolvedGeneratorPath
      });

      // Invokes `generator.forEachSchema` once for each in project.schemas
      // TODO - abstract into @codotype/runtime
      await Promise.all(
        inflatedProject.schemas.map((schema: InflatedSchema) =>
          generator.forEachSchema({
            schema: schema,
            project: inflatedProject
          })
        )
      );

      // Invokes `generator.forEachRelation` once for each in project.schemas
      await Promise.all(
        inflatedProject.schemas.map((schema: InflatedSchema) => {
          return Promise.all(
            schema.relations.map(relation => {
              return generator.forEachRelation({
                relation,
                schema: schema,
                project: inflatedProject
              });
            })
          );
        })
      );

      // Invokes `generator.forEachReverseRelation` once for each in project.schemas
      // NOTE - this is currently commented out B.C. the updated Schema interface doesn't have a property for `reverse_relations`
      // TODO - the `reverse_relations` property should be added by the inflateMeta function
      await Promise.all(
        inflatedProject.schemas.map((schema: InflatedSchema) => {
          return Promise.all(
            schema.references.map(relation => {
              return generator.forEachReverseRelation({
                relation,
                schema: schema,
                project: inflatedProject
              });
            })
          );
        })
      );

      // Invokes `generator.write()` once
      // TODO - abstract into @codotype/runtime
      // @ts-ignore
      await generator.write(parentGeneratorInstance.options);

      // Invokes generator.compileTemplatesInPlace()
      // TODO - abstract into @codotype/runtime
      await generator.compileTemplatesInPlace();

      // Logs output
      // TODO - add --verbose flag to conditionally print this output
      // TODO - all logging should take place in @codotype/runtime
      console.log(`Generated ${generatorPrototype.name}.\n`);

      // Logs which generator is being run
    } catch (err) {
      if (err.code === "MODULE_NOT_FOUND") {
        console.log("MODULE NOT FOUND");
      } else {
        console.log("OTHER ERROR");
        console.log(err);
        throw err;
      }
    }
  }
}
