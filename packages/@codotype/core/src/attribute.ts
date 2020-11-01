import { Datatype } from "./datatype";
import { UUID } from "./uuid";
import { TokenCasing, EMPTY_TOKEN_CASING } from "./token";
import { SchemaCreators } from "./schema";

// // // //

export interface AttributeAddonValue {
    [key: string]: null | string | boolean | number;
}

export interface AttributeInput {
    id: UUID | null;
    datatype: Datatype | null;
    defaultValue: null | string | boolean | number;
    identifiers: TokenCasing; // Keep this, maybe allow users to edit later
    internalNote: string; // Good place to store data relevant to the person editing the Codotype project
    source: SchemaCreators;
    locked: boolean;
    addons: AttributeAddonValue;
}

export interface Attribute {
    id: UUID;
    datatype: Datatype;
    defaultValue: null | string | boolean | number;
    identifiers: TokenCasing;
    internalNote: string; // Good place to store data relevant to the person editing the Codotype project
    source: SchemaCreators;
    locked: boolean;
    addons: AttributeAddonValue;
}
