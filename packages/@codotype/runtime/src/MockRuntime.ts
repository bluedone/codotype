import { Datatype, RelationType } from "@codotype/core";
import {
    CodotypeRuntime,
    PluginRegistration,
    CodotypeRuntimeConstructorOptions,
    RuntimeLogLevel,
    RuntimeAdaptor,
} from "./types";
import * as path from "path";
import * as ejs from "ejs";
import { CodotypeGenerator } from "./generator";

// // // //

// Mock CodotypeRuntime class definition
export class MockRuntime implements CodotypeRuntime {
    options: CodotypeRuntimeConstructorOptions;
    plugins: PluginRegistration[];

    _mocks_: {
        ensuredDir: string;
        copiedDirSrc: string;
        copiedDirDest: string;
        files: { [key: string]: string };
    };

    // constructor
    // Handles options to run a single generator instance
    constructor(options: CodotypeRuntimeConstructorOptions) {
        // Assigns this.options
        this.options = options;

        // Sets default mocks
        this._mocks_ = {
            ensuredDir: "",
            copiedDirDest: "",
            copiedDirSrc: "",
            files: {},
        };

        // Assigns this.plugins
        this.plugins = [];

        // Assigns this.options.cwd
        this.options.cwd = process.cwd();

        // Returns the runtime instance
        return this;
    }

    log(msg: any, options: { level: RuntimeLogLevel }): void {
        console.log(msg);
    }

    registerPlugin(props: {
        modulePath?: string;
        relativePath?: string;
        absolutePath?: string;
    }): Promise<PluginRegistration> {
        return Promise.resolve(this.plugins[0]);
    }

    execute(): Promise<void> {
        return Promise.resolve();
    }

    // ensureDir
    // Ensures presence of directory for template compilation
    // TODO - this is repeated in @codotype/generator - should be abstracted, or only encapsulated in the runtime
    async ensureDir(dir: string): Promise<boolean> {
        this._mocks_.ensuredDir = dir;
        return new Promise((resolve, reject) => {
            return resolve(true);
        });
    }

    // templatePath
    templatePath(generatorResolved: string, template_path = "./") {
        // return path.join(generatorResolved, "templates", template_path);
        return path.join(generatorResolved, "templates", template_path);
    }

    // destinationPath
    destinationPath(destPath: string, dest = "./") {
        return path.join(destPath, dest);
    }

    // renderTemplate
    // Compiles an EJS template and returns the result
    renderTemplate(
        generatorInstance: RuntimeAdaptor,
        src: string,
        options = {},
    ) {
        return new Promise<string>((resolve, reject) => {
            // default options padded into the renderFile
            let renderOptions = {};

            // // // //
            // // // //
            // TODO - document this structure
            // The `data` object is passed into each file that gets rendered
            // TODO - this should be abstracted into a separate function
            const data = {
                project: generatorInstance.options.project,
                meta: generatorInstance.options.plugin,
                configuration: generatorInstance.options.project.configuration,
                helpers: {
                    // indent,
                    // trailingComma,
                },
                Datatype: Datatype,
                RelationType: RelationType,
                ...options, // QUESTION - are options ever used here?
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

    fileExists(dest: string): Promise<boolean> {
        // return this.fs.existsSync(dest);
        return Promise.resolve(true);
    }

    compareFile(dest: string, compiledTemplate: string): Promise<boolean> {
        return Promise.resolve(this._mocks_.files[dest] === compiledTemplate);
    }

    writeFile(dest: string, compiledTemplate: string) {
        this._mocks_ = {
            ...this._mocks_,
            files: {
                ...this._mocks_.files,
                [dest]: compiledTemplate,
            },
        };
        return Promise.resolve(true);
    }

    // copyDir
    copyDir(src: string, dest: string): Promise<boolean> {
        this._mocks_.copiedDirSrc = src;
        this._mocks_.copiedDirDest = dest;
        return new Promise((resolve, reject) => {
            return resolve(true);
        });
    }

    // composeWith
    async composeWith(
        parentGeneratorInstance: RuntimeAdaptor, // TODO - fix this
        generatorModule: string,
        options = {},
    ) {}
}
