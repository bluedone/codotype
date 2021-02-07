import { Datatype } from "./datatype";
import { PropertyTypes, DropdownOption } from "./configuration-property";
import { PropertyTransformation } from "./property-transformation";
import { PropertyValidation } from "./property-validation";
import { Content } from "./content";
import { RelationType } from "./relation";

// // // //

/**
 * AddonPropertyInlineIcon
 * Defines the types of values that can be assigned to AddonProperty.inlineIcon
 * Used to determine which icon (if any) should be rendered inside the AttributeListItem + RelationListItem components in @codotype/ui
 */
type AddonPropertyInlineIcon =
    | ""
    | "asterisk"
    | "snowflake"
    | "star"
    | "tag"
    | "check";
export enum AddonPropertyInlineIcons {
    none = "",
    asterisk = "asterisk",
    snowflake = "snowflake",
    star = "star",
    tag = "tag",
    check = "check",
}

/**
 * AddonsValue
 * Defines a type to encapsulate the values that may be assigned for multiple AddonProperties for a specific Attribute or Relation
 */
export interface AddonsValue {
    [key: string]: null | string | boolean | number;
}

/**
 * AddonProperty
 * Defines a slimmed-down version of a ConfigurationProperty that can be used by a Plugin to
 * provide an additional layer of configuration on top of an Attribute or Relation.
 * For example,
 * - add a "required" or "unique" checkbox to user-defined Attributes using PropertyType.BOOLEAN
 */
export interface AddonProperty {
    content: Content; // See "Content" interface
    identifier: string; // "unique"
    exclusive: boolean; // False - one schema can have multiple unique properties
    required: boolean; // Does this need to be populated?
    inlineIcon: AddonPropertyInlineIcon; // See InlineIcons enum
    propertyType:
        | PropertyTypes.BOOLEAN
        | PropertyTypes.DROPDOWN
        | PropertyTypes.STRING
        | PropertyTypes.NUMBER; // Only stores primative data
    defaultValue: null | boolean | string | number;
    dropdownOptions: DropdownOption[]; // Only used when datatype: OptionType.DROPDOWN;
    validations: PropertyValidation[];
    transformations: PropertyTransformation[];
}

/**
 * AttributeAddon
 * Defines an interface that can be used to extend an `Attribute` with an AddonProperty
 */
export interface AttributeAddon {
    property: AddonProperty;
    supportedDatatypes: Datatype[];
}

/**
 * RelationAddon
 * Defines an interface that can be used to extend an `Relation` with an AddonProperty
 */
export interface RelationAddon {
    property: AddonProperty;
    supportedRelationTypes: RelationType[];
}
