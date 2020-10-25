import {
    InflatedProject,
    InflatedSchema,
    RelationReference,
} from "@codotype/core";
import { RuntimeAdaptor } from "./types";

// // // //

// TODO - rename this
export async function runGenerator(props: {
    project: InflatedProject; // TODO - rename InflatedProject to Project
    generatorInstance: RuntimeAdaptor;
}): Promise<void> {
    const { project, generatorInstance } = props;

    // Invokes `generator.forEachSchema` once for each in project.schemas
    await Promise.all(
        project.schemas.map((schema: InflatedSchema) =>
            generatorInstance.forEachSchema({
                schema,
                project,
                runtime: generatorInstance, // TODO - rename all the stuff like this
            }),
        ),
    );

    // Invokes `generator.forEachRelation` once for each in project.schemas
    await Promise.all(
        project.schemas.map((schema: InflatedSchema) => {
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
        project.schemas.map((schema: InflatedSchema) => {
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
