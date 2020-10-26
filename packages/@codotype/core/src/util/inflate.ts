import { buildTokenPluralization } from "./buildTokenPluralization";
import { makeUniqueId } from "./makeUniqueId";
import {
    SchemaInput,
    Relation,
    RelationReference,
    Schema,
    ProjectInput,
    Project,
} from "../";

// // // //

export function buildRelationReference(params: {
    relation: Relation;
    sourceSchema: SchemaInput;
    destinationSchema: SchemaInput;
}): RelationReference {
    const { relation, sourceSchema, destinationSchema } = params;

    return {
        id: makeUniqueId(),
        type: relation.type,
        sourceSchemaId: sourceSchema.id,
        destinationSchemaId: destinationSchema.id,
        sourceRelationId: relation.id,
        identifiers: {
            source: {
                canonical: { ...sourceSchema.identifiers },
                alias: buildTokenPluralization(
                    relation.sourceSchemaAlias ||
                        sourceSchema.identifiers.singular.label,
                ),
            },
            destination: {
                canonical: { ...destinationSchema.identifiers },
                alias: {
                    ...buildTokenPluralization(
                        relation.destinationSchemaAlias ||
                            destinationSchema.identifiers.singular.label,
                    ),
                },
            },
        },
    };
}

// // // //
// // // //

export function buildRelationReferences(params: {
    schema: SchemaInput;
    schemas: SchemaInput[];
}): RelationReference[] {
    const { schema, schemas } = params;

    // Defines array of RelationReferences we're going to return

    return schemas.reduce(
        (previous: RelationReference[], nextSchema: SchemaInput) => {
            return [
                ...previous,
                ...nextSchema.relations
                    .filter(
                        (r: Relation) => r.destinationSchemaId === schema.id,
                    )
                    .map(
                        (r: Relation): RelationReference => {
                            return buildRelationReference({
                                sourceSchema: nextSchema,
                                destinationSchema: schema,
                                relation: r,
                            });
                        },
                    ),
            ];
        },
        [],
    );
}

// // // //

export function buildInflatedRelations(params: {
    schema: SchemaInput;
    schemas: SchemaInput[];
}): RelationReference[] {
    const { schema, schemas } = params;

    // Defines array of RelationReferences we're going to return
    return [
        ...schema.relations.map(
            (r: Relation): RelationReference => {
                const nextSchema: SchemaInput = schemas.find(
                    (s) => s.id === r.destinationSchemaId,
                );

                return buildRelationReference({
                    sourceSchema: schema,
                    destinationSchema: nextSchema,
                    relation: r,
                });
            },
        ),
    ];
}

// // // //

/**
 * inflateSchema
 * Inflates a single Schema and returns an Schema instance
 * @param params.schema The Schema instance being inflated
 * @param params.schemas Array of all Schema instances
 * @returns A single Schema instance
 */
export function inflateSchema(params: {
    schema: SchemaInput;
    schemas: SchemaInput[];
}): Schema {
    const { schema, schemas } = params;

    return {
        id: schema.id,
        attributes: schema.attributes,
        identifiers: {
            ...schema.identifiers,
        },
        relations: buildInflatedRelations({ schema, schemas }),
        references: buildRelationReferences({ schema, schemas }),
        // QUESTION - does anything need to be done for the configuration?
        configuration: schema.configuration,
    };
}

// // // //

/**
 * inflateSchemas
 * Inflates each schema in params.schemas
 * @param params.schemas - array of Schema instances being inflated
 * @returns array of Schema instances
 */
export function inflateSchemas(params: { schemas: SchemaInput[] }): Schema[] {
    return params.schemas.map(
        (s: SchemaInput): Schema =>
            inflateSchema({
                schemas: params.schemas,
                schema: s,
            }),
    );
}

// // // //

/**
 * inflateProject
 * TODO - rename this to "inflateProjectInput"?
 * @param params
 */
export function inflateProject(params: {
    projectInput: ProjectInput;
}): Project {
    const { projectInput } = params;
    return {
        id: projectInput.id,
        schemas: inflateSchemas({ schemas: projectInput.schemas }),
        configuration: projectInput.configuration,
        pluginID: projectInput.pluginID,
        identifiers: projectInput.identifiers,
        pluginVersion: projectInput.pluginVersion,
    };
}
