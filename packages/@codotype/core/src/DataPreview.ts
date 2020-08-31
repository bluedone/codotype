export enum DataPreviewConstraintType {
  exists = "exists",
  contains = "contains",
  equals = "equals"
}

export enum DataPreviewAction {
  literal = "literal",
  stringTemplate = "stringTemplate"
}

/**
 * DataPreviewLayoutVariant
 * Layout applied when rendering the DataPreview component
 */
export enum DataPreviewLayoutVariant {
  CODE_DARK = "CODE_DARK",
  CODE_LIGHT = "CODE_LIGHT",
  BADGE_LIGHT = "BADGE_LIGHT",
  BADGE_DARK = "BADGE_DARK"
}

export interface DataPreviewRule {
  // Condition
  sourceProperty: string;
  operation: DataPreviewConstraintType;
  value: string;
  // # Action
  action: {
    type: DataPreviewAction;
  };
  template: string;
}

// TODO - use DataPreviewRuleV2?
export interface DataPreviewRuleV2 {
  constraint: {
    sourceProperty: string;
    type: DataPreviewConstraintType;
    value: string;
  };
  action: {
    type: DataPreviewAction;
    template: string;
  };
}

export interface DataPreview {
  rules: DataPreviewRule[];
  variant: DataPreviewLayoutVariant;
}
