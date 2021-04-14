import {
    ForEachReferencedByFunction,
    ForEachRelationFunction,
    ForEachSchemaFunction,
    WriteFunction,
} from "..";
import { GeneratorProps } from "../generator";

// // // //

export class GeneratorBuilder implements GeneratorProps {
    name: string;
    renderInPlace: string[] = [];
    write?: WriteFunction = undefined;
    forEachSchema?: ForEachSchemaFunction = undefined;
    forEachRelation?: ForEachRelationFunction = undefined;
    forEachReferencedBy?: ForEachReferencedByFunction = undefined;
    constructor(params: GeneratorProps) {
        this.name = params.name;
        this.write = params.write || this.write;
        this.forEachSchema = params.forEachSchema || this.forEachSchema;
        this.forEachRelation = params.forEachRelation || this.forEachRelation;
        this.forEachReferencedBy =
            params.forEachReferencedBy || this.forEachReferencedBy;
        this.renderInPlace = params.renderInPlace || this.renderInPlace;
    }
}
