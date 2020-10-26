import {
    WriteFunction,
    ForEachRelationFunction,
    ForEachReverseRelationFunction,
    ForEachSchemaFunction,
} from "./runtime";

// // // //

/**
 * GeneratorConstructorParams
 * TODO - annotate this
 */
export interface GeneratorConstructorParams {
    name: string;
    compileInPlace?: string[];
    write?: WriteFunction;
    forEachRelation?: ForEachRelationFunction;
    forEachReverseRelation?: ForEachReverseRelationFunction;
    forEachSchema?: ForEachSchemaFunction;
}
