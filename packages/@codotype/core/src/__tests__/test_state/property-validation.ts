import {
    PropertyValidation,
    NumberPropertyValidationTypes,
    StringPropertyValidationTypes,
} from "../../property-validation";

// // // //

const minValuePropertyValidation: PropertyValidation = {
    type: NumberPropertyValidationTypes.minValue,
    value: 5,
};
const maxValuePropertyValidation: PropertyValidation = {
    type: NumberPropertyValidationTypes.maxValue,
    value: 5,
};
const minLengthPropertyValidation: PropertyValidation = {
    type: StringPropertyValidationTypes.minLength,
    value: 5,
};
const maxLengthPropertyValidation: PropertyValidation = {
    type: StringPropertyValidationTypes.maxLength,
    value: 5,
};

export const propertyValidations: { [key: string]: PropertyValidation } = {
    minValue: minValuePropertyValidation,
    maxValue: maxValuePropertyValidation,
    minLength: minLengthPropertyValidation,
    maxLength: maxLengthPropertyValidation,
};
