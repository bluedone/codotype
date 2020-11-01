import { v4 as uuidv4 } from "uuid";
import { RelationTypes, RelationInput } from "../relation";
import { CreatedBy, CreatedByValues } from "../created-by";
import { AddonsValue } from "../schema-editor-addon";

// // // //

interface RelationBuilderParams {
    id?: string;
    type: RelationTypes;
    sourceSchemaID: string;
    destinationSchemaID: string;
    required?: boolean;
    source?: CreatedBy;
    locked?: boolean;
    sourceSchemaAlias?: string;
    destinationSchemaAlias?: string;
    internalNote?: string;
    addons?: AddonsValue;
}

export class RelationBuilder implements RelationInput {
    id: string = uuidv4();
    type: RelationTypes;
    sourceSchemaID: string;
    destinationSchemaID: string;
    internalNote: string = "";
    locked: boolean = false;
    createdBy: CreatedBy = CreatedByValues.user;
    sourceSchemaAlias: string = "";
    destinationSchemaAlias: string = "";
    addons: AddonsValue = {};

    constructor(params: RelationBuilderParams) {
        this.type = params.type;
        this.sourceSchemaID = params.sourceSchemaID;
        this.destinationSchemaID = params.destinationSchemaID;
        this.internalNote = params.internalNote;

        this.id = params.id || this.id;
        this.createdBy = params.source || this.createdBy;
        this.locked = params.locked || this.locked;
        this.addons = params.addons || this.addons;
        this.sourceSchemaAlias =
            params.sourceSchemaAlias || this.sourceSchemaAlias;
        this.destinationSchemaAlias =
            params.destinationSchemaAlias || this.destinationSchemaAlias;
    }
}
