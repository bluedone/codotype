import { SchemaInput, Datatype, Attribute, Schema, Relation } from "../";
import { inflateSchema, buildRelations } from "./inflate";
import { ProjectInput } from "../project";

// // // //

// CLEANUP - document this function, write better tests
export const getDatatypeValueJson = ({
    datatype,
}: {
    datatype: Datatype;
}): string => {
    switch (datatype) {
        // case Datatype.ID:
        //   return `1`;
        case Datatype.UUID:
            return `"00112233-4455-6677-8899-aabbccddeeff"`;
        case Datatype.STRING:
            return `"string"`;
        case Datatype.TEXT:
            return `"longer string for text"`;
        case Datatype.INT:
            return `128`;
        case Datatype.BIGINT:
            return `12378971290123987`;
        case Datatype.FLOAT:
            return `3.14159`;
        case Datatype.DECIMAL:
            return `3.14159`;
        case Datatype.NUMERIC:
            return `3.14159`;
        case Datatype.BOOLEAN:
            return `true`;
        case Datatype.JSON:
            return `{}`;
        case Datatype.JSONB:
            return `{}`;
        case Datatype.DATE:
            return `"2019-03-11"`;
        case Datatype.TIME:
            return `"17:04:14 GMT-0400"`;
        case Datatype.DATETIME:
            return `"3/18/2019, 5:04:51 PM"`;
        case Datatype.TIMESTAMP:
            return `"3/18/2019, 5:04:51 PM"`;
        case Datatype.UUID_ARRAY:
            return `["00112233-4455-6677-8899-aabbccddeeff"]`;
        case Datatype.STRING_ARRAY:
            return `["string", "array"]`;
        case Datatype.TEXT_ARRAY:
            return `["text", "array"]`;
        case Datatype.INT_ARRAY:
            return `[128, 256]`;
        case Datatype.BIGINT_ARRAY:
            return `[128128309810198, 128128309810198]`;
        case Datatype.FLOAT_ARRAY:
            return `[3.14156, 64.23012]`;
        case Datatype.DECIMAL_ARRAY:
            return `[0.12390123, 0.12312442]`;
        case Datatype.NUMERIC_ARRAY:
            return `[128, 255.9]`;
        case Datatype.BOOLEAN_ARRAY:
            return `[true, false, true]`;
        case Datatype.DATE_ARRAY:
            return `["2019-03-11", "2020-03-11]`;
        case Datatype.TIME_ARRAY:
            return `["17:04:14 GMT-0400", "12:04:14 GMT-0400"]`;
        case Datatype.DATETIME_ARRAY:
            return `[128]`;
        case Datatype.TIMESTAMP_ARRAY:
            return `["3/18/2019, 5:04:51 PM", "3/20/2019, 1:04:51 PM"]`;
    }
};

export function renderSchemaJson({
    schemaInput,
    projectInput,
}: {
    projectInput: ProjectInput;
    schemaInput: SchemaInput;
}): string {
    const inflatedSchema: Schema = inflateSchema({
        schemaInput,
        relations: buildRelations({
            schemaInputs: projectInput.schemas,
            relationInputs: projectInput.relations,
        }),
    });
    // Define + open JSON output
    let jsonOutput: string[] = [
        "{", // Open JSON output
        // Map each property
        [
            ...schemaInput.attributes.map((attr: Attribute) => {
                return `  "${attr.identifiers.snake}": ${getDatatypeValueJson({
                    datatype: attr.datatype,
                })}`;
            }),
            ...inflatedSchema.relations.map((r: Relation): string => {
                return `  "${r.identifiers.destination.alias.singular.camel}": "${r.identifiers.destination.canonical.singular.pascal} ID"`;
            }),
        ].join(",\n"),
        "}", // Close JSON output
    ];

    // Joins lines
    return jsonOutput.join("\n");
}

// // // //

// CLEANUP - document this function, write better tests
export const getDatatypeValueGraphQL = ({
    datatype,
}: {
    datatype: Datatype;
}): string => {
    switch (datatype) {
        case Datatype.UUID:
            return `String`;
        case Datatype.STRING:
            return `String`;
        case Datatype.TEXT:
            return `String`;
        case Datatype.INT:
            return `Number`;
        case Datatype.BIGINT:
            return `"Number`;
        case Datatype.FLOAT:
            return `Number`;
        case Datatype.DECIMAL:
            return `Number`;
        case Datatype.NUMERIC:
            return `Number`;
        case Datatype.BOOLEAN:
            return `Boolean`;
        case Datatype.JSON:
            return `"{}"`;
        case Datatype.JSONB:
            return `"{}"`;
        case Datatype.DATE:
            return `Date`;
        case Datatype.TIME:
            return `Time`;
        case Datatype.DATETIME:
            return `Date`;
        case Datatype.TIMESTAMP:
            return `Date`;
        case Datatype.UUID_ARRAY:
            return `[String]`;
        case Datatype.STRING_ARRAY:
            return `[String]`;
        case Datatype.TEXT_ARRAY:
            return `[String]`;
        case Datatype.INT_ARRAY:
            return `[Number]`;
        case Datatype.BIGINT_ARRAY:
            return `[Number]`;
        case Datatype.FLOAT_ARRAY:
            return `[Number]`;
        case Datatype.DECIMAL_ARRAY:
            return `[Number]`;
        case Datatype.NUMERIC_ARRAY:
            return `[Number]`;
        case Datatype.BOOLEAN_ARRAY:
            return `[Boolean]`;
        case Datatype.DATE_ARRAY:
            return `[Date]`;
        case Datatype.TIME_ARRAY:
            return `[Time]`;
        case Datatype.DATETIME_ARRAY:
            return `[Date]`;
        case Datatype.TIMESTAMP_ARRAY:
            return `[Date]`;
    }
};

export function renderSchemaGrapqhQL({
    schemaInput,
    projectInput,
}: {
    projectInput: ProjectInput;
    schemaInput: SchemaInput;
}): string {
    const inflatedSchema: Schema = inflateSchema({
        schemaInput,
        relations: buildRelations({
            schemaInputs: projectInput.schemas,
            relationInputs: projectInput.relations,
        }),
    });
    // Define + open JSON output
    let jsonOutput: string[] = [
        `type ${schemaInput.identifiers.singular.pascal} {`, // Open JSON output
        // Map each property
        ...schemaInput.attributes.map((attr: Attribute) => {
            return `  ${attr.identifiers.snake}: ${getDatatypeValueGraphQL({
                datatype: attr.datatype,
            })}!`;
        }),
        ...inflatedSchema.relations.map((r: Relation): string => {
            return `  ${r.identifiers.destination.alias.singular.camel}: ${r.identifiers.destination.canonical.singular.pascal}!`;
        }),
        "}", // Close JSON output
    ];

    // Joins lines
    return jsonOutput.join("\n");
}

// // // //

// CLEANUP - document this function, write better tests
export const getDatatypeValueTypeScript = ({
    datatype,
}: {
    datatype: Datatype;
}): string => {
    switch (datatype) {
        case Datatype.UUID:
            return `string`;
        case Datatype.STRING:
            return `string`;
        case Datatype.TEXT:
            return `string`;
        case Datatype.INT:
            return `number`;
        case Datatype.BIGINT:
            return `"number`;
        case Datatype.FLOAT:
            return `number`;
        case Datatype.DECIMAL:
            return `number`;
        case Datatype.NUMERIC:
            return `number`;
        case Datatype.BOOLEAN:
            return `boolean`;
        case Datatype.JSON:
            return `"{}"`;
        case Datatype.JSONB:
            return `"{}"`;
        case Datatype.DATE:
            return `string`;
        case Datatype.TIME:
            return `string`;
        case Datatype.DATETIME:
            return `string`;
        case Datatype.TIMESTAMP:
            return `string`;
        case Datatype.UUID_ARRAY:
            return `string[]`;
        case Datatype.STRING_ARRAY:
            return `string[]`;
        case Datatype.TEXT_ARRAY:
            return `string[]`;
        case Datatype.INT_ARRAY:
            return `number[]`;
        case Datatype.BIGINT_ARRAY:
            return `number[]`;
        case Datatype.FLOAT_ARRAY:
            return `number[]`;
        case Datatype.DECIMAL_ARRAY:
            return `number[]`;
        case Datatype.NUMERIC_ARRAY:
            return `number[]`;
        case Datatype.BOOLEAN_ARRAY:
            return `boolean[]`;
        case Datatype.DATE_ARRAY:
            return `string[]`;
        case Datatype.TIME_ARRAY:
            return `string[]`;
        case Datatype.DATETIME_ARRAY:
            return `string[]`;
        case Datatype.TIMESTAMP_ARRAY:
            return `string[]`;
    }
};

export function renderSchemaTypeScript({
    schemaInput,
    projectInput,
}: {
    projectInput: ProjectInput;
    schemaInput: SchemaInput;
}): string {
    const inflatedSchema: Schema = inflateSchema({
        schemaInput,
        relations: buildRelations({
            schemaInputs: projectInput.schemas,
            relationInputs: projectInput.relations,
        }),
    });
    // Define + open JSON output
    let output: string[] = [
        `interface ${schemaInput.identifiers.singular.pascal} {`, // Open JSON output
        // Map each property
        ...schemaInput.attributes.map((attr: Attribute) => {
            return `  ${attr.identifiers.snake}: ${getDatatypeValueTypeScript({
                datatype: attr.datatype,
            })};`;
        }),
        ...inflatedSchema.relations.map((r: Relation): string => {
            return `  ${r.identifiers.destination.alias.singular.camel}Id: ${r.identifiers.destination.canonical.singular.pascal};`;
        }),
        "}", // Close JSON output
    ];

    // Joins lines
    return output.join("\n");
}
