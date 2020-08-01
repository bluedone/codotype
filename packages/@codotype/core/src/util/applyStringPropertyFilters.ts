import { StringValueFilter } from "../property-filter";
import { makeLabelCase } from "./makeLabelCase";
import { makeCamelCase } from "./makeCamelCase";
import { makeSnakeCase } from "./makeSnakeCase";
import { makePascalCase } from "./makePascalCase";
import { makeKebabCase } from "./makeKebabCase";

/** Maps every StringValueFilter (hopefully) to its function. */
const filterFuncs = {
  [StringValueFilter.lowercase]: (val: string) => val.toLowerCase(),
  [StringValueFilter.uppercase]: (val: string) => val.toUpperCase(),
  [StringValueFilter.titlecase]: makeLabelCase,
  [StringValueFilter.camelcase]: makeCamelCase,
  [StringValueFilter.snakecase]: makeSnakeCase,
  [StringValueFilter.pascalcase]: makePascalCase,
  [StringValueFilter.kebabcase]: makeKebabCase,
  [StringValueFilter.nonumbers]: (val: string) => val.replace(/[0-9]/g, ""),
  [StringValueFilter.nosymbols]: (val: string) =>
    val.replace(/[^a-zA-Z\s]/gi, ""),
  [StringValueFilter.trimwhitespace]: (val: string) => val.trim(),
  [StringValueFilter.removewhitespace]: (val: string) => val.replace(/\s/g, ""),
};

/**
 * Apply StringValueFilter(s) to a string value in order.
 *
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
  filters: StringValueFilter[];
}): string {
  return filters.reduce(
    (str, filter) => filterFuncs[String(filter)](str),
    value
  );
}
