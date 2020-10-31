import { StringValueFilters } from "../property-filter";
import { makeTitleCase } from "./makeTitleCase";
import { makeCamelCase } from "./makeCamelCase";
import { makeSnakeCase } from "./makeSnakeCase";
import { makePascalCase } from "./makePascalCase";
import { makeKebabCase } from "./makeKebabCase";

/** Maps every StringValueFilter (hopefully) to its function. */
const filterFuncs = {
    [StringValueFilters.lowercase]: (val: string) => val.toLowerCase(),
    [StringValueFilters.uppercase]: (val: string) => val.toUpperCase(),
    [StringValueFilters.titlecase]: makeTitleCase,
    [StringValueFilters.camelcase]: makeCamelCase,
    [StringValueFilters.snakecase]: makeSnakeCase,
    [StringValueFilters.pascalcase]: makePascalCase,
    [StringValueFilters.kebabcase]: makeKebabCase,
    [StringValueFilters.nonumbers]: (val: string) => val.replace(/[0-9]/g, ""),
    [StringValueFilters.nosymbols]: (val: string) =>
        val.replace(/[^a-zA-Z\s]/gi, ""),
    [StringValueFilters.trimwhitespace]: (val: string) => val.trim(),
    [StringValueFilters.removewhitespace]: (val: string) =>
        val.replace(/\s/g, ""),
};

/**
 * applyStringPropertyFilters
 * Apply StringValueFilter(s) to a string value in order.
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
    filters: StringValueFilters[];
}): string {
    return filters.reduce(
        (str, filter) => filterFuncs[String(filter)](str),
        value,
    );
}
