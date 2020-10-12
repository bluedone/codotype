import { v4 as uuidv4 } from "uuid";
import { TokenCasing, Datatype, SchemaSource, AttributeAddonValue } from "..";
import { Attribute } from "../attribute";

interface AttributeBuilderParams {
    id?: string;
    identifiers: TokenCasing;
    datatype: Datatype;
    defaultValue?: null | string | boolean | number;
    internalNote?: string;
    source?: SchemaSource;
    locked?: boolean;
    addons?: AttributeAddonValue;
}

export class AttributeBuilder implements Attribute {
    id: string = uuidv4();
    identifiers: TokenCasing;
    datatype: Datatype;
    defaultValue: string | number | boolean = null;
    internalNote: string = "";
    source: SchemaSource = SchemaSource.USER;
    locked: boolean = false;
    addons: AttributeAddonValue = {};

    constructor(params: AttributeBuilderParams) {
        this.identifiers = params.identifiers;
        this.datatype = params.datatype;

        this.id = params.id || this.id;
        this.defaultValue = params.defaultValue || this.defaultValue;
        this.internalNote = params.internalNote || this.internalNote;
        this.source = params.source || this.source;
        this.locked = params.locked || this.locked;
        this.addons = params.addons || this.addons;
    }
}
