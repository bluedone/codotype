import {
  ConfigurationGroupProperty,
  DropdownOption,
  OptionType,
  OptionValue,
  PropertyLayoutVariant
} from "../configuration-option-types";
import { PropertyFilter } from "../property-filter";
import { PropertyValidation } from "../property-validation";

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
  enabled?: boolean;
  allowDisable?: boolean;
  layoutVariant?: PropertyLayoutVariant;
  properties?: ConfigurationGroupProperty[];
  filters?: PropertyFilter[];
  validations?: PropertyValidation[];
}

// TODO - this should be moved into @codotype/util
// b.c this depends on `makeUniqueId` from util, but util depends on types - can't have circular dependency
export class ConfigurationGroupPropertyBuilder
  implements ConfigurationGroupProperty {
  id: string = Math.random().toString(); // TODO - replace with makeUniqueId from @codotype/util
  label: string;
  identifier: string;
  type: OptionType;
  defaultValue: OptionValue = null;
  description: string = "";
  documentation: string = "";
  icon: string = "";
  required: boolean = false; // TODO - remove this, handled by validations
  enabled: boolean = true;
  allowDisable: boolean = false; // QUESTION - should this be true?
  // layoutVariant?: PropertyLayoutVariant;
  properties: ConfigurationGroupProperty[] = [];
  dropdownOptions: DropdownOption[] = [];
  filters: PropertyFilter[] = [];
  validations: PropertyValidation[] = [];

  constructor(params: ConfigurationGroupPropertyBuilderParams) {
    this.label = params.label;
    this.identifier = params.identifier;
    this.type = params.type;

    this.id = params.id || this.id;
    this.defaultValue = params.defaultValue;
    this.description = params.description || this.description;
    this.documentation = params.documentation || this.documentation;
    this.icon = params.icon || this.icon;
    this.required = params.required || this.required;
    this.enabled = params.enabled || this.enabled;
    this.allowDisable = params.allowDisable || this.allowDisable;
    this.properties = params.properties || this.properties;
    this.dropdownOptions = params.dropdownOptions || this.dropdownOptions;
    this.filters = params.filters || this.filters;
    this.validations = params.validations || this.validations;
  }
}
