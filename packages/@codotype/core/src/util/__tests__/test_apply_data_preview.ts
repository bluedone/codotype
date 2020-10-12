import {
    DataPreviewLayoutVariant,
    DataPreviewRule,
    DataPreviewConstraint,
    DataPreviewConstraintType,
} from "../../DataPreview";
import {
    testDataPreviewConstraint01,
    testDataPreviewConstraint02,
    testDataPreviewAction01,
    testDataPreviewAction02,
} from "../../__tests__/test_state/data_preview_test_state";
import {
    applyDataPreview,
    shouldApplyDataPreviewRule,
} from "../applyDataPreview";

// // // //

// testCase = [testName, props.data, props.constraint, expectedResult]
const shouldApplyDataPreviewRuleTestCases: [
    string,
    any,
    DataPreviewConstraint,
    boolean,
][] = [
    [
        "DataPreviewConstraintType.equals",
        { label: "My Label" },
        {
            type: DataPreviewConstraintType.equals,
            value: "My Label",
            dataProperty: "label",
        },
        true,
    ],
    [
        "DataPreviewConstraintType.contains",
        { label: "My Label" },
        {
            type: DataPreviewConstraintType.contains,
            value: "My",
            dataProperty: "label",
        },
        true,
    ],
    [
        "DataPreviewConstraintType.contains",
        { label: "My Label" },
        {
            type: DataPreviewConstraintType.exists,
            value: "",
            dataProperty: "label",
        },
        true,
    ],
];

describe("shouldApplyDataPreviewRule", () => {
    shouldApplyDataPreviewRuleTestCases.forEach(
        ([testName, data, constraint, expected]) => {
            test(testName, () => {
                const result: boolean = shouldApplyDataPreviewRule({
                    data,
                    constraint,
                });
                expect(expected).toBe(result);
            });
        },
    );
});

// // // //

// testCase = [testName, props.data, props.dataPreview, expectedResult]
const applyDataPreviewTestCases: [string, any, DataPreviewRule[], string][] = [
    ["DataPreviewConstraintType.equals", {}, [], ""],
    [
        "test 02",
        { label: "" },
        [
            {
                constraint: testDataPreviewConstraint01,
                action: testDataPreviewAction01,
            },
        ],
        "Please define a label",
    ],
    [
        "DataPreviewConstraintType.exists",
        { label: "My Label" },
        [
            {
                constraint: testDataPreviewConstraint02,
                action: testDataPreviewAction02,
            },
        ],
        "Label: My Label",
    ],
];

describe("/lib/applyDataPreview.ts", () => {
    applyDataPreviewTestCases.forEach(([testName, data, rules, expected]) => {
        test(testName, () => {
            const result: string = applyDataPreview({
                data,
                dataPreview: {
                    rules,
                    variant: DataPreviewLayoutVariant.CODE_DARK,
                },
            });
            expect(expected).toBe(result);
        });
    });
});
