import { PropertyTransformation } from "./property-transformation";
import { PropertyValidation } from "./property-validation";
import { PropertyPreview } from "./property-preview";
import { Content } from "./content";

// // // //

// Feature - what other types need to be supported here?
// - RADIO_GROUP (nice, but not necessary - use DROPDOWN)
// - CHECKBOXES - nice, but functionally the same as a MULTI_DROPDOWN
// - DATE
// - TIME
// - DATETIME
// - JSON - low-priority, not really necessary
// QUESTION - how can this reference Schema Metadata?
//          - Support SCHEMA / ATTRIBUTE / RELATION types here?
//          - Schema -> Stores SchemaID
//          - Attribute -> Stores SchemaID + AttributeID
//          - Relation -> Stores SchemaID + RelationID
// ---------------
// QUESTION - how can this support Configuration Metadata?
//          - What's the use case? -> You could create a "Role" in one
//              COLLECTION, and select it as a property for an instance
//              in another COLLECTION. Makes sense - powerful.
//          - It should be limited to COLLECTION - the property.type can be "COLLECTION_REFERENCE"
//          - We'll also need to store the ID of the associated COLLECTION property - where should that be done?
export enum PropertyType {
    STRING = "STRING",
    NUMBER = "NUMBER",
    BOOLEAN = "BOOLEAN",
    DROPDOWN = "DROPDOWN",
    MULTI_DROPDOWN = "MULTI_DROPDOWN",
    COLLECTION = "COLLECTION",
    INSTANCE = "INSTANCE",
}

/**
 * PropertyLayoutVariant
 * Defines different layout styles for a ConfigurationProperty
 */
type PropertyLayoutVariant =
    | "COL_3"
    | "COL_4"
    | "COL_6"
    | "COL_8"
    | "COL_12"
    | "CARD_COL_3"
    | "CARD_COL_4"
    | "CARD_COL_6"
    | "CARD_COL_8"
    | "CARD_COL_12";
export enum PropertyLayoutVariants {
    COL_3 = "COL_3",
    COL_4 = "COL_4",
    COL_6 = "COL_6",
    COL_8 = "COL_8",
    COL_12 = "COL_12",
    CARD_COL_3 = "CARD_COL_3",
    CARD_COL_4 = "CARD_COL_4",
    CARD_COL_6 = "CARD_COL_6",
    CARD_COL_8 = "CARD_COL_8",
    CARD_COL_12 = "CARD_COL_12",
    // FEATURE: Add additional variants:
    // - inline documentation
    // - modal?
    // - else?
}

// Feature: update this to store a value that references an instance in a collection defined in another ConfigurationProperty( i.e. { enabled: boolean; value: { collectionSource: UUID, collectionValue: UUID }})
// TODO - rename to ConfigurationPropertyValue
export type OptionValue =
    | string
    | string[]
    | number
    | number[]
    | boolean
    | OptionValueInstance
    | OptionValueInstance[]
    | null;

// TODO - rename this to ConfigurationPropertyValue
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

/**
 * ConfigurationProperty
 * Represents a single user-configurable property for a Plugin
 */
// TOOD - WHERE should this include the TokenPluralization required for `COLLECTION` type?
export interface ConfigurationProperty {
    // Meta/Content
    content: Content;

    // Functional
    identifier: string; // NOTE - this is "identifier" so if its ever stored in a database, the "id" column will be available
    type: PropertyType;
    defaultValue: OptionValue;
    dropdownOptions: DropdownOption[];
    properties: ConfigurationProperty[];

    // Aesthetic
    enabledByDefault: boolean;
    allowDisable: boolean;
    preview: PropertyPreview;
    layoutVariant: PropertyLayoutVariant;
    // columnSpan: 3 | 4 | 6 | 8 | 9 | 12;
    // style: ConfigurationPropertyStyle
    // collectionTokenCasing

    // Validation
    required: boolean; // Do we need this?
    unique: boolean; // NOTE - this is new. Only used with COLLECTION type
    validations: PropertyValidation[];
    transformations: PropertyTransformation[];
}
