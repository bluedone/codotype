export enum DataPreviewConstraintType {
    exists = "exists",
    contains = "contains",
    equals = "equals",
}

export enum DataPreviewActionType {
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

export interface DataPreviewConstraint {
    dataProperty: string;
    type: DataPreviewConstraintType;
    value: string;
}

export interface DataPreviewAction {
    type: DataPreviewActionType;
    template: string;
}

export interface DataPreviewRule {
    constraint: DataPreviewConstraint;
    action: DataPreviewAction;
}

export interface DataPreview {
    rules: DataPreviewRule[];
    variant: DataPreviewLayoutVariant;
}
