import { AttributeInput } from "../attribute";

// // // //

export enum ATTRIBUTE_ERROR_MESSAGES {
    emptyLabel = "Attribute label must be defined",
    emptyDatatype = "Attribute must have a datatype",
    duplicateLabel = "Attribute label must be unique",
}

/**
 * validateAttribute
 * Validates AttributeInput -> returns string or null
 * @param params
 */
export function validateAttribute(params: {
    attributeInput: AttributeInput;
    attributeCollection: AttributeInput[];
}): string[] {
    const errors: string[] = [];
    const { attributeInput, attributeCollection } = params;
    // Ensure Attribute datatype is defined
    if (attributeInput.datatype === null) {
        errors.push(ATTRIBUTE_ERROR_MESSAGES.emptyDatatype);
    }

    // Ensure Attribute label is defined
    if (attributeInput.identifiers.title === "") {
        errors.push(ATTRIBUTE_ERROR_MESSAGES.emptyLabel);
    }

    // Ensure Attribute title is unique
    if (
        attributeCollection.some(
            (a) =>
                a.identifiers.title === attributeInput.identifiers.title &&
                a.id !== attributeInput.id,
        )
    ) {
        errors.push(ATTRIBUTE_ERROR_MESSAGES.duplicateLabel);
    }

    // Return errors array
    return errors;
}
