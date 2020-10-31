/*
 * StringPropertyFilters
 * Defines the types of changes that are applied to the user-provided string input for a ConfigurationGroupProperty
 * These are only applied when ConfigurationGroupProperty.datatype === "STRING"
 */
export enum StringPropertyFilters {
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
 * NumberPropertyFilters
 * Defines the types of changes that are applied to the user-provided numeric input for a ConfigurationGroupProperty
 * These are only applied when ConfigurationGroupProperty.datatype === "NUMBER"
 */
export enum NumberPropertyFilters {
    positiveValue = "positive_value",
    negativeValue = "negative_value",
    integerValue = "integer_value",
}

/**
 * PropertyFilter
 * Defines a type alias of acceptable values for ConfigurationGroupProperty.filters
 * Includes the union of values defined in StringPropertyFilters & NumberPropertyFilters
 */
export type PropertyFilter =
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
