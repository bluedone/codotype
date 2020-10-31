import { NumberPropertyFilters } from "../property-filter";

// // // //

/**
 * NumberPropertyFilterFunction
 * Type alais for an acceptable function for a NumberPropteryFilter
 */
type NumberPropertyFilterFunction = (num: number) => number;

/**
 * filterFunctions
 * Maps each value in NumberValueFilters enum to its respective function
 */
const filterFunctions: {
    [key in NumberPropertyFilters]: NumberPropertyFilterFunction;
} = {
    [NumberPropertyFilters.integerValue]: (num: number) => Math.floor(num),
    [NumberPropertyFilters.positiveValue]: (num: number) => Math.abs(num),
    [NumberPropertyFilters.negativeValue]: (num: number) => -1 * Math.abs(num),
};

/**
 * applyNumberPropertyFilters
 * Apply NumberValueFilters to a numeric value, in order of props.filters
 * @param props Options object
 * @param props.value The number value to apply the filters to
 * @param props.filters The array of NumberPropertyFilters to apply **in order**
 * @returns Filtered number value
 */
export function applyNumberPropertyFilters({
    value,
    filters,
}: {
    value: number;
    filters: NumberPropertyFilters[];
}): number {
    return filters.reduce(
        (str, filter) => filterFunctions[String(filter)](str),
        value,
    );
}
