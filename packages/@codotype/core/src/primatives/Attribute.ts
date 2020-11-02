import { v4 as uuidv4 } from "uuid";
import { TokenCasing, Datatype, AddonsValue } from "..";
import { CreatedBy, CreatedByValues } from "../created-by";
import { AttributeInput } from "../attribute";
import { TokenCasingBuilder } from "./TokenCasing";

// // // //

interface AttributeBuilderParams {
    id?: string;
    identifiers?: TokenCasing;
    datatype?: Datatype;
    internalNote?: string;
    createdBy?: CreatedBy;
    locked?: boolean;
    addons?: AddonsValue;
}

export class AttributeInputBuilder implements AttributeInput {
    id: string = uuidv4();
    identifiers: TokenCasing = new TokenCasingBuilder({ title: "" });
    datatype: Datatype | null = null;
    internalNote: string = "";
    createdBy: CreatedBy = CreatedByValues.user;
    locked: boolean = false;
    addons: AddonsValue = {};

    constructor(params: AttributeBuilderParams) {
        this.id = params.id === "" ? params.id : this.id;
        this.identifiers = params.identifiers || this.identifiers;
        this.datatype = params.datatype || this.datatype;
        this.internalNote = params.internalNote || this.internalNote;
        this.createdBy = params.createdBy || this.createdBy;
        this.locked = params.locked || this.locked;
        this.addons = params.addons || this.addons;
    }
}
