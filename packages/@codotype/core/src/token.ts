/**
 * TokenPluralization
 * Encapsulates both singular and plural TokenCasing objects - @see Schema.identifiers
 * @param singular - the singular TokenCasing object
 * @param plural - the plural TokenCasing object
 */
export interface TokenPluralization {
    singular: TokenCasing;
    plural: TokenCasing;
}

/**
 * TokenCasing
 * Encapsulates different tokens used by a Plugin to produce code that matches situational expectations
 * @param label - the title-cased token, i.e. `My Project`
 * @param snake - the snake-cased token, i.e. `my_project`
 * @param camel - the camel-cased token, i.e. `myProject`
 * @param pascal - the pascal-cased token, i.e. `MyProject`
 * @param kebab - the kebab-cased token, i.e. `my-project`
 */
export interface TokenCasing {
    label: string;
    snake: string;
    camel: string;
    pascal: string;
    kebab: string;
}

/**
 * EMPTY_TOKEN_CASING
 * Defines an empty TokenCasing object
 */
export const EMPTY_TOKEN_CASING: TokenCasing = {
    label: "",
    snake: "",
    camel: "",
    pascal: "",
    kebab: "",
};
