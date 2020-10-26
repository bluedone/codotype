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
 * TODO - annotate
 */
export interface DataPreviewConstraint {
    dataProperty: string;
    type: DataPreviewConstraintType;
    value: string;
}

/**
 * DataPreviewAction
 * TODO - annotate
 */
export interface DataPreviewAction {
    type: DataPreviewActionType;
    template: string;
}

/**
 * DataPreviewRule
 * TODO - annotate
 */
export interface DataPreviewRule {
    constraint: DataPreviewConstraint;
    action: DataPreviewAction;
}

/**
 * DataPreview
 * TODO - annotate
 */
export interface DataPreview {
    rules: DataPreviewRule[];
    variant: DataPreviewLayoutVariant;
}
