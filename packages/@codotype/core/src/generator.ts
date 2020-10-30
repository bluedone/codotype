import {
    WriteFunction,
    ForEachRelationFunction,
    ForEachReverseRelationFunction,
    ForEachSchemaFunction,
} from "./runtime";

// // // //

/**
 * GeneratorConstructorParams
 * Parameters passed into
 */
export interface GeneratorConstructorParams {
    name: string;
    compileInPlace?: string[];
    write?: WriteFunction;
    forEachRelation?: ForEachRelationFunction;
    forEachReverseRelation?: ForEachReverseRelationFunction;
    forEachSchema?: ForEachSchemaFunction;
}
