import { RelationInput } from "@codotype/core";

// // // //

// TODO - finish this up, bring into @codotype/core?
// TODO - handle duplicate relation without unique alias on SOURCE PROPERTY
export enum RELATION_ERROR_MESSAGE {
    emptyType = "Relation must have a type",
    duplicateIdentifier = "Relation must have a destination alias",
}

/**
 * validateRelation
 * Validates RelationInput -> returns string[] or null
 * @param params
 */
export function validateRelation(params: {
    relationInput: RelationInput;
    relationCollection: RelationInput[];
}): string[] {
    const errors: string[] = [];
    const { relationInput, relationCollection } = params;
    // Ensure Relation.type is defined
    if (relationInput.type === null) {
        errors.push(RELATION_ERROR_MESSAGE.emptyType);
    }

    // Check to see if another relation
    // Find relations with the same sourceSchemaID
    const sourceRelations = relationCollection.filter(
        r => r.sourceSchemaID === relationInput.sourceSchemaID,
    );

    // Checks to see if relation with same source + destination exist
    const destinationRelations = sourceRelations.filter(
        r => r.destinationSchemaID === relationInput.destinationSchemaID,
    );

    // Checks a relation exists that conflicts with the current relationInput
    // TODO - check against TokenPluralization -> ensure another relation with
    if (destinationRelations.length > 0) {
        if (
            destinationRelations.some(r => {
                return (
                    r.destinationSchemaAlias ===
                    relationInput.destinationSchemaAlias
                );
            })
        ) {
            errors.push(RELATION_ERROR_MESSAGE.duplicateIdentifier);
        }
    }
    // if (relationInput.sourceSchemaID === null) {
    //     errors.push(RELATION_ERROR_MESSAGE.emptyType);
    // }

    // Ensure Relation title is unique
    // if (
    //     relationCollection.some(
    //         a =>
    //             a.identifiers.title === relationInput.identifiers.title &&
    //             a.id !== attributeInput.id,
    //     )
    // ) {
    //     errors.push(RELATION_ERROR_MESSAGE.duplicateLabel);
    // }

    // Return errors array
    return errors;
}
