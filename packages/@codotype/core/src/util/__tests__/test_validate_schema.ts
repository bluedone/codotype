import { validateSchema, SCHEMA_ERROR_MESSAGES } from "../validateSchema";
import {
    SchemaInput,
    testState,
    TokenPluralization,
    EMPTY_TOKEN_CASING,
} from "../../";
import { buildTokenPluralization } from "../buildTokenPluralization";

// // // //

const testCases: [string, TokenPluralization, SchemaInput[], string[]][] = [
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
        [SCHEMA_ERROR_MESSAGES.emptyLabel],
    ],
    [
        "invalid schema - duplicate label",
        { ...testState.movieSchema.identifiers },
        [testState.movieSchema],
        [SCHEMA_ERROR_MESSAGES.duplicateLabel],
    ],
    [
        "invalid schema - incorrect pluralization",
        buildTokenPluralization("Movies"),
        [testState.movieSchema],
        [SCHEMA_ERROR_MESSAGES.tokenPluralization],
    ],
];

// // // //

describe("validateSchema", () => {
    testCases.forEach((testCase) => {
        test(testCase[0], () => {
            const expectedResult: string[] = validateSchema({
                tokenPluralization: testCase[1],
                schemaCollection: testCase[2],
            });
            expect(expectedResult).toStrictEqual(testCase[3]);
        });
    });
});
