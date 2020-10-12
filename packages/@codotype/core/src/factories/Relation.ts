import { v4 as uuidv4 } from "uuid";
import { RelationType, Relation } from "../relation";
import { SchemaSource } from "../schema";

interface RelationBuilderParams {
    id?: string;
    type: RelationType;
    destinationSchemaId: string;
    required?: boolean;
    source?: SchemaSource;
    sourceSchemeAlias?: string;
    destinationSchemeAlias?: string;
}

export class RelationBuilder implements Relation {
    id: string = uuidv4();
    type: RelationType;
    destinationSchemaId: string;
    required: boolean = false;
    source: SchemaSource = SchemaSource.USER;
    sourceSchemaAlias: string = "";
    destinationSchemaAlias: string = "";

    constructor(params: RelationBuilderParams) {
        this.type = params.type;
        this.destinationSchemaId = params.destinationSchemaId;

        this.id = params.id || this.id;
        this.required = params.required || this.required;
        this.source = params.source || this.source;
        this.sourceSchemaAlias =
            params.sourceSchemeAlias || this.sourceSchemaAlias;
        this.destinationSchemaAlias =
            params.destinationSchemeAlias || this.destinationSchemaAlias;
    }
}
