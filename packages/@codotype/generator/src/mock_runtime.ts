import * as path from "path";
import * as ejs from "ejs";
import { indent, trailingComma, Datatype, RelationType } from "@codotype/core";

// Mock CodotypeRuntime class definition
export class MockRuntime {
  fs: any;
  options: { [key: string]: any };
  generators: any[];
  _mocks_: {
    ensuredDir: string;
    copiedDirSrc: string;
    copiedDirDest: string;
    files: { [key: string]: string };
  };

  // constructor
  // Handles options to run a single generator instance
  constructor(options = {}) {
    // Assigns this.options
    this.options = options;

    // Sets default mocks
    this._mocks_ = {
      ensuredDir: "",
      copiedDirDest: "",
      copiedDirSrc: "",
      files: {}
    };

    // Assigns this.generators
    this.generators = [];

    // Assigns this.options.cwd
    this.options.cwd = process.cwd();

    // Returns the runtime instance
    return this;
  }

  // ensureDir
  // Ensures presence of directory for template compilation
  // TODO - this is repeated in @codotype/generator - should be abstracted, or only encapsulated in the runtime
  async ensureDir(dir): Promise<boolean> {
    this._mocks_.ensuredDir = dir;
    return new Promise((resolve, reject) => {
      return resolve(true);
    });
  }

  // templatePath
  templatePath(generatorResolved, template_path = "./") {
    // return path.join(generatorResolved, "templates", template_path);
    return path.join(generatorResolved, "templates", template_path);
  }

  // destinationPath
  destinationPath(destPath, dest = "./") {
    return path.join(destPath, dest);
  }

  // renderTemplate
  // Compiles an EJS template and returns the result
  renderTemplate(generatorInstance, src, options = {}) {
    return new Promise((resolve, reject) => {
      // default options padded into the renderFile
      let renderOptions = {};

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
        Datatype: Datatype,
        RelationType: RelationType,
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

  existsSync(dest) {
    // return this.fs.existsSync(dest);
    return true;
  }

  compareFile(dest, compiledTemplate) {
    return this._mocks_.files[dest] === compiledTemplate;
  }

  writeFile(dest, compiledTemplate) {
    this._mocks_ = {
      ...this._mocks_,
      files: {
        ...this._mocks_.files,
        [dest]: compiledTemplate
      }
    };
    return Promise.resolve(true);
  }

  // copyDir
  copyDir(src, dest) {
    this._mocks_.copiedDirSrc = src;
    this._mocks_.copiedDirDest = dest;
    return new Promise((resolve, reject) => {
      return resolve();
    });
  }

  // composeWith
  async composeWith(parentGeneratorInstance, generatorModule, options = {}) { }
}
