import {
    WriteFunction,
    ForEachRelationFunction,
    ForEachReferencedByFunction,
    ForEachSchemaFunction,
} from "./runtime-methods";

// // // //

/**
 * GeneratorConstructorParams
 * TODO - rename to `GeneratorConstructorProps` or just `GeneratorProps`
 * Parameters used to define a single generator inside a Plugin
 */
export interface GeneratorConstructorParams {
    name: string;
    compileInPlace?: string[]; // TODO - rename `compileInPlace` -> `renderInPlace`?
    write?: WriteFunction;
    forEachSchema?: ForEachSchemaFunction;
    forEachRelation?: ForEachRelationFunction;
    forEachReferencedBy?: ForEachReferencedByFunction;
}
