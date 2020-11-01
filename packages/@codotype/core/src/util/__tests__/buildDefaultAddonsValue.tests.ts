import { attributeAddons } from "../../__tests__/test_state/addon-property";
import { buildDefaultAddonsValue } from "../buildDefaultAddonsValue";
import { addonProperties } from "../../__tests__/test_state/addon-property";
import { AddonProperty, AddonsValue } from "../../schema-editor-addon";

// // // //

// testCase = [testName, params.properties, expectedResult]
const numberTransformTests: [string, AddonProperty[], AddonsValue][] = [
    ["no properties", [], {}],
    [
        "one properties",
        [addonProperties.index],
        {
            [addonProperties.index.identifier]:
                addonProperties.index.defaultValue,
        },
    ],
    [
        "three properties",
        [
            addonProperties.index,
            addonProperties.nullable,
            addonProperties.primaryKey,
        ],
        {
            [addonProperties.index.identifier]:
                addonProperties.index.defaultValue,
            [addonProperties.nullable.identifier]:
                addonProperties.nullable.defaultValue,
            [addonProperties.primaryKey.identifier]:
                addonProperties.primaryKey.defaultValue,
        },
    ],
];

describe("/util/buildDefaultAddonsValue.ts", () => {
    numberTransformTests.forEach(([testName, properties, expected]) => {
        test(testName, () => {
            const result: AddonsValue = buildDefaultAddonsValue({
                properties,
            });
            expect(expected).toStrictEqual(result);
        });
    });
});
