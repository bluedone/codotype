import {
    Relation,
    Schema,
    SchemaSource,
    RelationType,
    testState,
} from "@codotype/types";

// // // //

export const relationExample01: Relation = {
    id: "relation-id-attr",
    type: RelationType.TO_ONE,
    source: SchemaSource.USER,
    required: false,
    destinationSchemaId: "12345",
    sourceSchemaAlias: "Employer",
    destinationSchemaAlias: "Employee",
};

export const supportedRelationTypes: RelationType[] = [
    RelationType.TO_ONE,
    RelationType.TO_MANY,
    RelationType.HAS_ONE,
    RelationType.HAS_MANY,
    RelationType.HAS_AND_BELONGS_TO_MANY,
];

export const userSchema: Schema = {
    id: "12345",
    identifiers: {
        singular: {
            label: "User",
            snake: "user",
            camel: "user",
            pascal: "User",
            kebab: "user",
        },
        plural: {
            label: "Users",
            snake: "users",
            camel: "users",
            pascal: "Users",
            kebab: "users",
        },
    },
    attributes: [{ ...testState.emailAttribute }],
    relations: [],
    locked: false,
    removable: false,
    source: SchemaSource.USER,
    configuration: {},
};
