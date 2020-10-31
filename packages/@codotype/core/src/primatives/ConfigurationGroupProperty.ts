import { v4 as uuidv4 } from "uuid";
import {
    ConfigurationGroupProperty,
    DropdownOption,
    OptionType,
    OptionValue,
    PropertyLayoutVariant,
} from "../configuration-option-types";
import { PropertyTransformation } from "../property-transformation";
import { PropertyValidation } from "../property-validation";
import { DataPreviewLayoutVariant, DataPreview } from "../data-preview";
import { Content } from "../content";

// // // //

interface ConfigurationGroupPropertyBuilderParams {
    id?: string;
    identifier: string;
    content: {
        label: string;
        description?: string;
        documentation?: string;
        icon?: string;
    };
    type: OptionType;
    dropdownOptions?: DropdownOption[];
    defaultValue?: OptionValue;
    required?: boolean;
    enabledByDefault?: boolean;
    allowDisable?: boolean;
    layoutVariant?: PropertyLayoutVariant;
    properties?: ConfigurationGroupProperty[];
    transformations?: PropertyTransformation[];
    validations?: PropertyValidation[];
    dataPreview?: DataPreview;
}

export class ConfigurationGroupPropertyBuilder
    implements ConfigurationGroupProperty {
    id: string = uuidv4();
    identifier: string;
    content: Content = {
        label: "",
        description: "",
        documentation: "",
        icon: "",
    };
    type: OptionType;
    defaultValue: OptionValue = null;
    required: boolean = false;
    unique: boolean = false;
    enabledByDefault: boolean = true;
    allowDisable: boolean = false;
    layoutVariant: PropertyLayoutVariant;
    properties: ConfigurationGroupProperty[] = [];
    dropdownOptions: DropdownOption[] = [];
    transformations: PropertyTransformation[] = [];
    validations: PropertyValidation[] = [];
    dataPreview: DataPreview = {
        rules: [],
        variant: DataPreviewLayoutVariant.CODE_DARK,
    };

    constructor(params: ConfigurationGroupPropertyBuilderParams) {
        this.id = params.id || this.id;
        this.identifier = params.identifier;

        // Sets this.content
        this.content = {
            label: params.content.label,
            description: params.content.description || this.content.description,
            documentation:
                params.content.documentation || this.content.documentation,
            icon: params.content.icon || this.content.icon,
        };

        this.type = params.type;
        this.defaultValue = params.defaultValue || this.defaultValue;
        this.required = params.required || this.required;
        this.enabledByDefault =
            params.enabledByDefault || this.enabledByDefault;
        this.allowDisable = params.allowDisable || this.allowDisable;
        this.layoutVariant =
            params.layoutVariant || PropertyLayoutVariant.CARD_COL_12;
        this.properties = params.properties || this.properties;
        this.dropdownOptions = params.dropdownOptions || this.dropdownOptions;
        this.validations = params.validations || this.validations;
        this.transformations = params.transformations || this.transformations;
        this.dataPreview = params.dataPreview || this.dataPreview;
    }
}
