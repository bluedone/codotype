import {
    StringPropertyTransformations,
    NumberPropertyTransformations,
} from "../property-transformation";
import { makeTitleCase } from "./makeTitleCase";
import { makeCamelCase } from "./makeCamelCase";
import { makeSnakeCase } from "./makeSnakeCase";
import { makePascalCase } from "./makePascalCase";
import { makeKebabCase } from "./makeKebabCase";

// // // //

/**
 * StringPropertyTransform
 * Type alais for an acceptable function for a StringPropteryFilter
 */
type StringPropertyTransform = (num: string) => string;

/**
 * stringTransforms
 * Maps each value in StringValueFilters enum to its respective function
 */
const stringTransforms: {
    [key in StringPropertyTransformations]: StringPropertyTransform;
} = {
    [StringPropertyTransformations.lowercase]: (val: string) =>
        val.toLowerCase(),
    [StringPropertyTransformations.uppercase]: (val: string) =>
        val.toUpperCase(),
    [StringPropertyTransformations.titlecase]: makeTitleCase,
    [StringPropertyTransformations.camelcase]: makeCamelCase,
    [StringPropertyTransformations.snakecase]: makeSnakeCase,
    [StringPropertyTransformations.pascalcase]: makePascalCase,
    [StringPropertyTransformations.kebabcase]: makeKebabCase,
    [StringPropertyTransformations.nonumbers]: (val: string) =>
        val.replace(/[0-9]/g, ""),
    [StringPropertyTransformations.nosymbols]: (val: string) =>
        val.replace(/[^a-zA-Z\s]/gi, ""),
    [StringPropertyTransformations.trimwhitespace]: (val: string) => val.trim(),
    [StringPropertyTransformations.removewhitespace]: (val: string) =>
        val.replace(/\s/g, ""),
};

/**
 * applyStringPropertyTransformations
 * Apply StringPropertyTransformations to a string value, in order of props.filters
 * @param props Options object
 * @param props.value The string value to apply the filters to
 * @param props.transformations The array of StringPropertyTransformations to apply **in order**
 * @returns Filtered string value
 */
export function applyStringPropertyTransformations({
    value,
    transformations,
}: {
    value: string;
    transformations: StringPropertyTransformations[];
}): string {
    return transformations.reduce(
        (str, filter) => stringTransforms[String(filter)](str),
        value,
    );
}

// // // //

/**
 * NumberPropertyTransform
 * Type alais for an acceptable function for a NumberPropteryFilter
 */
type NumberPropertyTransform = (num: number) => number;

/**
 * numberTransforms
 * Maps each value in NumberPropertyTransformations enum to its respective function
 */
const numberTransforms: {
    [key in NumberPropertyTransformations]: NumberPropertyTransform;
} = {
    [NumberPropertyTransformations.integerValue]: (num: number) =>
        Math.floor(num),
    [NumberPropertyTransformations.positiveValue]: (num: number) =>
        Math.abs(num),
    [NumberPropertyTransformations.negativeValue]: (num: number) =>
        -1 * Math.abs(num),
};

/**
 * applyNumberPropertyTransformations
 * Apply NumberPropertyTransformations to a numeric value, in order of props.filters
 * @param props Options object
 * @param props.value The number value to apply the filters to
 * @param props.transformations The array of NumberPropertyTransformations to apply **in order**
 * @returns Filtered number value
 */
export function applyNumberPropertyTransformations({
    value,
    transformations,
}: {
    value: number;
    transformations: NumberPropertyTransformations[];
}): number {
    return transformations.reduce(
        (str, filter) => numberTransforms[String(filter)](str),
        value,
    );
}
