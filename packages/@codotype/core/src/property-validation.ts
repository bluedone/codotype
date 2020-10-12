enum StringValueValidationType {
    minLength = "MIN_LENGTH",
    maxLength = "MAX_LENGTH",
}

enum NumberValueValidationType {
    minValue = "MIN_VALUE",
    maxValue = "MAX_VALUE",
}

export interface StringValueValidation {
    validationType: StringValueValidationType;
    value: number;
}

export interface NumberValueValidation {
    validationType: NumberValueValidationType;
    value: number;
}

export type PropertyValidation = StringValueValidation | NumberValueValidation;
