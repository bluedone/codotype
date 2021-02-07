import {
    validateAttribute,
    ATTRIBUTE_ERROR_MESSAGE,
} from "../validateAttribute";
import { Attribute, AttributeInput, EMPTY_TOKEN_CASING } from "@codotype/core";
import { attributeExample01, attributeExample02 } from "./test_state";

// // // //

// testCase = [testName, attributeInput, attributeCollection, expectedResult]
const testCases: [string, AttributeInput, Attribute[], string[]][] = [
    ["valid attr (empty collection)", { ...attributeExample01 }, [], []],
    [
        "valid attr (non-conflicting attr)",
        { ...attributeExample01 },
        [attributeExample02],
        [],
    ],
    [
        "invalid attr - empty datatype",
        { ...attributeExample01, datatype: null },
        [attributeExample01, attributeExample02],
        [ATTRIBUTE_ERROR_MESSAGE.emptyDatatype],
    ],
    [
        "invalid attr - empty label",
        { ...attributeExample01, identifiers: { ...EMPTY_TOKEN_CASING } },
        [attributeExample01, attributeExample02],
        [ATTRIBUTE_ERROR_MESSAGE.emptyLabel],
    ],
    [
        "invalid attr - duplicate label",
        { ...attributeExample01, id: "3" },
        [attributeExample01, attributeExample02],
        [ATTRIBUTE_ERROR_MESSAGE.duplicateLabel],
    ],
    [
        "invalid attr - no duplicate label when ID hasn't changed",
        { ...attributeExample01 },
        [attributeExample01, attributeExample02],
        [],
    ],
];

// // // //

describe("validateAttribute", () => {
    testCases.forEach(testCase => {
        const [
            testName,
            attributeInput,
            attributeCollection,
            expectedResult,
        ] = testCase;

        test(testName, () => {
            const result: string[] = validateAttribute({
                attributeInput,
                attributeCollection,
            });

            expect(result).toStrictEqual(expectedResult);
        });
    });
});
