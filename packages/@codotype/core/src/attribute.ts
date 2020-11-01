import { Datatype } from "./datatype";
import { UUID } from "./uuid";
import { TokenCasing } from "./token";
import { SchemaCreators } from "./schema";
import { AddonsValue } from "./schema-editor-addon";

// // // //

export interface AttributeInput {
    id: UUID | null;
    datatype: Datatype | null;
    defaultValue: null | string | boolean | number;
    identifiers: TokenCasing; // Keep this, maybe allow users to edit later
    internalNote: string; // Good place to store data relevant to the person editing the Codotype project
    source: SchemaCreators;
    locked: boolean;
    addons: AddonsValue;
}

export interface Attribute {
    id: UUID;
    datatype: Datatype;
    defaultValue: null | string | boolean | number;
    identifiers: TokenCasing;
    internalNote: string; // Good place to store data relevant to the person editing the Codotype project
    source: SchemaCreators;
    locked: boolean;
    addons: AddonsValue;
}
