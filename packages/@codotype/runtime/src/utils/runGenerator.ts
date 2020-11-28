import { Project, Schema, RuntimeAdapter, Relation } from "@codotype/core";

// // // //

/**
 * runGenerator
 * TODO - rename this? Or rename runtimeProxyAdaptor to something else? GeneratorRunner?
 * Accepts a project and runtimeAdapter -> invokes each method passed in with GeneratorConstructorOptions
 * @param project - the Project being run against params.generatorInstance
 * @param generatorInstance - (TODO: RENAME) the RuntimeAdapter being passed into each function on GeneratorConstructorOptions
 */
export async function runGenerator(params: {
    project: Project;
    runtimeProxyAdapter: RuntimeAdapter;
}): Promise<void> {
    const { project, runtimeProxyAdapter } = params;

    // Invokes `generator.forEachSchema` once for each in project.schemas
    await Promise.all(
        project.schemas.map((schema: Schema) =>
            runtimeProxyAdapter.forEachSchema({
                schema,
                project,
                runtime: runtimeProxyAdapter, // TODO - rename all the stuff like this
            }),
        ),
    );

    // Invokes `generator.forEachRelation` once for each in project.schemas
    await Promise.all(
        project.schemas.map((schema: Schema) => {
            return Promise.all(
                schema.relations.map((relation: Relation) => {
                    return runtimeProxyAdapter.forEachRelation({
                        schema: schema,
                        relation,
                        project,
                        runtime: runtimeProxyAdapter.runtimeProxy,
                    });
                }),
            );
        }),
    );

    // Invokes `generator.forEachReferencedBy` once for each in project.schemas
    await Promise.all(
        project.schemas.map((schema: Schema) => {
            return Promise.all(
                schema.referencedBy.map((relation: Relation) => {
                    return runtimeProxyAdapter.forEachReferencedBy({
                        schema: schema,
                        relation,
                        project,
                        runtime: runtimeProxyAdapter.runtimeProxy,
                    });
                }),
            );
        }),
    );

    // Invokes `generator.write()` once
    await runtimeProxyAdapter.write({
        project,
        runtime: runtimeProxyAdapter,
    });

    // Invokes generator.compileTemplatesInPlace()
    await runtimeProxyAdapter.compileTemplatesInPlace();
}
