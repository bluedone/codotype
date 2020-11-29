import {
    Relation,
    Project,
    Schema,
    GeneratorProps,
    RuntimeAdapterProps,
    RuntimeAdapter,
    RuntimeProxy,
    Runtime,
    ComposeWithOptions,
    PrettifyOptions,
} from "@codotype/core";

// // // //

/**
 * RuntimeAdapter?
 * RuntimeProxyAdapter?
 * TODO - rename this to RuntimeAdapter?
 * *******
 * UPDATED ANNOTATION
 * Must be renamed.
 * SO - what this is REALLY DOING -> it's providing an interface between a Generator and the Runtime configured to work around that generator's location on the FileSystem
 * This layer of abstraction allows easy-to-use relative path declarations for source templates + file destinations, without the burden of needing to pass around references to the current directory in the Generator definitions
 * *******
 * Implements an adapter between the RuntimeProxy and the Runtime
 * Allows a generator to safely access and invoke simplified Runtime methods for abstract filesystem manipulation
 */
export class RuntimeProxyAdapter implements RuntimeAdapter {
    private runtime: Runtime;
    runtimeProxy: RuntimeProxy; // TODO - should this be private as well?
    compileInPlace: string[];
    options: RuntimeAdapterProps;
    generatorResolvedPath: string;

    /**
     * constructor
     * Handles build options
     */
    constructor(generatorProps: GeneratorProps, options: RuntimeAdapterProps) {
        // Throw error if options.runtime isn't defined
        if (!options.runtime) {
            throw Error("CodotypeGenerator options requires options.runtime");
            return;
        }

        // Throw error if options.resolved isn't defined
        if (!options.generatorResolvedPath) {
            throw Error(
                "CodotypeGenerator options requires options.generatorResolvedPath",
            );
        }

        // Validates GeneratorConfiguration
        if (
            !generatorProps.write &&
            !generatorProps.compileInPlace &&
            !generatorProps.forEachSchema &&
            !generatorProps.forEachRelation &&
            !generatorProps.forEachReferencedBy
        ) {
            throw Error(
                "GeneratorConfiguration requires either write, forEachSchema, forEachRelation, forEachReferencedBy, or compileInPlace properties",
            );
        }

        // Assigns this.runtime
        // this.runtime must be a compatible CodotypeRuntime class instance
        this.runtime = options.runtime;

        // Assigns generatorConfiguration
        this.write = generatorProps.write || this.write;
        this.forEachSchema = generatorProps.forEachSchema || this.forEachSchema;
        this.forEachRelation =
            generatorProps.forEachRelation || this.forEachRelation;
        this.forEachReferencedBy =
            generatorProps.forEachReferencedBy || this.forEachReferencedBy;
        this.compileInPlace = generatorProps.compileInPlace || [];

        // Assigns this.options
        this.options = options;

        // PASS this.options.generatorResolvedPath in from @codotype/runtime
        this.generatorResolvedPath = this.options.generatorResolvedPath;

        // Defuines this.runtimeProxy
        this.runtimeProxy = {
            ensureDir: this.ensureDir,
            writeFile: this.writeFile,
            copyDir: this.copyDir,
            renderComponent: this.renderComponent,
            composeWith: this.composeWith,
        };

        // Returns the instance
        return this;
    }

    /**
     * write
     * Method to write files to the filesystem
     */
    async write(params: {
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
    async forEachSchema(params: {
        schema: Schema;
        project: Project;
        runtime: RuntimeProxy;
    }): Promise<void> {
        return Promise.resolve();
    }

    /**
     * forEachRelation
     * @param - see `WriteFunctionProps`
     */
    async forEachRelation(params: {
        schema: Schema;
        relation: Relation;
        project: Project;
        runtime: RuntimeProxy;
    }): Promise<void> {
        return Promise.resolve();
    }

    /**
     * forEachReferencedBy
     * @param - see `WriteFunctionProps`
     */
    async forEachReferencedBy(params: {
        schema: Schema;
        relation: Relation;
        project: Project;
    }): Promise<void> {
        return Promise.resolve();
    }

    // ensureDir
    // Ensures presence of directory for template compilation
    ensureDir(dir: string) {
        return this.runtime.ensureDir(
            this.runtime.getDestinationPath(this.options.dest, dir),
        );
    }

    /**
     * copDir
     * copy a directory from src to dest'copy a directory from src to dest
     */
    copyDir(params: { src: string; dest: string }) {
        const { src, dest } = params;
        return this.runtime.copyDir({
            src: this.runtime.getTemplatePath(this.generatorResolvedPath, src),
            dest: this.runtime.getDestinationPath(this.options.dest, dest),
        });
    }

    /**
     * compileTemplatesInPlace
     * Compiles and writes each template defined in the `compileInPlace` property
     */
    compileTemplatesInPlace(): Promise<boolean[]> {
        // For each inPlaceTemplate, compile and write
        return Promise.all(
            this.compileInPlace.map((template: string) => {
                return this.runtime.writeTemplateToFile(
                    this,
                    this.runtime.getTemplatePath(
                        this.generatorResolvedPath,
                        template,
                    ),
                    this.runtime.getDestinationPath(
                        this.options.dest,
                        template,
                    ),
                    {},
                    {},
                );
            }),
        );
    }

    /**
     * renderComponent
     * Compiles and writes each template defined in the `compileInPlace` property
     */
    renderComponent({
        src,
        dest,
        data = {},
        options,
    }: {
        src: string;
        dest: string;
        data: { [key: string]: any };
        options?: { prettify?: PrettifyOptions };
    }): Promise<boolean> {
        console.log("renderComponent - this");
        console.log(this);
        return this.runtime.writeTemplateToFile(
            this,
            this.runtime.getTemplatePath(this.generatorResolvedPath, src),
            this.runtime.getDestinationPath(this.options.dest, dest),
            data,
            options,
        );
    }

    /**
     * writeFile
     * TODO - annotate this
     * @param destinationPath
     * @param compiledTemplate
     */
    writeFile(
        destinationPath: string,
        compiledTemplate: string,
        options?: {
            prettify?: PrettifyOptions;
        },
    ) {
        return this.runtime.writeFile(
            this.runtime.getDestinationPath(this.options.dest, destinationPath),
            compiledTemplate,
            options,
        );
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
