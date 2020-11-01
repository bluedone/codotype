/**
 * PropertyPreviewConstraintType
 * Defines the types of available constraints to determine the behavior of
 */
export type PropertyPreviewConstraintType = "exists" | "contains" | "equals";
export enum PropertyPreviewConstraintTypes {
    exists = "exists",
    contains = "contains",
    equals = "equals",
}

/**
 * PropertyPreviewActionType
 * Defines the type of available processes that may be chained together to produce human-readable PropertyPreview output
 */
export type PropertyPreviewActionType = "literal" | "block" | "stringTemplate";
export enum PropertyPreviewActionTypes {
    literal = "literal",
    block = "block",
    stringTemplate = "stringTemplate",
}

/**
 * PropertyPreviewLayoutVariant
 * Layout applied when rendering the PropertyPreview component
 */
export enum PropertyPreviewLayoutVariant {
    CODE_DARK = "CODE_DARK",
    CODE_LIGHT = "CODE_LIGHT",
    BADGE_LIGHT = "BADGE_LIGHT",
    BADGE_DARK = "BADGE_DARK",
}

/**
 * PropertyPreviewConstraint
 * Interface used to describe a single constraint
 * @param dataProperty - the property on the OptionValue(?) that's being examined with the constraint
 * @param type - the PropertyPreviewConstraintType that determines the outcome upon evaluating this Constraint
 * @param value - the value compared against the value pulled via dataProperty
 */
export interface PropertyPreviewConstraint {
    dataProperty: string;
    type: PropertyPreviewConstraintType;
    value: string;
}

/**
 * PropertyPreviewAction
 * Dictates the outcome of a single step of a process invoked upon the data to produce human-readable PropertyPreview output
 * @param type - the type of change invoked upon the PropertyPreview output while this action's PropertyPreviewRule is being evaluated
 * @param template - the template, used in conjunction with `type`, to determine the outcome of the parent PropertyPreviewRule
 */
export interface PropertyPreviewAction {
    type: PropertyPreviewActionType;
    template: string;
}

/**
 * PropertyPreviewRule
 * Defines an interface used to descirbe a single step taken to build the PropertyPreview output
 * @param constraint - dictates a conditional behavior, that when true, invokes the rule's action
 * @param action - dictates the process invoked upon the data associated with the ConfigurationProperty to which the PropertyPreview is assigned
 */
export interface PropertyPreviewRule {
    constraint: PropertyPreviewConstraint;
    action: PropertyPreviewAction;
}

/**
 * PropertyPreview
 * Encapsulates the rules and visual display properties to dictate the behavior of the human-readable PropertyPreview in @codotype/ui
 * @param rules - array of PropertyPreviewRule instances
 * @param variant - determines the visual layout of the rendered PropertyPreview
 */
export interface PropertyPreview {
    rules: PropertyPreviewRule[];
    variant: PropertyPreviewLayoutVariant;
}

// // // //
// CHORE - add examples to test_data module
