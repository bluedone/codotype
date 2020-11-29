import { GeneratorProps } from "../generator";

export class GeneratorBuilder implements GeneratorProps {
    name: string;
    compileInPlace: string[] = [];
    constructor(params: GeneratorProps) {
        this.name = params.name;
        this.compileInPlace = params.compileInPlace || this.compileInPlace;
        // TODO - finish this up
        // this.write = params.write || this.write;
        // this.write = parmas.write;
        // this.forEachRelation = parmas.forEachRelation;
        // this.forEachReferencedBy = parmas.forEachReferencedBy;
        // this.forEachSchema = parmas.forEachSchema;
    }
}
