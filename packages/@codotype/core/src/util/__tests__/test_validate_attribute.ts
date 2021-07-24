import {
    validateAttribute,
    ATTRIBUTE_ERROR_MESSAGES,
} from "../validateAttribute";
import { Attribute, AttributeInput } from "../../attribute";
import { EMPTY_TOKEN_CASING } from "../../token";
import { AttributeInputBuilder } from "../../primitives/Attribute";
import { buildTokenCasing } from "../buildTokenCasing";
import { Datatypes } from "../../datatype";

// // // //

export const attributeExample01: Attribute = new AttributeInputBuilder({
    id: "1",
    identifiers: buildTokenCasing("Name"),
    datatype: Datatypes.STRING,
});

export const attributeExample02: Attribute = new AttributeInputBuilder({
    id: "2",
    identifiers: buildTokenCasing("Email"),
    datatype: Datatypes.STRING,
});

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
        [ATTRIBUTE_ERROR_MESSAGES.emptyDatatype],
    ],
    [
        "invalid attr - empty label",
        { ...attributeExample01, identifiers: { ...EMPTY_TOKEN_CASING } },
        [attributeExample01, attributeExample02],
        [ATTRIBUTE_ERROR_MESSAGES.emptyLabel],
    ],
    [
        "invalid attr - duplicate label",
        { ...attributeExample01, id: "3" },
        [attributeExample01, attributeExample02],
        [ATTRIBUTE_ERROR_MESSAGES.duplicateLabel],
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
    testCases.forEach((testCase) => {
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
