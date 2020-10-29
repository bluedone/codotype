/**
 * StringValueValidationType
 * Designates different types of string validations to run against the
 * value of a specific ConfigurationGroupProperty
 */
enum StringValueValidationType {
    minLength = "MIN_LENGTH",
    maxLength = "MAX_LENGTH",
}

/**
 * NumberValueValidationType
 * Designates different types of number validations to run against the
 * value of a specific ConfigurationGroupProperty
 */
enum NumberValueValidationType {
    minValue = "MIN_VALUE",
    maxValue = "MAX_VALUE",
}

/**
 * StringValueValidation
 * Defines an interface to describe a single validation for a StringValue
 */
export interface StringValueValidation {
    validationType: StringValueValidationType;
    value: number;
}

/**
 * NumberValueValidation
 * Defines an interface to describe a single validation for a NumberValue
 */
export interface NumberValueValidation {
    validationType: NumberValueValidationType;
    value: number;
}

/**
 * PropertyValidation
 * Defines type union between StringValueValidation[] and NumberValueValidation[]
 * Used as the mechanism to make the PropertyValidation API available to consumers
 */
export type PropertyValidations =
    | StringValueValidation[]
    | NumberValueValidation[];
