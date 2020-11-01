import {
    PropertyPreview,
    PropertyPreviewActionTypes,
    PropertyPreviewConstraintTypes,
    PropertyPreviewRule,
    PropertyPreviewConstraint,
    PropertyPreviewAction,
} from "../property-preview";
import { OptionValueInstance } from "../configuration-property";

// // // //

/**
 * shouldApplyPropertyPreviewRule
 * Returns a boolean indicating whether or not a specific PropertyPreviewRule should be applied against props.data
 * @param props.data - The data that's being evaluated by the PropertyPreviewRule
 * @param props.rule - The PropertyPreviewRule being evaluated
 */
export function shouldApplyPropertyPreviewRule(props: {
    data: Record<string, OptionValueInstance>;
    constraint: PropertyPreviewConstraint;
}): boolean {
    const { constraint, data } = props;

    const sourceValue: any = data[constraint.dataProperty];

    // Handle EQUALS
    if (constraint.type === PropertyPreviewConstraintTypes.equals) {
        if (sourceValue === constraint.value) {
            return true;
        }
    }

    // Handle contains
    if (
        constraint.type === PropertyPreviewConstraintTypes.contains &&
        typeof sourceValue === "string"
    ) {
        return sourceValue.includes(constraint.value);
    }

    // Handle exists
    if (constraint.type === PropertyPreviewConstraintTypes.exists) {
        if (sourceValue) {
            return true;
        }
    }

    // Return false by default
    return false;
}

/**
 * applyPropertyPreviewRule
 * @param props.data - The data that's being evaluated by the PropertyPreviewRule
 * @param props.rule - The PropertyPreviewRule being evaluated
 */
export function applyPropertyPreviewRule(props: {
    data: Record<string, OptionValueInstance>;
    action: PropertyPreviewAction;
}): string {
    const { action, data } = props;

    // Handle LITERAL
    if (action.type === PropertyPreviewActionTypes.literal) {
        return action.template;
    }

    // Handle STRING_TEMPLATE
    if (action.type === PropertyPreviewActionTypes.stringTemplate) {
        let templateString = action.template;
        let templateFragments: string[] = [];

        // Handle template opener
        const openFragments = templateString.split("{{");
        for (const s of openFragments) {
            // Handle template closer
            if (s.includes("}}")) {
                const closeFragments = s.split("}}");
                closeFragments.forEach((sf) => {
                    if (sf !== "") {
                        templateFragments.push(sf);
                    }
                });
            } else {
                templateFragments.push(s);
            }
        }

        // Iterate over templateFragments and perform replacement operations to produce finalFragments array
        const finalFragments: string[] = [];
        templateFragments.forEach((tf) => {
            let finalFragment = "";
            Object.keys(data).forEach((key) => {
                if (tf.includes(`data.${key}`)) {
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
 * applyPropertyPreview
 * Applies PropertyPreview and returns resulting content
 * @param props.data - The data that's being inspected
 * @param props.propertyPreview - The PropertyPreview being applied against props.data
 */
export function applyPropertyPreview(props: {
    data: Record<string, OptionValueInstance>;
    propertyPreview: PropertyPreview;
}): string {
    const { data, propertyPreview } = props;

    // Defines variable for return value
    let propertyPreviewContent: null | string = null;

    // Iterates over each rule and evaluates accordingly
    propertyPreview.rules.forEach((rule: PropertyPreviewRule) => {
        // Skip others if propertyPreviewContent is already defined
        if (propertyPreviewContent !== null) {
            return;
        }

        // Invoke applyPropertyPreviewRule if constraint is met
        if (
            shouldApplyPropertyPreviewRule({
                constraint: rule.constraint,
                data,
            })
        ) {
            propertyPreviewContent = applyPropertyPreviewRule({
                action: rule.action,
                data,
            });
        }
    });

    // return content
    return propertyPreviewContent || "";
}
