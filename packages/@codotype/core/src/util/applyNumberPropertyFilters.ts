import { NumberValueFilter } from "../property-filter";

/** Maps every NumberValueFilter to its function. */
const filterFuncs = {
  [NumberValueFilter.integerValue]: (num) => Math.floor(num),
  [NumberValueFilter.positiveValue]: (num) => Math.abs(num),
  [NumberValueFilter.negativeValue]: (num) => -1 * Math.abs(num),
};

/**
 * Apply NumberValueFilter(s) to a number value in order.
 *
 * @param props Options object
 * @param props.value The number value to apply the filters to
 * @param props.filters The array of NumberValueFilters to apply **in order**
 * @returns Filtered number value
 */
export function applyNumberPropertyFilters({
  value,
  filters,
}: {
  value: number;
  filters: NumberValueFilter[];
}): number {
  return filters.reduce(
    (str, filter) => filterFuncs[String(filter)](str),
    value
  );
}
