import { validateRelation, RELATION_ERROR_MESSAGE } from "../validateRelation";
import { RelationInput } from "@codotype/core";
import { relationExample01, relationExample02 } from "./test_state";

// // // //

// TODO - finish these tests

// testCase = [testName, relationInput, relationCollection, expectedResult]
const testCases: [string, RelationInput, RelationInput[], string[]][] = [
    ["valid relation (empty collection)", { ...relationExample01 }, [], []],
    // [
    //     "valid relation (non-conflicting relation)",
    //     { ...relationExample01 },
    //     [relationExample02],
    //     [],
    // ],
    [
        "invalid relation - duplicate alias",
        { ...relationExample01 },
        [relationExample01],
        [RELATION_ERROR_MESSAGE.duplicateIdentifier],
    ],
    // [
    //     "invalid relation - no duplicate label when ID hasn't changed",
    //     { ...relationExample01 },
    //     [relationExample01],
    //     [],
    // ],
];

// // // //

describe("validateRelation", () => {
    testCases.forEach(testCase => {
        const [
            testName,
            relationInput,
            relationCollection,
            expectedResult,
        ] = testCase;

        test(testName, () => {
            const result: string[] = validateRelation({
                relationInput,
                relationCollection,
            });

            expect(result).toStrictEqual(expectedResult);
        });
    });
});
