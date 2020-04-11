import { buildTokenPluralization } from "./buildTokenPluralization";
import { clone, uniqueId, cloneDeep } from "lodash";
import {
  RelationType,
  Schema,
  Relation,
  Attribute,
  RelationReference,
  InflatedSchema,
  TokenPluralization,
  SchemaConfigurationGroup,
  ProjectConfiguration,
  UUID,
  SchemaSource,
  Project,
  InflatedProject,
} from "@codotype/types";

// // // //

// TODO - document this
// TODO - write tests for this
export function inflateRelation({ schemas, relation }) {
  // Clones the base attributes from the relation
  // let inflated = { ...relation }
  let inflated = clone(relation);

  // console.log('INFLATE RELATION')
  // console.log(JSON.stringify(inflated, null, 2))

  // defines inflated.alias && inflate.schema
  const ownedSchema = schemas.find((s) => {
    return s.id === inflated.schema_id;
  });
  // console.log('OWNED SCHEMA????')
  // console.log(relation)
  // console.log(ownedSchema)
  const relatedSchema = schemas.find((s) => {
    return s.id === inflated.related_schema_id;
  });

  // Clean this up...
  // TODO - clean this up, add support for every entry in the `RelationType` enum
  function getAttr(type, source) {
    if (
      // @ts-ignore
      [RelationType.HAS_MANY, RelationType.HAS_AND_BELONGS_TO_MANY].includes(
        type
      )
    ) {
      return inflated[source].identifier + "_ids";
    }
    return inflated[source].identifier + "_id";
  }

  // Handle inflated.schema
  // TODO - define a nicer name for `attribute` (idAttribute?)
  // TODO - abstract `attribute` ternary into a separate function
  inflated.schema = buildTokenPluralization(relatedSchema.label);
  // inflated.schema.attribute = inflated.type === 'HAS_MANY' ? inflated.schema.identifier + '_ids' : inflated.schema.identifier + '_id'
  inflated.schema.attribute = getAttr(inflated.type, "schema");

  // Handle inflated.alias
  // TODO - define a nicer name for `attribute` (idAttribute?)
  // TODO - abstract `attribute` ternary into a separate function
  inflated.alias = buildTokenPluralization(inflated.as || relatedSchema.label);
  // inflated.alias.attribute = inflated.type === 'HAS_MANY' ? inflated.alias.identifier + '_ids' : inflated.alias.identifier + '_id'
  inflated.alias.attribute = getAttr(inflated.type, "alias");

  inflated.reverse_alias = buildTokenPluralization(
    inflated.reverse_as || ownedSchema.label
  );
  inflated.related_lead_attribute = !!relatedSchema.attributes[0]
    ? relatedSchema.attributes[0].identifier
    : "_id"; // TODO - use `slug` instead of

  // Returns the inflated relation
  return inflated;
}

// TODO - document inflateSchema function
// Purpose and requirements
export function inflateSchema({ schema, schemas }) {
  // Clones original schema
  let inflated = cloneDeep(schema);

  // Inflates meta (adds camel_case, camel_case_plural)
  inflated = Object.assign(inflated, buildTokenPluralization(inflated.label));

  // Flushes reverse_relations
  inflated.reverse_relations = [];

  // Inflates relations
  inflated.relations = schema.relations.map((relation) => {
    relation.schema_id = schema.id;
    return inflateRelation({ schemas, relation });
  });

  // Inflates attributes
  // QUESTION - is this needed?
  inflated.attributes = schema.attributes.map((attribute) => attribute);

  // TODO - add inlineDeconstruction here?
  // TODO - add defaultObject here?
  // TODO - add inflated.keys here?
  // Assigns inflated.keys
  // let defaultObject = buildDefault({ schema, schemas })
  // inflated.keys = Object.keys(defaultObject)

  // Returns the inflated schema
  return inflated;
}

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
        .filter((r: Relation) => r.schema_id !== schema.id)
        .map(
          (r: Relation): RelationReference => {
            return {
              uuid: Math.random().toString(), // TODO - add UUID function to UTIL
              type: RelationType.TO_ONE,
              sourceSchemaId: nextSchema.id,
              destinationSchemaId: schema.id,
              identifiers: {
                source: {
                  canonical: { ...nextSchema.identifiers },
                  alias: {
                    ...buildTokenPluralization(
                      r.reverse_as || nextSchema.identifiers.singular.label
                    ),
                  },
                },
                destination: {
                  canonical: { ...schema.identifiers },
                  alias: buildTokenPluralization(
                    r.as || schema.identifiers.singular.label
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

export function inflateSchemaV2(params: {
  schema: Schema;
  schemas: Schema[];
}): InflatedSchema {
  const { schema, schemas } = params;

  // TODO - must inflate relations, add incomingRelations / references ?

  return {
    id: schema.id,
    relations: schema.relations,
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
export function inflateSchemasV2(params: {
  schemas: Schema[];
}): InflatedSchema[] {
  return params.schemas.map(
    (s: Schema): InflatedSchema =>
      inflateSchemaV2({
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
    schemas: inflateSchemasV2({ schemas: project.schemas }),
    configuration: project.configuration,
    generatorId: project.generatorId,
    identifiers: project.identifiers,
    generatorVersion: project.generatorVersion,
  };
}

// // // //

// inflate
// Fomats the build parameters for the generator
// Mostly adds some additional metadata to each relation to simplify template rendering
// TODO - this may want to define the blueprint.identifier attribute (rather than relying on the client)
// TODO - much of this logic should be moved into the inflateSchema method
export function inflate({ blueprint }) {
  // Creates a deep-copy of the blueprint object
  const inflated = cloneDeep(blueprint);

  // Iterates over each schema (prep)
  inflated.schemas = inflated.schemas.map((schema) => {
    schema.reverse_relations = [];
    return schema;
  });

  // Iterates over each schema (inflate)
  inflated.schemas = inflated.schemas.map((schema) => {
    // Inflates meta (adds camel_case, camel_case_plural)
    schema = Object.assign(schema, buildTokenPluralization(schema.label));

    // Flushes schema.reverse_relations
    // schema.reverse_relations = []

    // Inflate relations
    schema.relations = schema.relations.map((relation) => {
      // Assigns relation.schema_id
      relation.schema_id = schema.id;

      // console.log('RELATIONS')
      // console.log(relation)

      let rel = inflateRelation({
        schemas: inflated.schemas,
        relation: relation,
      });

      let relatedSchema = inflated.schemas.find(
        (s) => s.id === rel.related_schema_id
      );

      // Handles REF_BELONGS_TO
      // TODO - clean this up!
      if (rel.type) {
        const ref_relation = {
          id: uniqueId("REVERSE_" + rel.id),
          order: schema.reverse_relations.length,
          type: rel.type,
          required: false,
          schema_id: relatedSchema.id, // TODO - should these be flipped???
          related_schema_id: schema.id, // TODO - should these be flipped???
          as: rel.reverse_as,
          reverse_as: rel.as,
        };

        // Inflates reference relation and appends to related schema
        const ref_relation_inflated = inflateRelation({
          relation: ref_relation,
          schemas: inflated.schemas,
        });
        // relatedSchema.relations.push(ref_relation_inflated)
        relatedSchema.reverse_relations.push(ref_relation_inflated);
      }

      return rel;
    });

    return schema;
  });

  return inflated;
}
