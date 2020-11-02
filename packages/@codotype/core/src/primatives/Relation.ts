import { v4 as uuidv4 } from "uuid";
import { RelationType, RelationInput } from "../relation";
import { CreatedBy, CreatedByValues } from "../created-by";
import { AddonsValue } from "../schema-editor-addon";

// // // //

interface RelationBuilderParams {
    id?: string;
    type?: RelationType;
    sourceSchemaID?: string;
    destinationSchemaID?: string;
    createdBy?: CreatedBy;
    locked?: boolean;
    sourceSchemaAlias?: string;
    destinationSchemaAlias?: string;
    internalNote?: string;
    addons?: AddonsValue;
}

// TODO - make this relationInput
export class RelationBuilder implements RelationInput {
    id: string = uuidv4();
    type: RelationType;
    sourceSchemaID: string = "";
    destinationSchemaID: string = "";
    internalNote: string = "";
    locked: boolean = false;
    createdBy: CreatedBy = CreatedByValues.user;
    sourceSchemaAlias: string = "";
    destinationSchemaAlias: string = "";
    addons: AddonsValue = {};

    constructor(params: RelationBuilderParams) {
        this.type = params.type;
        this.sourceSchemaID = params.sourceSchemaID || this.sourceSchemaID;
        this.destinationSchemaID =
            params.destinationSchemaID || this.destinationSchemaID;
        this.internalNote = params.internalNote || this.internalNote;

        this.id = params.id === "" ? params.id : this.id;
        this.createdBy = params.createdBy || this.createdBy;
        this.locked = params.locked || this.locked;
        this.addons = params.addons || this.addons;
        this.sourceSchemaAlias =
            params.sourceSchemaAlias || this.sourceSchemaAlias;
        this.destinationSchemaAlias =
            params.destinationSchemaAlias || this.destinationSchemaAlias;
    }
}
