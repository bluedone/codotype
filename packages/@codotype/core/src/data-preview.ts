/**
 * DataPreviewConstraintType
 * Defines the types of available constraints to determine the behavior of
 */
export type DataPreviewConstraintType = "exists" | "contains" | "equals";
export enum DataPreviewConstraintTypes {
    exists = "exists",
    contains = "contains",
    equals = "equals",
}

/**
 * DataPreviewActionType
 * Defines the type of available processes that may be chained together to produce human-readable DataPreview output
 */
export type DataPreviewActionType = "literal" | "block" | "stringTemplate";
export enum DataPreviewActionTypes {
    literal = "literal",
    block = "block",
    stringTemplate = "stringTemplate",
}

/**
 * DataPreviewLayoutVariant
 * Layout applied when rendering the DataPreview component
 */
export enum DataPreviewLayoutVariant {
    CODE_DARK = "CODE_DARK",
    CODE_LIGHT = "CODE_LIGHT",
    BADGE_LIGHT = "BADGE_LIGHT",
    BADGE_DARK = "BADGE_DARK",
}

/**
 * DataPreviewConstraint
 * Interface used to describe a single constraint
 * @param dataProperty - the property on the OptionValue(?) that's being examined with the constraint
 * @param type - the DataPreviewConstraintType that determines the outcome upon evaluating this Constraint
 * @param value - the value compared against the value pulled via dataProperty
 */
export interface DataPreviewConstraint {
    dataProperty: string;
    type: DataPreviewConstraintType;
    value: string;
}

/**
 * DataPreviewAction
 * Dictates the outcome of a single step of a process invoked upon the data to produce human-readable DataPreview output
 * @param type - the type of change invoked upon the DataPreview output while this action's DataPreviewRule is being evaluated
 * @param template - the template, used in conjunction with `type`, to determine the outcome of the parent DataPreviewRule
 */
export interface DataPreviewAction {
    type: DataPreviewActionType;
    template: string;
}

/**
 * DataPreviewRule
 * Defines an interface used to descirbe a single step taken to build the DataPreview output
 * @param constraint - dictates a conditional behavior, that when true, invokes the rule's action
 * @param action - dictates the process invoked upon the data associated with the ConfigurationGroupProperty to which the DataPreview is assigned
 */
export interface DataPreviewRule {
    constraint: DataPreviewConstraint;
    action: DataPreviewAction;
}

/**
 * DataPreview
 * Encapsulates the rules and visual display properties to dictate the behavior of the human-readable DataPreview in @codotype/ui
 * @param rules - array of DataPreviewRule instances
 * @param variant - determines the visual layout of the rendered DataPreview
 */
export interface DataPreview {
    rules: DataPreviewRule[];
    variant: DataPreviewLayoutVariant;
}
