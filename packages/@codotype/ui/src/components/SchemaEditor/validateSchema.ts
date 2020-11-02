import { SchemaInput, TokenPluralization } from "@codotype/core";

// // // //

export enum SCHEMA_ERROR_MESSAGE {
    emptyLabel = "Schema label must be defined",
    duplicateLabel = "Schema label must be unique",
}

/**
 * validateSchema
 * TODO - move this into @codotype/core
 * Validates SchemaInput -> returns string[] or null
 * @param params
 */
export function validateSchema(params: {
    tokenPluralization: TokenPluralization | null;
    schemaCollection: SchemaInput[];
}): string[] {
    const errors: string[] = [];
    const { tokenPluralization, schemaCollection } = params;

    if (tokenPluralization === null) {
        return errors;
    }

    // Ensure Schema label is defined
    if (tokenPluralization.singular.title === "") {
        errors.push(SCHEMA_ERROR_MESSAGE.emptyLabel);
    }

    // Ensure Schema label is unique
    if (
        schemaCollection.some(
            s =>
                s.identifiers.singular.title ===
                tokenPluralization.singular.title,
        )
    ) {
        errors.push(SCHEMA_ERROR_MESSAGE.duplicateLabel);
    }

    // Return errors array
    return errors;
}
