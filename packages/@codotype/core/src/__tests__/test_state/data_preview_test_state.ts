import {
  DataPreviewActionType,
  DataPreviewConstraintType,
  DataPreviewConstraint,
  DataPreviewAction,
} from "../../DataPreview";

// // // //

export const testDataPreviewConstraint01: DataPreviewConstraint = {
  dataProperty: "label",
  type: DataPreviewConstraintType.equals,
  value: "",
};

export const testDataPreviewConstraint02: DataPreviewConstraint = {
  dataProperty: "label",
  type: DataPreviewConstraintType.exists,
  value: "",
};

export const testDataPreviewConstraint03: DataPreviewConstraint = {
  dataProperty: "label",
  type: DataPreviewConstraintType.contains,
  value: "hello",
};

// // // //

export const testDataPreviewAction01: DataPreviewAction = {
  type: DataPreviewActionType.literal,
  template: "Please define a label",
};

export const testDataPreviewAction02: DataPreviewAction = {
  type: DataPreviewActionType.stringTemplate,
  template: "Label: {{data.label}}",
};
