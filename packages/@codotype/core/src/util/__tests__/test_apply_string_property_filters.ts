import { StringValueFilters } from "../../property-filter";
import { applyStringPropertyFilters } from "../applyStringPropertyFilters";

// testCase = [testName, props.value, props.filters, expectedResult]
const testCases: [string, string, StringValueFilters[], string][] = [
    [
        "StringValueFilter.lowercase",
        "Hello, Codotype!",
        [StringValueFilters.lowercase],
        "hello, codotype!",
    ],
    [
        "StringValueFilter.uppercase",
        "Hello, Codotype!",
        [StringValueFilters.uppercase],
        "HELLO, CODOTYPE!",
    ],
    [
        "StringValueFilter.titlecase",
        "hello, codotype!",
        [StringValueFilters.titlecase],
        "Hello, Codotype!",
    ],
    [
        "StringValueFilter.camelcase",
        "Hello, codotype!",
        [StringValueFilters.camelcase],
        "helloCodotype",
    ],
    [
        "StringValueFilter.snakecase",
        "Hello, codotype!",
        [StringValueFilters.snakecase],
        "hello,_codotype!",
    ],
    [
        "StringValueFilter.pascalcase",
        "Hello, codotype!",
        [StringValueFilters.pascalcase],
        "HelloCodotype",
    ],
    [
        "StringValueFilter.kebabcase",
        "Hello, codotype!",
        [StringValueFilters.kebabcase],
        "hello,-codotype!",
    ],
    [
        "StringValueFilter.nonumbers",
        "Hello 2 codotype! 123",
        [StringValueFilters.nonumbers],
        "Hello  codotype! ",
    ],
    [
        "StringValueFilter.nosymbols",
        "Hello, @#!$",
        [StringValueFilters.nosymbols],
        "Hello ",
    ],
    [
        "StringValueFilter.trimwhitespace",
        "   Hello, Codotype! ",
        [StringValueFilters.trimwhitespace],
        "Hello, Codotype!",
    ],
    [
        "StringValueFilter.removewhitespace",
        "   Hello, Codotype! ",
        [StringValueFilters.removewhitespace],
        "Hello,Codotype!",
    ],
    [
        "combined filters",
        "   Hello, Codotype! This is like test #123.",
        [
            StringValueFilters.trimwhitespace,
            StringValueFilters.uppercase,
            StringValueFilters.nonumbers,
        ],
        "HELLO, CODOTYPE! THIS IS LIKE TEST #.",
    ],
];

describe("/lib/applyStringPropertyFilters.ts", () => {
    testCases.forEach(([testName, value, filters, expected]) => {
        test(testName, () => {
            const result: string = applyStringPropertyFilters({
                value,
                filters,
            });
            expect(expected).toBe(result);
        });
    });
});
