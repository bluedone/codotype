import {
    PropertyPreviewActionTypes,
    PropertyPreviewConstraintTypes,
    PropertyPreviewConstraint,
    PropertyPreviewAction,
} from "../../property-preview";

// // // //

export const testPropertyPreviewConstraint01: PropertyPreviewConstraint = {
    dataProperty: "label",
    type: PropertyPreviewConstraintTypes.equals,
    value: "",
};

export const testPropertyPreviewConstraint02: PropertyPreviewConstraint = {
    dataProperty: "label",
    type: PropertyPreviewConstraintTypes.exists,
    value: "",
};

export const testPropertyPreviewConstraint03: PropertyPreviewConstraint = {
    dataProperty: "label",
    type: PropertyPreviewConstraintTypes.contains,
    value: "hello",
};

// // // //

export const testPropertyPreviewAction01: PropertyPreviewAction = {
    type: PropertyPreviewActionTypes.literal,
    template: "Please define a label",
};

export const testPropertyPreviewAction02: PropertyPreviewAction = {
    type: PropertyPreviewActionTypes.stringTemplate,
    template: "Label: {{data.label}}",
};
