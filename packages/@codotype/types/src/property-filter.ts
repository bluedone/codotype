// TODO - need a mechanism to ensure that filters
// are only applied to applicable datatypes

/*
 * StringValueFilter
 * Defines the types of filters that can be applied
 * the the value on a ConfigurationGroupProperty (STRING ONLY)
 */
export enum StringValueFilter {
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
 * NumberValueFilter
 * Defines the types of filters that can be applied
 * the the value on a ConfigurationGroupProperty (NUMBER ONLY)
 */
export enum NumberValueFilter {
  positiveValue = "POSITIVE_VALUE",
  absoluteValue = "ABSOLUTE_VALUE",
  negativeValue = "NEGATIVE_VALUE",
}

export type PropertyFilter = StringValueFilter | NumberValueFilter;
