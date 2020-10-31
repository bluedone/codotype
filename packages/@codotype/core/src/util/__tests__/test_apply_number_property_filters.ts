import { NumberPropertyFilters, PropertyFilter } from "../../property-filter";
import { applyNumberPropertyFilters } from "../applyNumberPropertyFilters";

// testCase = [testName, props.value, props.filters, expectedResult]
const testCases: [string, number, NumberPropertyFilters[], number][] = [
    [
        "NumberValueFilter.negativeValue",
        -123,
        [NumberPropertyFilters.negativeValue],
        -123,
    ],
    [
        "NumberValueFilter.positiveValue",
        -123,
        [NumberPropertyFilters.positiveValue],
        123,
    ],
    [
        "NumberValueFilter.positiveValue 2",
        123.45,
        [NumberPropertyFilters.positiveValue],
        123.45,
    ],
    [
        "NumberValueFilter.integerValue",
        123.75,
        [NumberPropertyFilters.integerValue],
        123,
    ],
    [
        "NumberValueFilter.integerValue and NumberValueFilter.negativeValue",
        123.75,
        [
            NumberPropertyFilters.integerValue,
            NumberPropertyFilters.negativeValue,
        ],
        -123,
    ],
];

describe("/lib/applyNumberPropertyFilters.ts", () => {
    testCases.forEach(([testName, value, filters, expected]) => {
        test(testName, () => {
            const result: number = applyNumberPropertyFilters({
                value,
                filters,
            });
            expect(expected).toBe(result);
        });
    });
});
