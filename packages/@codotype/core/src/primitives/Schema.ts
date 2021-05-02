import { v4 as uuidv4 } from "uuid";
import { SchemaInput, AttributeInput, RelationInput } from "..";
import { CreatedBy, CreatedByValues } from "../created-by";
import { TokenPluralization } from "../token";
import { ConfigurationValue } from "../configuration-value";

// // // //

interface SchemaBuilderParams {
    id?: string;
    attributes: AttributeInput[];
    identifiers: TokenPluralization;
    createdBy?: CreatedBy;
    locked?: boolean;
    configuration?: ConfigurationValue;
    internalNote?: string;
}

export class SchemaBuilder implements SchemaInput {
    id: string = uuidv4();
    attributes: AttributeInput[];
    identifiers: TokenPluralization;
    createdBy: CreatedBy = CreatedByValues.user;
    locked: boolean = false;
    configuration: ConfigurationValue = {};
    internalNote: string = "";

    constructor(params: SchemaBuilderParams) {
        this.attributes = params.attributes;
        this.identifiers = params.identifiers;

        this.id = params.id || this.id;
        this.createdBy = params.createdBy || this.createdBy;
        this.locked = params.locked !== undefined ? params.locked : this.locked;
        this.configuration = params.configuration || this.configuration;
        this.internalNote = params.internalNote || this.internalNote;
    }
}
