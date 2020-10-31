import { StringPropertyFilters } from "../property-filter";
import { makeTitleCase } from "./makeTitleCase";
import { makeCamelCase } from "./makeCamelCase";
import { makeSnakeCase } from "./makeSnakeCase";
import { makePascalCase } from "./makePascalCase";
import { makeKebabCase } from "./makeKebabCase";

// // // //

/**
 * StringPropertyFiltersFilterFunction
 * Type alais for an acceptable function for a StringPropteryFilter
 */
type StringPropertyFiltersFilterFunction = (num: string) => string;

/**
 * filterFunctions
 * Maps each value in StringValueFilters enum to its respective function
 */
const filterFunctions: {
    [key in StringPropertyFilters]: StringPropertyFiltersFilterFunction;
} = {
    [StringPropertyFilters.lowercase]: (val: string) => val.toLowerCase(),
    [StringPropertyFilters.uppercase]: (val: string) => val.toUpperCase(),
    [StringPropertyFilters.titlecase]: makeTitleCase,
    [StringPropertyFilters.camelcase]: makeCamelCase,
    [StringPropertyFilters.snakecase]: makeSnakeCase,
    [StringPropertyFilters.pascalcase]: makePascalCase,
    [StringPropertyFilters.kebabcase]: makeKebabCase,
    [StringPropertyFilters.nonumbers]: (val: string) =>
        val.replace(/[0-9]/g, ""),
    [StringPropertyFilters.nosymbols]: (val: string) =>
        val.replace(/[^a-zA-Z\s]/gi, ""),
    [StringPropertyFilters.trimwhitespace]: (val: string) => val.trim(),
    [StringPropertyFilters.removewhitespace]: (val: string) =>
        val.replace(/\s/g, ""),
};

/**
 * applyStringPropertyFilters
 * Apply StringValueFilters to a string value, in order of props.filters
 * @param props Options object
 * @param props.value The string value to apply the filters to
 * @param props.filters The array of StringValueFilters to apply **in order**
 * @returns Filtered string value
 */
export function applyStringPropertyFilters({
    value,
    filters,
}: {
    value: string;
    filters: StringPropertyFilters[];
}): string {
    return filters.reduce(
        (str, filter) => filterFunctions[String(filter)](str),
        value,
    );
}
