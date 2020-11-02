import { makeTitleCase } from "../makeTitleCase";
import { makeKebabCase } from "../makeKebabCase";
import { makeCamelCase } from "../makeCamelCase";
import { makeSnakeCase } from "../makeSnakeCase";
import { makePascalCase } from "../makePascalCase";

// // // //

describe("util/makeKebabCase", () => {
    const kebabTestCases: Array<[string, string]> = [
        ["MyApp", "my-app"],
        ["myApp", "my-app"],
        ["MySpecialApp", "my-special-app"],
        ["mySpecialApp", "my-special-app"],
        ["my Special App", "my-special-app"],
        ["MY Special App", "my-special-app"],
    ];

    kebabTestCases.forEach((testCase) => {
        test(`${testCase[0]} -> ${testCase[1]}`, () => {
            const result = makeKebabCase(testCase[0]);
            const expectedResult = testCase[1];
            expect(result).toBe(expectedResult);
        });
    });
});

// // // // /

describe("util/makeCamelCase", () => {
    const camelTestCases: [string, string][] = [
        ["foo bar", "fooBar"],
        ["fooBar", "fooBar"],
    ];
    camelTestCases.forEach((testCase) => {
        test(`${testCase[0]} -> ${testCase[1]}`, () => {
            const result = makeCamelCase(testCase[0]);
            const expectedResult = testCase[1];
            expect(result).toBe(expectedResult);
        });
    });
});

// // // //

describe("util/makeSnakeCase", () => {
    const snakeTestCases: [string, string][] = [
        ["foo bar", "foo_bar"],
        ["FOO bar BAZ", "foo_bar_baz"],
    ];
    snakeTestCases.forEach((testCase) => {
        test(`${testCase[0]} -> ${testCase[1]}`, () => {
            const result = makeSnakeCase(testCase[0]);
            const expectedResult = testCase[1];
            expect(result).toBe(expectedResult);
        });
    });
});

// // // //

describe("util/makePascalCase", () => {
    const pascalTestCases: [string, string][] = [
        ["foo bar", "FooBar"],
        ["FOO bar BAZ", "FooBarBaz"],
        ["FOO baR BAZ", "FooBarBaz"],
        ["FOO_baR_BAZ", "FooBarBaz"],
    ];
    pascalTestCases.forEach((testCase) => {
        test(`${testCase[0]} -> ${testCase[1]}`, () => {
            const result = makePascalCase(testCase[0]);
            const expectedResult = testCase[1];
            expect(result).toBe(expectedResult);
        });
    });
});

// // // //

describe("util/makeTitleCase", () => {
    const pascalTestCases: [string, string][] = [
        ["foo bar", "Foo Bar"],
        ["FOO bar BAZ", "Foo Bar Baz"],
        ["FOO baR BAZ", "Foo Bar Baz"],
    ];
    pascalTestCases.forEach((testCase) => {
        test(`${testCase[0]} -> ${testCase[1]}`, () => {
            const result = makeTitleCase(testCase[0]);
            const expectedResult = testCase[1];
            expect(result).toBe(expectedResult);
        });
    });
});
