import { v4 as uuidv4 } from "uuid";
import { RelationTypes, RelationInput } from "../relation";
import { SchemaCreators } from "../schema";

interface RelationBuilderParams {
    id?: string;
    type: RelationTypes;
    sourceSchemaID: string;
    destinationSchemaID: string;
    required?: boolean;
    source?: SchemaCreators;
    sourceSchemaAlias?: string;
    destinationSchemaAlias?: string;
    internalNote?: string;
}

export class RelationBuilder implements RelationInput {
    id: string = uuidv4();
    type: RelationTypes;
    sourceSchemaID: string;
    destinationSchemaID: string;
    internalNote: string = "";
    required: boolean = false;
    source: SchemaCreators = SchemaCreators.user;
    sourceSchemaAlias: string = "";
    destinationSchemaAlias: string = "";

    constructor(params: RelationBuilderParams) {
        this.type = params.type;
        this.sourceSchemaID = params.sourceSchemaID;
        this.destinationSchemaID = params.destinationSchemaID;
        this.internalNote = params.internalNote;

        this.id = params.id || this.id;
        this.required = params.required || this.required;
        this.source = params.source || this.source;
        this.sourceSchemaAlias =
            params.sourceSchemaAlias || this.sourceSchemaAlias;
        this.destinationSchemaAlias =
            params.destinationSchemaAlias || this.destinationSchemaAlias;
    }
}
