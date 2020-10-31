import { StringPropertyFilters } from "../../property-filter";
import { applyStringPropertyFilters } from "../applyStringPropertyFilters";

// testCase = [testName, props.value, props.filters, expectedResult]
const testCases: [string, string, StringPropertyFilters[], string][] = [
    [
        "StringValueFilter.lowercase",
        "Hello, Codotype!",
        [StringPropertyFilters.lowercase],
        "hello, codotype!",
    ],
    [
        "StringValueFilter.uppercase",
        "Hello, Codotype!",
        [StringPropertyFilters.uppercase],
        "HELLO, CODOTYPE!",
    ],
    [
        "StringValueFilter.titlecase",
        "hello, codotype!",
        [StringPropertyFilters.titlecase],
        "Hello, Codotype!",
    ],
    [
        "StringValueFilter.camelcase",
        "Hello, codotype!",
        [StringPropertyFilters.camelcase],
        "helloCodotype",
    ],
    [
        "StringValueFilter.snakecase",
        "Hello, codotype!",
        [StringPropertyFilters.snakecase],
        "hello,_codotype!",
    ],
    [
        "StringValueFilter.pascalcase",
        "Hello, codotype!",
        [StringPropertyFilters.pascalcase],
        "HelloCodotype",
    ],
    [
        "StringValueFilter.kebabcase",
        "Hello, codotype 123!",
        [StringPropertyFilters.kebabcase],
        "hello-codotype-123",
    ],
    [
        "StringValueFilter.nonumbers",
        "Hello 2 codotype! 123",
        [StringPropertyFilters.nonumbers],
        "Hello  codotype! ",
    ],
    [
        "StringValueFilter.nosymbols",
        "Hello, @#!$",
        [StringPropertyFilters.nosymbols],
        "Hello ",
    ],
    [
        "StringValueFilter.trimwhitespace",
        "   Hello, Codotype! ",
        [StringPropertyFilters.trimwhitespace],
        "Hello, Codotype!",
    ],
    [
        "StringValueFilter.removewhitespace",
        "   Hello, Codotype! ",
        [StringPropertyFilters.removewhitespace],
        "Hello,Codotype!",
    ],
    [
        "combined filters",
        "   Hello, Codotype! This is like test #123.",
        [
            StringPropertyFilters.trimwhitespace,
            StringPropertyFilters.uppercase,
            StringPropertyFilters.nonumbers,
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
            expect(result).toBe(expected);
        });
    });
});
