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
    runtimeAdapter: RuntimeAdapter;
}): Promise<void> {
    const { project, runtimeAdapter } = params;

    // Invokes `generator.forEachSchema` once for each in project.schemas
    await Promise.all(
        project.schemas.map((schema: Schema) =>
            runtimeAdapter.forEachSchema({
                schema,
                project,
                runtime: runtimeAdapter, // TODO - rename all the stuff like this
            }),
        ),
    );

    // Invokes `generator.forEachRelation` once for each in project.schemas
    await Promise.all(
        project.schemas.map((schema: Schema) => {
            return Promise.all(
                schema.relations.map((relation: Relation) => {
                    return runtimeAdapter.forEachRelation({
                        schema: schema,
                        relation,
                        project,
                        runtime: runtimeAdapter.runtimeProxy,
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
                    return runtimeAdapter.forEachReferencedBy({
                        schema: schema,
                        relation,
                        project,
                        runtime: runtimeAdapter.runtimeProxy,
                    });
                }),
            );
        }),
    );

    // Invokes `generator.write()` once
    await runtimeAdapter.write({
        project,
        runtime: runtimeAdapter,
    });

    // Invokes generator.compileTemplatesInPlace()
    await runtimeAdapter.compileTemplatesInPlace();
}
