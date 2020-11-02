import { Datatype } from "./datatype";
import { UUID } from "./uuid";
import { TokenCasing } from "./token";
import { CreatedBy } from "./created-by";
import { AddonsValue } from "./schema-editor-addon";

// // // //

/**
 * AttributeInput
 * The `AttributeInput` interface represents the data to describe a single `Attribute` in @codotype/ui
 * The `AttributeInput` is goes through additional processing before being passed into a Plugin as a `Attribute`
 */
export interface AttributeInput {
    id: UUID | null;
    datatype: Datatype | null;
    identifiers: TokenCasing; // Keep this, maybe allow users to edit later
    internalNote: string; // Good place to store data relevant to the person editing the Codotype project
    createdBy: CreatedBy;
    locked: boolean;
    addons: AddonsValue;
}

/**
 * Attribute
 * The Attribute interface encapsulates the complete metadata used to describe a property belonging to a Schema
 * Used by a Plugin to generate the code required to successfully describe that Schema property in generated code
 */
export interface Attribute {
    id: UUID;
    datatype: Datatype;
    identifiers: TokenCasing;
    internalNote: string; // Good place to store data relevant to the person editing the Codotype project
    createdBy: CreatedBy;
    locked: boolean;
    addons: AddonsValue;
}
