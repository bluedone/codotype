import {
    DataPreviewActionTypes,
    DataPreviewConstraintTypes,
    DataPreviewConstraint,
    DataPreviewAction,
} from "../../data-preview";

// // // //

export const testDataPreviewConstraint01: DataPreviewConstraint = {
    dataProperty: "label",
    type: DataPreviewConstraintTypes.equals,
    value: "",
};

export const testDataPreviewConstraint02: DataPreviewConstraint = {
    dataProperty: "label",
    type: DataPreviewConstraintTypes.exists,
    value: "",
};

export const testDataPreviewConstraint03: DataPreviewConstraint = {
    dataProperty: "label",
    type: DataPreviewConstraintTypes.contains,
    value: "hello",
};

// // // //

export const testDataPreviewAction01: DataPreviewAction = {
    type: DataPreviewActionTypes.literal,
    template: "Please define a label",
};

export const testDataPreviewAction02: DataPreviewAction = {
    type: DataPreviewActionTypes.stringTemplate,
    template: "Label: {{data.label}}",
};
