import {
    Project,
    Schema,
    RuntimeAdaptor,
    RelationReference,
} from "@codotype/core";

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
    generatorInstance: RuntimeAdaptor;
}): Promise<void> {
    const { project, generatorInstance } = params;

    // Invokes `generator.forEachSchema` once for each in project.schemas
    await Promise.all(
        project.schemas.map((schema: Schema) =>
            generatorInstance.forEachSchema({
                schema,
                project,
                runtime: generatorInstance, // TODO - rename all the stuff like this
            }),
        ),
    );

    // Invokes `generator.forEachRelation` once for each in project.schemas
    await Promise.all(
        project.schemas.map((schema: Schema) => {
            return Promise.all(
                schema.relations.map((relation: RelationReference) => {
                    return generatorInstance.forEachRelation({
                        schema: schema,
                        relation,
                        project,
                        runtime: generatorInstance.runtimeProxy,
                    });
                }),
            );
        }),
    );

    // Invokes `generator.forEachReverseRelation` once for each in project.schemas
    await Promise.all(
        project.schemas.map((schema: Schema) => {
            return Promise.all(
                schema.references.map((relation: RelationReference) => {
                    return generatorInstance.forEachReverseRelation({
                        schema: schema,
                        relation,
                        project,
                        runtime: generatorInstance.runtimeProxy,
                    });
                }),
            );
        }),
    );

    // Invokes `generator.write()` once
    await generatorInstance.write({
        project,
        runtime: generatorInstance,
    });

    // Invokes generator.compileTemplatesInPlace()
    await generatorInstance.compileTemplatesInPlace();
}
