import {
  DataPreview,
  DataPreviewAction,
  DataPreviewConstraintType,
  DataPreviewRule
} from "../DataPreview";
import { OptionValueInstance } from "../configuration-option-types";

// // // //

/**
 * shouldApplyDataPreviewRule
 * Returns a boolean indicating whether or not a specific DataPreviewRule should be applied against props.data
 * @param props.data - The data that's being evaluated by the DataPreviewRule
 * @param props.rule - The DataPreviewRule being evaluated
 */
export function shouldApplyDataPreviewRule(props: {
  data: Record<string, OptionValueInstance>;
  rule: DataPreviewRule;
}): boolean {
  const { rule, data } = props;

  const sourceValue: any = data[rule.sourceProperty];

  // Handle EQUALS
  if (rule.operation === DataPreviewConstraintType.equals) {
    if (sourceValue === rule.value) {
      return true;
    }
  }

  // Handle exists
  if (rule.operation === DataPreviewConstraintType.exists) {
    if (sourceValue) {
      return true;
    }
  }

  // Return false by default
  return false;
}

/**
 * applyDataPreviewRule
 * @param props.data - The data that's being evaluated by the DataPreviewRule
 * @param props.rule - The DataPreviewRule being evaluated
 */
export function applyDataPreviewRule(props: {
  data: Record<string, OptionValueInstance>;
  rule: DataPreviewRule;
}): string {
  const { rule, data } = props;

  // Handle LITERAL
  if (rule.action.type === DataPreviewAction.literal) {
    return rule.template;
  }

  // Handle STRING_TEMPLATE
  if (rule.action.type === DataPreviewAction.stringTemplate) {
    let templateString = rule.template;
    let templateFragments: string[] = [];

    // Handle template opener
    const openFragments = templateString.split("{{");
    for (const s of openFragments) {
      // Handle template closer
      if (s.includes("}}")) {
        const closeFragments = s.split("}}");
        closeFragments.forEach(sf => {
          if (sf !== "") {
            templateFragments.push(sf);
          }
        });
      } else {
        templateFragments.push(s);
      }
    }

    // TODO - annotate
    const finalFragments: string[] = [];
    templateFragments.forEach(tf => {
      let finalFragment = "";
      Object.keys(data).forEach(key => {
        if (tf.includes(`data.${key}`)) {
          // TODO - handle non-string values here
          finalFragment = String(data[key]);
        }
      });
      if (finalFragment) {
        finalFragments.push(finalFragment);
      } else {
        finalFragments.push(tf);
      }
    });

    // Join finalFragments and return
    return finalFragments.join("");
  }

  // Empty return statement
  return "";
}

/**
 * applyDataPreview
 * Applies DataPreview and returns resulting content
 * @param props.data - The data that's being inspected
 * @param props.dataPreview - The DataPreview being applied against props.data
 */
export function applyDataPreview(props: {
  data: Record<string, OptionValueInstance>;
  dataPreview: DataPreview;
}): string {
  const { data, dataPreview } = props;

  // Defines variable for return value
  let dataPreviewContent: null | string = null;

  // Iterates over each rule and evaluates accordingly
  dataPreview.rules.forEach((rule: DataPreviewRule) => {
    // Skip others if dataPreviewContent is already defined
    if (dataPreviewContent !== null) {
      return;
    }

    // Invoke applyDataPreviewRule, if constraint is met
    if (shouldApplyDataPreviewRule({ rule, data })) {
      dataPreviewContent = applyDataPreviewRule({ rule, data });
    }
  });

  // return content
  return dataPreviewContent || "";
}
