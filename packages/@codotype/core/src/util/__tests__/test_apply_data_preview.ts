import {
    PropertyPreviewLayoutVariant,
    PropertyPreviewRule,
    PropertyPreviewConstraint,
    PropertyPreviewConstraintTypes,
} from "../../property-preview";
import {
    testPropertyPreviewConstraint01,
    testPropertyPreviewConstraint02,
    testPropertyPreviewAction01,
    testPropertyPreviewAction02,
} from "../../__tests__/test_state/data_preview_test_state";
import {
    applyPropertyPreview,
    shouldApplyPropertyPreviewRule,
} from "../applyPropertyPreview";

// // // //

// testCase = [testName, props.data, props.constraint, expectedResult]
const shouldApplyPropertyPreviewRuleTestCases: [
    string,
    any,
    PropertyPreviewConstraint,
    boolean,
][] = [
    [
        "PropertyPreviewConstraintTypes.equals",
        { label: "My Label" },
        {
            type: PropertyPreviewConstraintTypes.equals,
            value: "My Label",
            dataProperty: "label",
        },
        true,
    ],
    [
        "PropertyPreviewConstraintTypes.contains",
        { label: "My Label" },
        {
            type: PropertyPreviewConstraintTypes.contains,
            value: "My",
            dataProperty: "label",
        },
        true,
    ],
    [
        "PropertyPreviewConstraintTypes.contains",
        { label: "My Label" },
        {
            type: PropertyPreviewConstraintTypes.exists,
            value: "",
            dataProperty: "label",
        },
        true,
    ],
];

describe("shouldApplyPropertyPreviewRule", () => {
    shouldApplyPropertyPreviewRuleTestCases.forEach(
        ([testName, data, constraint, expected]) => {
            test(testName, () => {
                const result: boolean = shouldApplyPropertyPreviewRule({
                    data,
                    constraint,
                });
                expect(expected).toBe(result);
            });
        },
    );
});

// // // //

// testCase = [testName, props.data, props.propertyPreview, expectedResult]
const applyPropertyPreviewTestCases: [
    string,
    any,
    PropertyPreviewRule[],
    string,
][] = [
    ["PropertyPreviewConstraintTypes.equals", {}, [], ""],
    [
        "test 02",
        { label: "" },
        [
            {
                constraint: testPropertyPreviewConstraint01,
                action: testPropertyPreviewAction01,
            },
        ],
        "Please define a label",
    ],
    [
        "PropertyPreviewConstraintTypes.exists",
        { label: "My Label" },
        [
            {
                constraint: testPropertyPreviewConstraint02,
                action: testPropertyPreviewAction02,
            },
        ],
        "Label: My Label",
    ],
];

describe("/util/applyPropertyPreview.ts", () => {
    applyPropertyPreviewTestCases.forEach(
        ([testName, data, rules, expected]) => {
            test(testName, () => {
                const result: string = applyPropertyPreview({
                    data,
                    propertyPreview: {
                        rules,
                        variant: PropertyPreviewLayoutVariant.CODE_DARK,
                    },
                });
                expect(expected).toBe(result);
            });
        },
    );
});
