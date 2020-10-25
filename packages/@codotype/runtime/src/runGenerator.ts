import {
    InflatedProject,
    InflatedSchema,
    RelationReference,
} from "@codotype/core";
import { RuntimeAdaptor } from "./types";

// // // //

// TODO - rename this
export async function runGenerator(props: {
    inflatedProject: InflatedProject;
    generatorInstance: RuntimeAdaptor;
}): Promise<void> {
    const { inflatedProject, generatorInstance } = props;

    // Invokes `generator.forEachSchema` once for each in inflatedProject.schemas
    await Promise.all(
        inflatedProject.schemas.map((schema: InflatedSchema) =>
            generatorInstance.forEachSchema({
                schema,
                project: inflatedProject,
                runtime: generatorInstance, // TODO - rename all the stuff like this
            }),
        ),
    );

    // Invokes `generator.forEachRelation` once for each in inflatedProject.schemas
    await Promise.all(
        inflatedProject.schemas.map((schema: InflatedSchema) => {
            return Promise.all(
                schema.relations.map((relation: RelationReference) => {
                    return generatorInstance.forEachRelation({
                        schema: schema,
                        relation,
                        project: inflatedProject,
                        runtime: generatorInstance.runtimeProxy,
                    });
                }),
            );
        }),
    );

    // Invokes `generator.forEachReverseRelation` once for each in inflatedProject.schemas
    await Promise.all(
        inflatedProject.schemas.map((schema: InflatedSchema) => {
            return Promise.all(
                schema.references.map((relation: RelationReference) => {
                    return generatorInstance.forEachReverseRelation({
                        schema: schema,
                        relation,
                        project: inflatedProject,
                        runtime: generatorInstance.runtimeProxy,
                    });
                }),
            );
        }),
    );

    // Invokes `generator.write()` once
    await generatorInstance.write({
        project: inflatedProject,
        runtime: generatorInstance,

        //     project: inflatedProject,
        //     dest,
        //     resolved,
        //     plugin: pluginRegistration.pluginMetadata,
        //     runtime: this,
    });

    // Invokes generator.compileTemplatesInPlace()
    await generatorInstance.compileTemplatesInPlace();
}
