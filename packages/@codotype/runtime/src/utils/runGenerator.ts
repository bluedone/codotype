import { Project, Schema, RuntimeAdaptor, Relation } from "@codotype/core";

// // // //

/**
 * runGenerator
 * TODO - rename this
 * Accepts a project and runtimeAdaptor -> invokes each method passed in with GeneratorConstructorOptions
 * @param project - the Project being run against params.generatorInstance
 * @param generatorInstance - (TODO: RENAME) the RuntimeAdaptor being passed into each function on GeneratorConstructorOptions
 */
export async function runGenerator(params: {
    project: Project;
    runtimeProxyAdaptor: RuntimeAdaptor;
}): Promise<void> {
    const { project, runtimeProxyAdaptor } = params;

    // Invokes `generator.forEachSchema` once for each in project.schemas
    await Promise.all(
        project.schemas.map((schema: Schema) =>
            runtimeProxyAdaptor.forEachSchema({
                schema,
                project,
                runtime: runtimeProxyAdaptor, // TODO - rename all the stuff like this
            }),
        ),
    );

    // Invokes `generator.forEachRelation` once for each in project.schemas
    await Promise.all(
        project.schemas.map((schema: Schema) => {
            return Promise.all(
                schema.relations.map((relation: Relation) => {
                    return runtimeProxyAdaptor.forEachRelation({
                        schema: schema,
                        relation,
                        project,
                        runtime: runtimeProxyAdaptor.runtimeProxy,
                    });
                }),
            );
        }),
    );

    // Invokes `generator.forEachReverseRelation` once for each in project.schemas
    await Promise.all(
        project.schemas.map((schema: Schema) => {
            return Promise.all(
                schema.references.map((relation: Relation) => {
                    return runtimeProxyAdaptor.forEachReverseRelation({
                        schema: schema,
                        relation,
                        project,
                        runtime: runtimeProxyAdaptor.runtimeProxy,
                    });
                }),
            );
        }),
    );

    // Invokes `generator.write()` once
    await runtimeProxyAdaptor.write({
        project,
        runtime: runtimeProxyAdaptor,
    });

    // Invokes generator.compileTemplatesInPlace()
    await runtimeProxyAdaptor.compileTemplatesInPlace();
}
