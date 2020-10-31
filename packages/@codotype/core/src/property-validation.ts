/**
 * StringPropertyValidationType
 * Designates different types of string validations to run against the
 * value of a specific ConfigurationProperty
 */
export enum StringPropertyValidationTypes {
    minLength = "min_length",
    maxLength = "max_length",
}

/**
 * NumberPropertyValidationType
 * Designates different types of number validations to run against the
 * value of a specific ConfigurationProperty
 */
export enum NumberPropertyValidationTypes {
    minValue = "min_value",
    maxValue = "max_value",
}

/**
 * PropertyValidationType
 * Defines a type alias of acceptable values for PropertyValidation.type
 * Includes the union of values defined in StringPropertyValidationTypes & NumberPropertyValidationTypes
 */
export type PropertyValidationType =
    | "min_length"
    | "max_length"
    | "min_value"
    | "max_value";

/**
 * PropertyValidation
 * Defines an interface to describe a single validation for a NumberProperty
 */
export interface PropertyValidation {
    type: PropertyValidationType;
    value: number;
}
