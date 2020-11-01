import { Datatype } from "./datatype";
import { UUID } from "./uuid";
import { TokenCasing } from "./token";
import { CreatedBy } from "./created-by";
import { AddonsValue } from "./schema-editor-addon";

// // // //

export interface AttributeInput {
    id: UUID | null; // TODO - rename to identifier, rename token to tokens?
    datatype: Datatype | null;
    defaultValue: null | string | boolean | number;
    identifiers: TokenCasing; // Keep this, maybe allow users to edit later
    internalNote: string; // Good place to store data relevant to the person editing the Codotype project
    createdBy: CreatedBy;
    locked: boolean;
    addons: AddonsValue;
}

export interface Attribute {
    id: UUID; // TODO - rename to identifier?
    datatype: Datatype;
    defaultValue: null | string | boolean | number;
    identifiers: TokenCasing;
    internalNote: string; // Good place to store data relevant to the person editing the Codotype project
    createdBy: CreatedBy;
    locked: boolean;
    addons: AddonsValue;
}
