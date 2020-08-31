import {
  DataPreviewAction,
  DataPreviewConstraintType,
  DataPreviewLayoutVariant,
  DataPreviewRule
} from "../../DataPreview";
import { applyDataPreview } from "../applyDataPreview";

// // // //

// testCase = [testName, props.data, props.dataPreview, expectedResult]
const testCases: [string, any, DataPreviewRule[], string][] = [
  ["DataPreviewConstraintType.equals", "", [], ""],
  [
    "test 02",
    { label: "" },
    [
      {
        sourceProperty: "label",
        operation: DataPreviewConstraintType.equals,
        value: "",
        action: {
          type: DataPreviewAction.literal
        },
        template: "Please define a Lambda Name"
      }
    ],
    "Please define a Lambda Name"
  ],
  [
    "DataPreviewConstraintType.exists",
    { label: "My Label" },
    [
      {
        sourceProperty: "label",
        operation: DataPreviewConstraintType.exists,
        value: "",
        action: {
          type: DataPreviewAction.stringTemplate
        },
        template: "Label: {{data.label}}"
      }
    ],
    "Label: My Label"
  ]
];

describe("/lib/applyDataPreview.ts", () => {
  testCases.forEach(([testName, data, rules, expected]) => {
    test(testName, () => {
      const result: string = applyDataPreview({
        data,
        dataPreview: {
          rules,
          variant: DataPreviewLayoutVariant.CODE_DARK
        }
      });
      expect(expected).toBe(result);
    });
  });
});
