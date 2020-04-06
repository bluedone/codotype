export enum ConfigurationOptionsType {
  STRING_SELECT = "STRING_SELECT",
}

// // // //

// TODO - what other types need to be supported here?
// RADIO_GROUP (nice, but not necessary)
// CHECKBOXES - nice, but functionally the same as a MULTI_DROPDOWN
// DATE
// TIME
// DATETIME
// JSON - low-priority, not really necessary
export enum OptionType {
  STRING = "STRING",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  DROPDOWN = "DROPDOWN",
  MULTI_DROPDOWN = "MULTI_DROPDOWN",
  COLLECTION = "COLLECTION",
  INSTANCE = "INSTANCE",
}

export type OptionValue =
  | string
  | string[]
  | number
  | number[]
  | boolean
  | OptionValueInstance
  | OptionValueInstance[]
  | null;

export type OptionValueInstance =
  | OptionValueInstanceStandard
  | OptionValueInstanceAllowDisable;

// TODO - should be:
// export interface OptionValueInstance {
//     enabled: boolean;
//     value: {
//         [key: string]: OptionValue;
//     };
// }

interface OptionValueInstanceStandard {
  [key: string]: OptionValue;
}

// NOTE - this distinction is confusing
// it should always include he enabled + value pair
// When we inflate the metadata to be used in the generator, we can simplify based on the allowDisable property
interface OptionValueInstanceAllowDisable {
  enabled: boolean;
  value: {
    [key: string]: OptionValue;
  };
}

// TODO - add `description` here -> label/value might not always be enough
export interface DropdownOption {
  label: string;
  value: string;
}

// TODO - add variant to ConfigurationGroupProperty -> make list of use cases + mockups
// TODO - add `documentation` property to `ConfigurationGroupProperty` - description might not always be enough.
// TODO - add `filters` property to `ConfigurationGroupProperty` - should accept a set of ordered, pre-defined
// transformations that can be applied to a `ConfigurationGroupProperty` of a specific OptionType.
// i.e., for a Text input field, you can apply -> "strip numbers" -> "strip symbols" -> "lowercase" -> "underscored"
export interface ConfigurationGroupProperty {
  label: string;
  identifier: string;
  description: string;
  icon: string;
  type: OptionType;
  defaultValue: OptionValue;
  required: boolean;
  enabled: boolean;
  allowDisable: boolean;
  properties: ConfigurationGroupProperty[];
  dropdownOptions: DropdownOption[];
}

// TODO - integrate through the app
// TODO - add the remaining variant values here
export enum ConfigurationGroupLayoutVariant {
  list = "LIST",
}

export interface ConfigurationGroup {
  label: string;
  identifier: string;
  description: string;
  documentation: string; // Markdown
  enabled: boolean;
  allowDisable: boolean;
  variant: "LIST" | "SIDEBYSIDE"; // TODO - enum + rename!
  properties: ConfigurationGroupProperty[];
}
