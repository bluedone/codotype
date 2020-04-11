import { buildDefault } from "@codotype/util";
import { MockRuntime } from "./mock_runtime";
import {
  RelationReference,
  InflatedProject,
  InflatedSchema,
} from "@codotype/types";

// // // //

// TODO - move this into @codotype/runtime - or @codotype/types?
interface CodotypeRuntime {
  templatePath: (resolvedPath: string, templatePath: string) => string;
  ensureDir: (dirPath: string) => Promise<boolean>;
  copyDir: (dirPath: string, destinationDirPath: string) => Promise<boolean>;
  renderTemplate: any;
  existsSync: (path: string) => boolean;
  compareFile: (
    destinationPath: string,
    compiledTemplate: string
  ) => Promise<any>;
  writeFile: (
    destinationPath: string,
    compiledTemplate: string
  ) => Promise<boolean>;
  destinationPath: (destination: string, filename: string) => string;
  composeWith: (generator: any, generatorModule: any, options: any) => any; // wtf is generatorModule
}

export interface GeneratorOptions {
  [key: string]: any;
  runtime: CodotypeRuntime | MockRuntime;
  resolved: string;
}

// TODO - add correct type signatures for these functions
export interface ConstructorOptions {
  name?: string;
  compileInPlace?: any;
  write?: (writeProps: { project: InflatedProject }) => Promise<void>;
  forEachRelation?: (params: {
    schema: InflatedSchema;
    relation: RelationReference;
    project: InflatedProject;
  }) => Promise<void>;
  forEachReverseRelation?: (params: {
    schema: InflatedSchema;
    relation: RelationReference;
    project: InflatedProject;
  }) => Promise<void>;
  forEachSchema?: (params: {
    schema: InflatedSchema;
    project: InflatedProject;
  }) => Promise<void>;
}

// // // //

/**
 * CodotypeGenerator
 * Encapsulates core features exposed to user-defined components
 */
export class CodotypeGenerator {
  runtime: CodotypeRuntime | MockRuntime;
  compileInPlace: any;
  options: GeneratorOptions;
  resolved: string;
  buildDefault: any; // What is this doing here?

  /**
   * constructor
   * Handles build options
   * TODO - pass in @codotype/runtime instance into this constructor (in options, maybe?)
   */
  constructor(
    constructorOptions: ConstructorOptions,
    options: GeneratorOptions
  ) {
    // Throw error if options.runtime isn't defined
    if (!options.runtime) {
      throw Error("CodotypeGenerator options requires options.runtime");
      return;
    }

    // Throw error if options.resolved isn't defined
    if (!options.resolved) {
      throw Error("CodotypeGenerator options requires options.resolved");
    }

    // Validates constructorOptions
    if (
      !constructorOptions.write &&
      !constructorOptions.compileInPlace &&
      !constructorOptions.forEachSchema &&
      !constructorOptions.forEachRelation &&
      !constructorOptions.forEachReverseRelation
    ) {
      throw Error(
        "CodotypeGenerator constructorOptions requires either write, forEachSchema, forEachRelation, forEachReverseRelation, or compileInPlace properties"
      );
    }

    // Assigns this.runtime
    // this.runtime must be a compatible CodotypeRuntime class instance
    this.runtime = options.runtime;

    // Assigns constructorOptions
    this.write = constructorOptions.write || this.write;
    this.forEachSchema = constructorOptions.forEachSchema || this.forEachSchema;
    this.forEachRelation =
      constructorOptions.forEachRelation || this.forEachRelation;
    this.forEachReverseRelation =
      constructorOptions.forEachReverseRelation || this.forEachReverseRelation;
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

  /**
   * write
   * Method to write files to the filesystem
   */
  async write({ project }: { project: InflatedProject }) {
    // Display warning if generator doesn't implement its own write method?
    // console.warn(
    //   "NOTHING TO WRITE - this should be overwritten by a subclassed generator."
    // );
  }

  /**
   * forEachSchema
   * Method to write files to the filesystem for each schema in blueprints.schemas
   * @param - see `WriteFunctionProps`
   */
  async forEachSchema({
    schema,
    project,
  }: {
    schema: InflatedSchema;
    project: InflatedProject;
  }) {
    // console.log('NOTHING TO WRITE - this should be overwritten by a subclassed generator.')
  }

  /**
   * forEachRelation
   * @param - see `WriteFunctionProps`
   */
  async forEachRelation({
    schema,
    relation,
    project,
  }: {
    schema: InflatedSchema;
    relation: RelationReference;
    project: InflatedProject;
  }) {
    // console.log('NOTHING TO WRITE - this should be overwritten by a subclassed generator.')
  }

  /**
   * forEachReverseRelation
   * TODO - rename this function to forEachRelationReference
   * @param - see `WriteFunctionProps`
   */
  async forEachReverseRelation({
    schema,
    relation,
    project,
  }: {
    schema: InflatedSchema;
    relation: RelationReference;
    project: InflatedProject;
  }) {
    // console.log('NOTHING TO WRITE - this should be overwritten by a subclassed generator.')
  }

  // ensureDir
  // Ensures presence of directory for template compilation
  ensureDir(dir: string) {
    return this.runtime.ensureDir(this.destinationPath(dir));
  }

  /**
   * copDir
   * copy a directory from src to dest'copy a directory from src to dest
   * @param param0
   */
  copyDir({ src, dest }: { src: string; dest: string }) {
    return this.runtime.copyDir(
      this.templatePath(src),
      this.destinationPath(dest)
    );
  }

  /**
   * compileTemplatesInPlace
   * Compiles and writes each template defined in the `compileInPlace` property
   */
  compileTemplatesInPlace() {
    // For each inPlaceTemplate, compile and write
    return Promise.all(
      this.compileInPlace.map((template: string) => {
        return this.copyTemplate(
          this.templatePath(template),
          this.destinationPath(template)
        );
      })
    );
  }

  /**
   * renderComponent
   * Compiles and writes each template defined in the `compileInPlace` property
   * @param - TODO
   */
  renderComponent({
    src,
    dest,
    data = {},
  }: {
    src: string;
    dest: string;
    data: { [key: string]: any };
  }) {
    return this.copyTemplate(
      this.templatePath(src),
      this.destinationPath(dest),
      data
    );
  }

  /**
   * copyTemplate
   * Compiles a template and writes to the dest location
   * TODO - split this up to rely on runtime methods instead of referencing FS directly
   * @param src
   * @param dest
   * @param options
   */
  copyTemplate(src: string, dest: string, options: object = {}): Promise<any> {
    // DEBUG
    // console.log('Copying:' + dest)

    return new Promise(async (resolve, reject) => {
      // DEBUG
      // this.runtime.log('Rendering:' + dest)

      // Compiles the template through CodotypeRuntime.renderTemplate
      const compiledTemplate: string = await this.runtime.renderTemplate(
        this,
        src,
        options
      );

      // DEBUG
      // this.runtime.log('Rendered:' + dest)

      // TODO - DOCUMENT!!!
      // Does the destination already exist?
      const exists = this.runtime.existsSync(dest);

      // TODO - DOCUMENT!!!
      // If it doesn't exist, OKAY TO WRITE
      if (exists) {
        if (this.runtime.compareFile(dest, compiledTemplate)) {
          return resolve();
        } else {
          // TODO - this needs a GitHub issue
          // If exists, and it's different, WRITE (add PROMPT option later, for safety)
          // TODO - this should happen inside the runtime, as input checking will vary depending on environment
        }
      }

      // Writes the compiled template to the dest location
      this.runtime.writeFile(dest, compiledTemplate).then(() => {
        return resolve();
      });
    });
  }

  /**
   * templatePath
   * Generates the full path to a specific template in the `./templates` directory relative to the generator
   * @param {string} template_path
   */
  templatePath(template_path: string = "./") {
    return this.runtime.templatePath(this.resolved, template_path);
  }

  /**
   * destinationPath
   * Gets the full destination path from the CodotypeRuntime
   * @param destination_path
   */
  destinationPath(destination_path: string = "./") {
    return this.runtime.destinationPath(this.options.dest, destination_path);
  }

  /**
   * composeWith
   * Enables one generator to fire off several child generators
   * @param generatorModule
   * @param options
   */
  composeWith(generatorModule: string, options?: any) {
    return this.runtime.composeWith(this, generatorModule, options);
  }
}
