import { GeneratorConstructorParams } from "../generator";

export class GeneratorBuilder implements GeneratorConstructorParams {
    name: string;
    compileInPlace: string[] = [];
    constructor(params: GeneratorConstructorParams) {
        this.name = params.name;
        this.compileInPlace = params.compileInPlace || this.compileInPlace;
        // this.write = params.write || this.write;
        // this.write = parmas.write;
        // this.forEachRelation = parmas.forEachRelation;
        // this.forEachReverseRelation = parmas.forEachReverseRelation;
        // this.forEachSchema = parmas.forEachSchema;
    }
}
