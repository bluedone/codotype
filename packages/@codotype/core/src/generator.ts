import {
    WriteFunction,
    ForEachRelationFunction,
    ForEachReferencedByFunction,
    ForEachSchemaFunction,
} from "./runtime-methods";

// // // //

/**
 * GeneratorProps
 * Parameters used to define a single generator inside a Plugin
 */
export interface GeneratorProps {
    name: string;
    renderInPlace?: string[];
    write?: WriteFunction;
    forEachSchema?: ForEachSchemaFunction;
    forEachRelation?: ForEachRelationFunction;
    forEachReferencedBy?: ForEachReferencedByFunction;
}
