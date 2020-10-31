/*
 * StringPropertyTransformations
 * Defines the types of changes that are applied to the user-provided string input for a ConfigurationGroupProperty
 * These are only applied when ConfigurationGroupProperty.datatype === "STRING"
 */
export enum StringPropertyTransformations {
    lowercase = "lowercase",
    uppercase = "uppercase",
    titlecase = "titlecase",
    camelcase = "camelcase",
    snakecase = "snakecase",
    pascalcase = "pascalcase",
    kebabcase = "kebabcase",
    nonumbers = "no_numbers",
    nosymbols = "no_symbols",
    trimwhitespace = "trim_whitespace",
    removewhitespace = "remove_whitespace",
}

/*
 * NumberPropertyTransformations
 * Defines the types of changes that are applied to the user-provided numeric input for a ConfigurationGroupProperty
 * These are only applied when ConfigurationGroupProperty.datatype === "NUMBER"
 */
export enum NumberPropertyTransformations {
    positiveValue = "positive_value",
    negativeValue = "negative_value",
    integerValue = "integer_value",
}

/**
 * PropertyTransformation
 * Defines a type alias of acceptable values for ConfigurationGroupProperty.filters
 * Includes the union of values defined in StringPropertyTransformations & NumberPropertyTransformations
 */
export type PropertyTransformation =
    | "lowercase"
    | "uppercase"
    | "titlecase"
    | "camelcase"
    | "snakecase"
    | "pascalcase"
    | "kebabcase"
    | "no_numbers"
    | "no_symbols"
    | "trim_whitespace"
    | "remove_whitespace"
    | "positive_value"
    | "negative_value"
    | "integer_value";
