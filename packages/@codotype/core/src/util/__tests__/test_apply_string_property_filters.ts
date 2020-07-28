import { StringValueFilter } from "../../../../types/src/property-filter";
import { applyStringPropertyFilters } from "../applyStringPropertyFilters";

// testCase = [testName, props.value, props.filters, expectedResult]
const testCases: [string, string, StringValueFilter[], string][] = [
  [
    "StringValueFilter.lowercase",
    "Hello, Codotype!",
    [StringValueFilter.lowercase],
    "hello, codotype!",
  ],
  [
    "StringValueFilter.uppercase",
    "Hello, Codotype!",
    [StringValueFilter.uppercase],
    "HELLO, CODOTYPE!",
  ],
  [
    "StringValueFilter.titlecase",
    "hello, codotype!",
    [StringValueFilter.titlecase],
    "Hello, Codotype!",
  ],
  [
    "StringValueFilter.camelcase",
    "Hello, codotype!",
    [StringValueFilter.camelcase],
    "helloCodotype",
  ],
  [
    "StringValueFilter.snakecase",
    "Hello, codotype!",
    [StringValueFilter.snakecase],
    "hello,_codotype!",
  ],
  [
    "StringValueFilter.pascalcase",
    "Hello, codotype!",
    [StringValueFilter.pascalcase],
    "HelloCodotype",
  ],
  [
    "StringValueFilter.kebabcase",
    "Hello, codotype!",
    [StringValueFilter.kebabcase],
    "hello,-codotype!",
  ],
  [
    "StringValueFilter.nonumbers",
    "Hello 2 codotype! 123",
    [StringValueFilter.nonumbers],
    "Hello  codotype! ",
  ],
  [
    "StringValueFilter.nosymbols",
    "Hello, @#!$",
    [StringValueFilter.nosymbols],
    "Hello ",
  ],
  [
    "StringValueFilter.trimwhitespace",
    "   Hello, Codotype! ",
    [StringValueFilter.trimwhitespace],
    "Hello, Codotype!",
  ],
  [
    "StringValueFilter.removewhitespace",
    "   Hello, Codotype! ",
    [StringValueFilter.removewhitespace],
    "Hello,Codotype!",
  ],
  [
    "combined filters",
    "   Hello, Codotype! This is like test #123.",
    [
      StringValueFilter.trimwhitespace,
      StringValueFilter.uppercase,
      StringValueFilter.nonumbers,
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
