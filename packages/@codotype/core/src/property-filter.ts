// TODO - need a mechanism to ensure that filters
// are only applied to applicable datatypes

/*
 * StringValueFilters
 * Defines the types of filters that can be applied
 * the the value on a ConfigurationGroupProperty (STRING ONLY)
 */
export enum StringValueFilters {
    lowercase = "LOWERCASE",
    uppercase = "UPPERCASE",
    titlecase = "TITLECASE",
    camelcase = "CAMELCASE",
    snakecase = "SNAKECASE",
    pascalcase = "PASCALCASE",
    kebabcase = "KEBABCASE",
    nonumbers = "NO_NUMBERS",
    nosymbols = "NO_SYMBOLS",
    trimwhitespace = "TRIM_WHITESPACE",
    removewhitespace = "REMOVE_WHITESPACE",
}

/*
 * NumberValueFilters
 * Defines the types of filters that can be applied
 * the the value on a ConfigurationGroupProperty (NUMBER ONLY)
 */
export enum NumberValueFilters {
    positiveValue = "POSITIVE_VALUE",
    negativeValue = "NEGATIVE_VALUE",
    integerValue = "INTEGER_VALUE",
}

/**
 * PropertyFilter
 */
export type PropertyFilter =
    | "LOWERCASE"
    | "UPPERCASE"
    | "TITLECASE"
    | "CAMELCASE"
    | "SNAKECASE"
    | "PASCALCASE"
    | "KEBABCASE"
    | "NO_NUMBERS"
    | "NO_SYMBOLS"
    | "TRIM_WHITESPACE"
    | "REMOVE_WHITESPACE"
    | "POSITIVE_VALUE"
    | "NEGATIVE_VALUE"
    | "INTEGER_VALUE";
