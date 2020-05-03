import { Schema, TokenPluralization } from "@codotype/types";

// // // //

export enum SCHEMA_ERROR_MESSAGE {
    emptyLabel = "Schema label must be defined",
    duplicateLabel = "Schema label must be unique",
}

/**
 * validateSchema
 * Validates SchemaInput -> returns string[] or null
 * @param params
 */
export function validateSchema(params: {
    tokenPluralization: TokenPluralization | null;
    schemaCollection: Schema[];
}): string[] {
    const errors: string[] = [];
    const { tokenPluralization, schemaCollection } = params;

    if (tokenPluralization === null) {
        return errors;
    }

    // Ensure Schema label is defined
    if (tokenPluralization.singular.label === "") {
        errors.push(SCHEMA_ERROR_MESSAGE.emptyLabel);
    }

    // Ensure Schema label is unique
    if (
        schemaCollection.some(
            s =>
                s.identifiers.singular.label ===
                tokenPluralization.singular.label,
        )
    ) {
        errors.push(SCHEMA_ERROR_MESSAGE.duplicateLabel);
    }

    // Return errors array
    return errors;
}
