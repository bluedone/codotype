import { RelationInput, RelationTypes, CreatedByValues } from "@codotype/core";

// // // //

export const relationExample01: RelationInput = {
    id: "relation-id-attr",
    locked: false,
    internalNote: "",
    type: RelationTypes.TO_ONE,
    createdBy: CreatedByValues.user,
    sourceSchemaID: "1111",
    destinationSchemaID: "12345",
    sourceSchemaAlias: "Employer",
    destinationSchemaAlias: "Employee",
    addons: {},
};

export const supportedRelationTypes: RelationTypes[] = [
    RelationTypes.TO_ONE,
    RelationTypes.TO_MANY,
    RelationTypes.HAS_ONE,
    RelationTypes.HAS_MANY,
    RelationTypes.HAS_AND_BELONGS_TO_MANY,
];
