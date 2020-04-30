import { Attribute } from "@codotype/types";
import { AttributeInput } from "./AttributeFormModal";

// // // //

export enum ATTRIBUTE_ERROR_MESSAGE {
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
    attributeCollection: Attribute[];
}): string | null {
    const { attributeInput, attributeCollection } = params;
    // Ensure Attribute label is defined
    if (attributeInput.identifiers.label === "") {
        return ATTRIBUTE_ERROR_MESSAGE.emptyLabel;
    }

    // Ensure Attribute datatype is defined
    if (attributeInput.datatype === null) {
        return ATTRIBUTE_ERROR_MESSAGE.emptyDatatype;
    }

    // Ensure Attribute label is unique
    if (
        attributeCollection.some(
            a => a.identifiers.label === attributeInput.identifiers.label,
        )
    ) {
        return ATTRIBUTE_ERROR_MESSAGE.duplicateLabel;
    }

    // Return null if no
    return null;
}
