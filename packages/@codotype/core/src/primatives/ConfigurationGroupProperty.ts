import { v4 as uuidv4 } from "uuid";
import {
    ConfigurationGroupProperty,
    DropdownOption,
    OptionType,
    OptionValue,
    PropertyLayoutVariant,
} from "../configuration-option-types";
import { PropertyFilter } from "../property-filter";
import { PropertyValidations } from "../property-validation";
import { DataPreviewLayoutVariant, DataPreview } from "../data-preview";

// // // //

interface ConfigurationGroupPropertyBuilderParams {
    id?: string;
    label: string;
    identifier: string;
    type: OptionType;
    dropdownOptions?: DropdownOption[];
    defaultValue?: OptionValue;
    description?: string;
    documentation?: string;
    icon?: string;
    required?: boolean;
    enabledByDefault?: boolean;
    allowDisable?: boolean;
    layoutVariant?: PropertyLayoutVariant;
    properties?: ConfigurationGroupProperty[];
    filters?: PropertyFilter[];
    validations?: PropertyValidations;
    dataPreview?: DataPreview;
}

export class ConfigurationGroupPropertyBuilder
    implements ConfigurationGroupProperty {
    id: string = uuidv4();
    label: string;
    identifier: string;
    type: OptionType;
    defaultValue: OptionValue = null;
    description: string = "";
    documentation: string = "";
    icon: string = "";
    required: boolean = false; // TODO - remove this, handled by validations?
    unique: boolean = false; // TODO - remove this, handled by validations?
    enabledByDefault: boolean = true;
    allowDisable: boolean = false; // QUESTION - should this be true?
    layoutVariant: PropertyLayoutVariant;
    properties: ConfigurationGroupProperty[] = [];
    dropdownOptions: DropdownOption[] = [];
    filters: PropertyFilter[] = [];
    validations: PropertyValidations = [];
    dataPreview: DataPreview = {
        rules: [],
        variant: DataPreviewLayoutVariant.CODE_DARK,
    };

    constructor(params: ConfigurationGroupPropertyBuilderParams) {
        this.label = params.label;
        this.identifier = params.identifier;
        this.type = params.type;

        this.id = params.id || this.id;
        this.defaultValue = params.defaultValue || this.defaultValue;
        this.description = params.description || this.description;
        this.documentation = params.documentation || this.documentation;
        this.icon = params.icon || this.icon;
        this.required = params.required || this.required;
        this.enabledByDefault =
            params.enabledByDefault || this.enabledByDefault;
        this.allowDisable = params.allowDisable || this.allowDisable;
        this.layoutVariant =
            params.layoutVariant || PropertyLayoutVariant.CARD_COL_12;
        this.properties = params.properties || this.properties;
        this.dropdownOptions = params.dropdownOptions || this.dropdownOptions;
        this.filters = params.filters || this.filters;
        this.validations = params.validations || this.validations;
        this.dataPreview = params.dataPreview || this.dataPreview;
    }
}
