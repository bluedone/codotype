import * as React from "react";
import { string } from "prop-types";

// // // //

/**
 * MoreInfoLinkProps
 * Props for the `MoreInfoLink` component
 * @param url - the URL thats linked to
 */
interface MoreInfoLinkProps {
  url: string;
}

/**
 * MoreInfoLink
 * Renders a link that when clicked opens a new tab to some relevant information
 */
export function MoreInfoLink(props: MoreInfoLinkProps) {
  return (
    <a href={props.url} target="_blank">
      More Info
    </a>
  );
}

// // // //
// // // //
// // // //

// Example OptionValueInstance
// {
//   componentName: "MoreInfoLink",
//     componentSlug: "more_info_link",
//       props: [
//         { type: "number", name: "age", desc: "desc" }
//     { type: "function", name: "onChange", desc: "desc" }
//       ],
//         tests: {
//     enabled: true,
//       properties: {
//       type: "TABLE_TEST"
//     }
//   }
// }

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

type OptionValueInstance =
  | OptionValueInstanceStandard
  | OptionValueInstanceAllowDisable;

interface OptionValueInstanceStandard {
  [key: string]: OptionValue;
}

interface OptionValueInstanceAllowDisable {
  enabled: boolean;
  value: OptionValue;
}

interface DropdownOption {
  label: string;
  value: string;
}

interface ConfigurationGroupProperty {
  label: string;
  identifier: string;
  description: string;
  type: OptionType;
  defaultValue: OptionValue;
  required: boolean;
  enabled: boolean;
  allowDisable: boolean;
  properties: ConfigurationGroupProperty[];
  dropdownOptions: DropdownOption[];
}

interface ConfigurationGroup {
  label: string;
  identifier: string;
  description: string;
  enabled: boolean;
  allowDisable: boolean;
  scope: string; // enum
  variant: string; //enum
  properties: ConfigurationGroupProperty[];
}

// ^^^^ this is built from:

export const ComponentBuilderConfigurationGroupProperty: ConfigurationGroupProperty = {
  label: "Component",
  identifier: "components",
  description: "Define the component data",
  type: OptionType.COLLECTION,
  defaultValue: [],
  enabled: true,
  required: false,
  allowDisable: false,
  dropdownOptions: [],
  properties: [
    {
      label: "Component Name",
      identifier: "componentName",
      description: "Name of the component",
      type: OptionType.STRING,
      defaultValue: "",
      enabled: true,
      required: false,
      allowDisable: false,
      properties: [],
      dropdownOptions: [],
    },
    {
      label: "Component Slug",
      identifier: "componentSlug",
      description: "Slug of the component",
      type: OptionType.STRING,
      defaultValue: "",
      enabled: true,
      required: false,
      allowDisable: false,
      properties: [],
      dropdownOptions: [],
    },
    {
      label: "Props",
      identifier: "props",
      description: "",
      dropdownOptions: [],
      type: OptionType.COLLECTION,
      defaultValue: "",
      enabled: true,
      required: false,
      allowDisable: false,
      properties: [
        {
          label: "Type",
          identifier: "type",
          description: "",
          type: OptionType.DROPDOWN,
          defaultValue: "",
          enabled: true,
          required: false,
          allowDisable: false,
          dropdownOptions: [{ label: "String", value: "string" }],
          properties: [],
        },
        {
          label: "Name",
          identifier: "name",
          description: "",
          type: OptionType.STRING,
          defaultValue: "",
          enabled: true,
          required: false,
          allowDisable: false,
          dropdownOptions: [],
          properties: [],
        },
        {
          label: "Desc",
          identifier: "desc",
          description: "",
          type: OptionType.STRING,
          defaultValue: "",
          enabled: true,
          required: false,
          allowDisable: false,
          dropdownOptions: [],
          properties: [],
        },
      ],
    },
    {
      label: "Tests",
      identifier: "tests",
      description: "",
      type: OptionType.INSTANCE,
      defaultValue: "",
      enabled: true,
      required: false,
      allowDisable: true,
      dropdownOptions: [],
      properties: [
        {
          label: "Test Type",
          identifier: "testType",
          description: "",
          type: OptionType.DROPDOWN,
          defaultValue: "",
          enabled: true,
          required: false,
          allowDisable: false,
          dropdownOptions: [],
          properties: [],
        },
      ],
    },
  ],
};

export const ComponentBuilderConfigurationGroup: ConfigurationGroup = {
  label: "Component Generator",
  identifier: "components_group",
  description: "Generate React components",
  enabled: true,
  allowDisable: false,
  variant: "",
  scope: "",
  properties: [ComponentBuilderConfigurationGroupProperty],
};

/**
 * buildConfigurationGroupPropertyValue
 * Accepts a single ConfigurationGroupProperty and recursively produces its associated OptionValue instance
 * @param property - the single ConfigurationGroupProperty for which the OptionValue is being produced
 */
export function buildConfigurationGroupPropertyValue(
  property: ConfigurationGroupProperty
): OptionValue {
  if (property.type === OptionType.STRING) {
    return property.defaultValue || "";
  }
  if (property.type === OptionType.BOOLEAN) {
    return property.defaultValue || false;
  }
  if (property.type === OptionType.DROPDOWN) {
    return property.defaultValue || "";
  }
  if (property.type === OptionType.COLLECTION) {
    return [buildConfigurationGroupValue(property.properties)];
    // Should return this:
    // return [];
  }
  if (property.type === OptionType.INSTANCE) {
    return buildConfigurationGroupValue(property.properties);
  }
  return "";
}

/**
 * buildConfigurationGroupValue
 * Builds the top-level OptionValueInstance for a single ConfigurationGroup
 * @param properties - array of ConfigurationGroupProperty
 */
export function buildConfigurationGroupValue(
  properties: ConfigurationGroupProperty[]
): OptionValueInstance {
  const initialValue: OptionValueInstance = {};

  // Defines empty ConfigurationGroupValue
  // Iterates over each property in the group and assigns values
  const configurationGroupValue: any = properties.reduce(
    (val, property: ConfigurationGroupProperty) => {
      // Updates val with data for ConfigurationGroupProperty
      if (property.allowDisable && !property.required) {
        val[property.identifier] = {
          enabled: property.enabled,
          value: buildConfigurationGroupPropertyValue(property),
        };
      } else {
        val[property.identifier] = buildConfigurationGroupPropertyValue(
          property
        );
      }
      // Returns val
      return val;
    },
    initialValue // Passes in empty OptionValueInstance
  );

  // Returns ConfigurationGroupValue
  return configurationGroupValue;
}

// // // //
