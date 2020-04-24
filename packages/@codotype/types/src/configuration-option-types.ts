import { PropertyFilter } from "./property-filter";
import { PropertyValidation } from "./property-validation";

// // // //

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

/**
 * DropdownOption
 * Defines interface for handling Dropdown options throughout the application
 * Label + identifier is required, description + documentation is optional
 */
export interface DropdownOption {
  label: string;
  value: string;
  description?: string;
  documentation?: string;
}

// TODO - add variant to ConfigurationGroupProperty -> make list of use cases + mockups
export interface ConfigurationGroupProperty {
  label: string;
  identifier: string;
  description: string;
  documentation: string;
  icon: string;
  type: OptionType;
  defaultValue: OptionValue;
  required: boolean;
  enabled: boolean;
  allowDisable: boolean;
  layoutVariant?: PropertyLayoutVariant;
  properties: ConfigurationGroupProperty[];
  dropdownOptions: DropdownOption[];
  filters: PropertyFilter[];
  validations: PropertyValidation[];
}

// // // //

export enum PropertyLayoutVariant {
  HIDDEN = "hidden",
}

// LIST - lists all the properties. Documentation renders in a modal.
// DOCS - Half documentation, half properties. Documentation renders in-line.
// DETAIL - master/detail layout. Documentation renders in a modal.
export enum SectionLayoutVariant {
  LIST = "LIST",
  DOCS_3x9 = "DOCS_3x9",
  DOCS_4x8 = "DOCS_4x8",
  DOCS_6x6 = "DOCS_6x6",
  DETAIL_3x9 = "DETAIL_3x9",
  DETAIL_4x8 = "DETAIL_4x8",
  DETAIL_6x6 = "DETAIL_6x6",
}

// Defines the LayoutVariant type that's ONLY used for ConfigurationGroup
// TABS - Renders a Tab for each ConfigurationGroupSection
export enum GroupLayoutVariant {
  TABS = "TABS",
  LIST = "LIST",
  DOCS_3x9 = "DOCS_3x9",
  DOCS_4x8 = "DOCS_4x8",
  DOCS_6x6 = "DOCS_6x6",
  DETAIL_3x9 = "DETAIL_3x9",
  DETAIL_4x8 = "DETAIL_4x8",
  DETAIL_6x6 = "DETAIL_6x6",
}

// // // //

interface ConfigurationBase {
  label: string;
  identifier: string;
  description: string;
  documentation: string; // Markdown
  enabled: boolean;
  allowDisable: boolean;
}

// // // //

/**
 * ConfigurationGroupSection
 * Defines values for ConfigurationGroup.sections
 * Encapsulates a section of the configuration that can hold many properties
 * Many sections can be encapsulated together in a ConfigurationGroup,
 * and many ConfigurationGroups in a Generator or SchemaEditorConfiguration
 */
export interface ConfigurationGroupSection extends ConfigurationBase {
  layoutVariant: SectionLayoutVariant;
  properties: ConfigurationGroupProperty[];
}

// // // //

export interface ConfigurationGroup extends ConfigurationBase {
  layoutVariant: GroupLayoutVariant;
  sections: ConfigurationGroupSection[];
  properties: ConfigurationGroupProperty[];
}
