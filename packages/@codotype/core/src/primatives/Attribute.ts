import { v4 as uuidv4 } from "uuid";
import { TokenCasing, Datatype, AddonsValue } from "..";
import { CreatedBy, CreatedByValues } from "../created-by";
import { Attribute } from "../attribute";

// // // //

interface AttributeBuilderParams {
    id?: string;
    identifiers: TokenCasing;
    datatype: Datatype;
    defaultValue?: null | string | boolean | number;
    internalNote?: string;
    source?: CreatedBy;
    locked?: boolean;
    addons?: AddonsValue;
}

export class AttributeBuilder implements Attribute {
    id: string = uuidv4();
    identifiers: TokenCasing;
    datatype: Datatype;
    defaultValue: string | number | boolean = null;
    internalNote: string = "";
    createdBy: CreatedBy = CreatedByValues.user;
    locked: boolean = false;
    addons: AddonsValue = {};

    constructor(params: AttributeBuilderParams) {
        this.identifiers = params.identifiers;
        this.datatype = params.datatype;

        this.id = params.id || this.id;
        this.defaultValue = params.defaultValue || this.defaultValue;
        this.internalNote = params.internalNote || this.internalNote;
        this.createdBy = params.source || this.createdBy;
        this.locked = params.locked || this.locked;
        this.addons = params.addons || this.addons;
    }
}
