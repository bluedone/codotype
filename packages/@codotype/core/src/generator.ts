import {
    WriteFunction,
    ForEachRelationFunction,
    forEachReferencedByFunction,
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
    forEachReferencedBy?: forEachReferencedByFunction;
    forEachSchema?: ForEachSchemaFunction;
}
