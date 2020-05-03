import { validateSchema, SCHEMA_ERROR_MESSAGE } from "../validateSchema";
import {
    Schema,
    testState,
    TokenPluralization,
    EMPTY_TOKEN_CASING,
} from "@codotype/types";
// schemas.push(testState.movieSchema);
// schemas.push(testState.userSchema);

// // // //

const testCases: [string, TokenPluralization, Schema[], string[]][] = [
    [
        "valid schema (empty collection)",
        { ...testState.movieSchema.identifiers },
        [],
        [],
    ],
    [
        "valid schema (non-conflicting schema)",
        { ...testState.movieSchema.identifiers },
        [testState.userSchema],
        [],
    ],
    [
        "invalid schema - empty label",
        {
            singular: { ...EMPTY_TOKEN_CASING },
            plural: { ...EMPTY_TOKEN_CASING },
        },
        [testState.movieSchema],
        [SCHEMA_ERROR_MESSAGE.emptyLabel],
    ],
    [
        "invalid schema - duplicate label",
        { ...testState.movieSchema.identifiers },
        [testState.movieSchema],
        [SCHEMA_ERROR_MESSAGE.duplicateLabel],
    ],
];

// // // //

describe("validateSchema", () => {
    testCases.forEach(testCase => {
        test(testCase[0], () => {
            const expectedResult: string[] = validateSchema({
                tokenPluralization: testCase[1],
                schemaCollection: testCase[2],
            });
            expect(expectedResult).toStrictEqual(testCase[3]);
        });
    });
});
