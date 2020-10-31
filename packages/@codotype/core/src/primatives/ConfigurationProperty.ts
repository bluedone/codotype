import { v4 as uuidv4 } from "uuid";
import {
    ConfigurationProperty,
    DropdownOption,
    OptionType,
    OptionValue,
    PropertyLayoutVariants,
} from "../configuration-option-types";
import { PropertyTransformation } from "../property-transformation";
import { PropertyValidation } from "../property-validation";
import { DataPreviewLayoutVariant, DataPreview } from "../data-preview";
import { Content } from "../content";

// // // //

interface ConfigurationPropertyBuilderParams {
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
    layoutVariant?: PropertyLayoutVariants;
    properties?: ConfigurationProperty[];
    transformations?: PropertyTransformation[];
    validations?: PropertyValidation[];
    dataPreview?: DataPreview;
}

export class ConfigurationPropertyBuilder implements ConfigurationProperty {
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
    layoutVariant: PropertyLayoutVariants;
    properties: ConfigurationProperty[] = [];
    dropdownOptions: DropdownOption[] = [];
    transformations: PropertyTransformation[] = [];
    validations: PropertyValidation[] = [];
    dataPreview: DataPreview = {
        rules: [],
        variant: DataPreviewLayoutVariant.CODE_DARK,
    };

    constructor(params: ConfigurationPropertyBuilderParams) {
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
            params.layoutVariant || PropertyLayoutVariants.CARD_COL_12;
        this.properties = params.properties || this.properties;
        this.dropdownOptions = params.dropdownOptions || this.dropdownOptions;
        this.validations = params.validations || this.validations;
        this.transformations = params.transformations || this.transformations;
        this.dataPreview = params.dataPreview || this.dataPreview;
    }
}
