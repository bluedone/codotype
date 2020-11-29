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
 * RuntimeProxyAdapter
 * TODO - rename this to RuntimeAdapter?
 * TODO - this MUST be renamed from RuntimeProxyAdaptor to SOMETHING ELSE.
 * Creates an interface between a Generator and Runtime configured to work around that Generator's module location on the file system
 * This layer of abstraction allows easy-to-use relative path declarations for source templates + file destinations,
 * without the burden of needing to pass around references to the current directory in the Generator definitions
 */
export class RuntimeProxyAdapter implements RuntimeAdapter {
    private runtime: Runtime;
    runtimeProxy: RuntimeProxy;
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

        // Validates GeneratorProps
        // TODO - should this be abstracted into @codotype/core?
        if (
            !generatorProps.write &&
            !generatorProps.compileInPlace &&
            !generatorProps.forEachSchema &&
            !generatorProps.forEachRelation &&
            !generatorProps.forEachReferencedBy
        ) {
            throw Error(
                "GeneratorProps requires either write, forEachSchema, forEachRelation, forEachReferencedBy, or compileInPlace properties",
            );
        }

        // Assigns this.runtime
        // this.runtime must be a compatible CodotypeRuntime class instance
        this.runtime = options.runtime;

        // Assigns methods from GeneratorProps
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

    // // // //
    // GeneratorProps methods

    /**
     * write
     * @see WriteFunction
     */
    async write(params: {
        project: Project;
        runtime: RuntimeProxy;
    }): Promise<void> {
        return Promise.resolve();
    }

    /**
     * forEachSchema
     * @see ForEachSchemaFunction
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
     * @see ForEachRelationFunction
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
     * @see ForEachReferencedByFunction
     */
    async forEachReferencedBy(params: {
        schema: Schema;
        relation: Relation;
        project: Project;
    }): Promise<void> {
        return Promise.resolve();
    }

    // // // //
    // Runtime Methods

    /**
     * writeFile
     * @see WriteFileFunction
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
     * ensureDir
     * @see EnsureDirFunction
     */
    ensureDir(dir: string) {
        return this.runtime.ensureDir(
            this.runtime.getDestinationPath(this.options.dest, dir),
        );
    }

    /**
     * copDir
     * @see CopyDirFunction
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
     * @see GeneratorProps.compileInPlace
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
     * @see RenderComponentFunction
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
        return this.runtime.writeTemplateToFile(
            this,
            this.runtime.getTemplatePath(this.generatorResolvedPath, src),
            this.runtime.getDestinationPath(this.options.dest, dest),
            data,
            options,
        );
    }

    /**
     * composeWith
     * @see ComposeWithFunction
     */
    composeWith(
        generatorModulePath: string,
        composeWithOptions?: ComposeWithOptions,
    ): Promise<void> {
        return this.runtime.composeWith(
            this,
            generatorModulePath,
            composeWithOptions || {},
        );
    }
}
