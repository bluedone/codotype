import {
    Relation,
    Project,
    Schema,
    GeneratorConstructorParams,
    RuntimeInjectorProps,
    RuntimeAdapter,
    RuntimeProxy,
    Runtime,
    ComposeWithOptions,
} from "@codotype/core";

// // // //

/**
 * RuntimeAdapter?
 * RuntimeProxyAdapter?
 * TODO - rename this to RuntimeAdapter?
 * Implements an adapter between the RuntimeProxy and the Runtime
 * Allows a generator to safely access and invoke simplified Runtime methods for abstract filesystem manipulation
 */
export class RuntimeProxyAdapter implements RuntimeAdapter {
    private runtime: Runtime;
    compileInPlace: string[];
    options: RuntimeInjectorProps;
    resolved: string;
    runtimeProxy: RuntimeProxy;

    /**
     * constructor
     * Handles build options
     */
    constructor(
        generatorConfiguration: GeneratorConstructorParams,
        options: RuntimeInjectorProps,
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

        // Validates GeneratorConfiguration
        if (
            !generatorConfiguration.write &&
            !generatorConfiguration.compileInPlace &&
            !generatorConfiguration.forEachSchema &&
            !generatorConfiguration.forEachRelation &&
            !generatorConfiguration.forEachReverseRelation
        ) {
            throw Error(
                "GeneratorConfiguration requires either write, forEachSchema, forEachRelation, forEachReverseRelation, or compileInPlace properties",
            );
        }

        // Assigns this.runtime
        // this.runtime must be a compatible CodotypeRuntime class instance
        this.runtime = options.runtime;

        // Assigns generatorConfiguration
        this.write = generatorConfiguration.write || this.write;
        this.forEachSchema =
            generatorConfiguration.forEachSchema || this.forEachSchema;
        this.forEachRelation =
            generatorConfiguration.forEachRelation || this.forEachRelation;
        this.forEachReverseRelation =
            generatorConfiguration.forEachReverseRelation ||
            this.forEachReverseRelation;
        this.compileInPlace = generatorConfiguration.compileInPlace || [];

        // Assigns this.options
        this.options = options;

        // PASS this.options.resolved in from @codotype/runtime
        this.resolved = this.options.resolved;

        // Defuines this.runtimeProxy
        this.runtimeProxy = {
            ensureDir: this.ensureDir,
            writeFile: this.writeFile,
            copyDir: this.copyDir,
            renderComponent: this.renderComponent,
            copyTemplate: this.copyTemplate,
            templatePath: this.templatePath,
            destinationPath: this.destinationPath,
            composeWith: this.composeWith,
        };

        // Returns the instance
        return this;
    }

    /**
     * write
     * Method to write files to the filesystem
     */
    async write({
        project,
        runtime,
    }: {
        project: Project;
        runtime: RuntimeProxy;
    }): Promise<void> {
        // Display warning if generator doesn't implement its own write method?
        // console.warn(
        //   "NOTHING TO WRITE - this should be overwritten by a subclassed generator."
        // );
        return Promise.resolve();
    }

    /**
     * forEachSchema
     * Method to write files to the filesystem for each schema in blueprints.schemas
     * @param - see `WriteFunctionProps`
     */
    async forEachSchema({
        schema,
        project,
        runtime,
    }: {
        schema: Schema;
        project: Project;
        runtime: RuntimeProxy;
    }): Promise<void> {
        // console.log('NOTHING TO WRITE - this should be overwritten by a subclassed generator.')
        return Promise.resolve();
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
        schema: Schema;
        relation: Relation;
        project: Project;
        runtime: RuntimeProxy;
    }): Promise<void> {
        // console.log('NOTHING TO WRITE - this should be overwritten by a subclassed generator.')
        return Promise.resolve();
    }

    /**
     * forEachReverseRelation
     * TODO - rename this function to forEachRelation
     * @param - see `WriteFunctionProps`
     */
    async forEachReverseRelation({
        schema,
        relation,
        project,
    }: {
        schema: Schema;
        relation: Relation;
        project: Project;
    }): Promise<void> {
        // console.log('NOTHING TO WRITE - this should be overwritten by a subclassed generator.')
        return Promise.resolve();
    }

    // ensureDir
    // Ensures presence of directory for template compilation
    ensureDir(dir: string) {
        return this.runtime.ensureDir(this.destinationPath(dir));
    }

    /**
     * copDir
     * copy a directory from src to dest'copy a directory from src to dest
     */
    copyDir(params: { src: string; dest: string }) {
        const { src, dest } = params;
        return this.runtime.copyDir({
            src: this.templatePath(src),
            dest: this.destinationPath(dest),
        });
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
                    this.destinationPath(template),
                );
            }),
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
            data,
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
    copyTemplate(
        src: string,
        dest: string,
        options: object = {},
    ): Promise<boolean> {
        // DEBUG
        // console.log('Copying:' + dest)

        return new Promise(async (resolve, reject) => {
            // DEBUG
            // this.runtime.log('Rendering:' + dest)

            // Compiles the template through CodotypeRuntime.renderTemplate
            const compiledTemplate: string = await this.runtime.renderTemplate(
                this,
                src,
                options,
            );

            // DEBUG
            // this.runtime.log('Rendered:' + dest)

            // TODO - DOCUMENT!!!
            // Does the destination already exist?
            const exists = this.runtime.fileExists(dest);

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
        return this.runtime.destinationPath(
            this.options.dest,
            destination_path,
        );
    }

    /**
     * writeFile
     * TODO - annotate this
     * @param destinationPath
     * @param compiledTemplate
     */
    writeFile(destinationPath: string, compiledTemplate: string) {
        return this.runtime.writeFile(destinationPath, compiledTemplate);
    }

    /**
     * composeWith
     * Enables one generator to fire off several child generators
     * @param generatorModule
     * @param options - TODO - add type for ComposeWithOptions -> WHAT ARE THEY????
     */
    composeWith(
        generatorModule: string,
        options?: ComposeWithOptions,
    ): Promise<void> {
        return this.runtime.composeWith(this, generatorModule, options || {});
    }
}
