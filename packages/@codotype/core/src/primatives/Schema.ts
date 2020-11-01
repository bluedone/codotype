import { v4 as uuidv4 } from "uuid";
import { SchemaInput, Attribute, RelationInput } from "..";
import { CreatedBy, CreatedByValues } from "../created-by";
import { TokenPluralization } from "../token";
import { ConfigurationValue } from "../configuration-value";

// // // //

interface SchemaBuilderParams {
    id?: string;
    attributes: Attribute[];
    relations: RelationInput[];
    identifiers: TokenPluralization;
    source?: CreatedBy;
    locked?: boolean;
    configuration?: ConfigurationValue;
    internalNote?: string;
}

export class SchemaBuilder implements SchemaInput {
    id: string = uuidv4();
    attributes: Attribute[];
    relations: RelationInput[];
    identifiers: TokenPluralization;
    createdBy: CreatedBy = CreatedByValues.user;
    locked: boolean = false;
    configuration: ConfigurationValue = {};
    internalNote: string = "";

    constructor(params: SchemaBuilderParams) {
        this.attributes = params.attributes;
        this.relations = params.relations;
        this.identifiers = params.identifiers;

        this.id = params.id || this.id;
        this.createdBy = params.source || this.createdBy;
        this.locked = params.locked !== undefined ? params.locked : this.locked;
        this.configuration = params.configuration || this.configuration;
        this.internalNote = params.internalNote || this.internalNote;
    }
}
