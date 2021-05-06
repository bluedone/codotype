import { SchemaInput } from "../schema";
import { TokenPluralization } from "../token";
import { validateTokenPluralization } from "./buildTokenPluralization";

// // // //

export enum SCHEMA_ERROR_MESSAGES {
    emptyLabel = "Data Model label must be defined",
    duplicateLabel = "Data Model label must be unique",
    tokenPluralization = "Data Model label must be singular",
}

/**
 * validateSchema
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
        errors.push(SCHEMA_ERROR_MESSAGES.emptyLabel);
    }

    // Ensure Schema label is unique
    if (
        schemaCollection.some(
            (s) =>
                s.identifiers.singular.title ===
                tokenPluralization.singular.title,
        )
    ) {
        errors.push(SCHEMA_ERROR_MESSAGES.duplicateLabel);
    }

    // Validate TokenPluralization
    const validationFailures = validateTokenPluralization(tokenPluralization);
    if (
        tokenPluralization.singular.title !== "" &&
        Object.keys(validationFailures)
            .map((k) => validationFailures[k])
            .some((v) => v === true)
    ) {
        errors.push(SCHEMA_ERROR_MESSAGES.tokenPluralization);
    }

    // Return errors array
    return errors;
}
