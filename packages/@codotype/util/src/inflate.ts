import { buildTokenPluralization } from "./buildTokenPluralization";
import {
  RelationType,
  Schema,
  Relation,
  RelationReference,
  InflatedSchema,
  Project,
  InflatedProject,
} from "@codotype/types";

// // // //

export function buildRelationReferences(params: {
  schema: Schema;
  schemas: Schema[];
}): RelationReference[] {
  const { schema, schemas } = params;

  // Defines array of RelationReferences we're going to return

  return schemas.reduce((previous: RelationReference[], nextSchema: Schema) => {
    return [
      ...previous,
      ...nextSchema.relations
        .filter((r: Relation) => r.destinationSchemaId === schema.id)
        .map(
          (r: Relation): RelationReference => {
            return {
              id: Math.random().toString(), // TODO - add UUID function to UTIL
              type: RelationType.TO_ONE,
              sourceSchemaId: nextSchema.id,
              destinationSchemaId: schema.id,
              sourceRelationId: r.id,
              identifiers: {
                source: {
                  canonical: { ...nextSchema.identifiers },
                  alias: {
                    ...buildTokenPluralization(
                      r.destinationSchemaAlias ||
                        nextSchema.identifiers.singular.label
                    ),
                  },
                },
                destination: {
                  canonical: { ...schema.identifiers },
                  alias: buildTokenPluralization(
                    r.sourceSchemaAlias || schema.identifiers.singular.label
                  ),
                },
              },
            };
          }
        ),
    ];
  }, []);
}

// // // //

export function buildInflatedRelations(params: {
  schema: Schema;
  schemas: Schema[];
}): RelationReference[] {
  const { schema, schemas } = params;

  // Defines array of RelationReferences we're going to return
  return [
    ...schema.relations
      // .filter((r: Relation) => r.destinationSchemaId === schema.id)
      .map(
        (r: Relation): RelationReference => {
          const nextSchema: Schema = schemas.find(
            (s) => s.id === r.destinationSchemaId
          );

          return {
            id: Math.random().toString(), // TODO - add UUID function to UTIL
            type: RelationType.TO_ONE,
            sourceSchemaId: schema.id,
            destinationSchemaId: nextSchema.id,
            sourceRelationId: r.id,
            identifiers: {
              source: {
                canonical: { ...schema.identifiers },
                alias: buildTokenPluralization(
                  r.sourceSchemaAlias || schema.identifiers.singular.label
                ),
              },
              destination: {
                canonical: { ...nextSchema.identifiers },
                alias: {
                  ...buildTokenPluralization(
                    r.destinationSchemaAlias ||
                      nextSchema.identifiers.singular.label
                  ),
                },
              },
            },
          };
        }
      ),
  ];
}

// // // //

export function inflateSchema(params: {
  schema: Schema;
  schemas: Schema[];
}): InflatedSchema {
  const { schema, schemas } = params;

  // TODO - must inflate relations, add incomingRelations / references ?

  return {
    id: schema.id,
    relations: buildInflatedRelations({ schema, schemas }),
    attributes: schema.attributes,
    identifiers: {
      ...schema.identifiers,
    },
    references: buildRelationReferences({ schema, schemas }),
    configuration: schema.configuration, // Question - does anything need to be done for the configuration?
  };
}

// // // //

// TODO - annotate
export function inflateSchemas(params: {
  schemas: Schema[];
}): InflatedSchema[] {
  return params.schemas.map(
    (s: Schema): InflatedSchema =>
      inflateSchema({
        schemas: params.schemas,
        schema: s,
      })
  );
}

// // // //

// TODO - annotate
export function inflateProject(params: { project: Project }): InflatedProject {
  const { project } = params;
  return {
    id: project.id,
    schemas: inflateSchemas({ schemas: project.schemas }),
    configuration: project.configuration,
    generatorId: project.generatorId,
    identifiers: project.identifiers,
    generatorVersion: project.generatorVersion,
  };
}
