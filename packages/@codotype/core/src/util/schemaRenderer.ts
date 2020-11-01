import {
    SchemaInput,
    Datatype,
    Datatypes,
    Attribute,
    Schema,
    Relation,
} from "../";
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
        case Datatypes.ID:
            return "1";
        case Datatypes.AUTO_INCREMENTED_ID:
            return "1";
        case Datatypes.UUID:
            return `"00112233-4455-6677-8899-aabbccddeeff"`;
        case Datatypes.STRING:
            return `"string"`;
        case Datatypes.TEXT:
            return `"longer string for text"`;
        case Datatypes.INT:
            return `128`;
        case Datatypes.BIGINT:
            return `12378971290123987`;
        case Datatypes.FLOAT:
            return `3.14159`;
        case Datatypes.DECIMAL:
            return `3.14159`;
        case Datatypes.NUMERIC:
            return `3.14159`;
        case Datatypes.BOOLEAN:
            return `true`;
        case Datatypes.JSON:
            return `{}`;
        case Datatypes.JSONB:
            return `{}`;
        case Datatypes.DATE:
            return `"2019-03-11"`;
        case Datatypes.TIME:
            return `"17:04:14 GMT-0400"`;
        case Datatypes.DATETIME:
            return `"3/18/2019, 5:04:51 PM"`;
        case Datatypes.TIMESTAMP:
            return `"3/18/2019, 5:04:51 PM"`;
        case Datatypes.UUID_ARRAY:
            return `["00112233-4455-6677-8899-aabbccddeeff"]`;
        case Datatypes.STRING_ARRAY:
            return `["string", "array"]`;
        case Datatypes.TEXT_ARRAY:
            return `["text", "array"]`;
        case Datatypes.INT_ARRAY:
            return `[128, 256]`;
        case Datatypes.BIGINT_ARRAY:
            return `[128128309810198, 128128309810198]`;
        case Datatypes.FLOAT_ARRAY:
            return `[3.14156, 64.23012]`;
        case Datatypes.DECIMAL_ARRAY:
            return `[0.12390123, 0.12312442]`;
        case Datatypes.NUMERIC_ARRAY:
            return `[128, 255.9]`;
        case Datatypes.BOOLEAN_ARRAY:
            return `[true, false, true]`;
        case Datatypes.DATE_ARRAY:
            return `["2019-03-11", "2020-03-11]`;
        case Datatypes.TIME_ARRAY:
            return `["17:04:14 GMT-0400", "12:04:14 GMT-0400"]`;
        case Datatypes.DATETIME_ARRAY:
            return `[128]`;
        case Datatypes.TIMESTAMP_ARRAY:
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
        case Datatypes.ID:
            return `ID`;
        case Datatypes.AUTO_INCREMENTED_ID:
            return `Number`;
        case Datatypes.UUID:
            return `String`;
        case Datatypes.STRING:
            return `String`;
        case Datatypes.TEXT:
            return `String`;
        case Datatypes.INT:
            return `Number`;
        case Datatypes.BIGINT:
            return `Number`;
        case Datatypes.FLOAT:
            return `Number`;
        case Datatypes.DECIMAL:
            return `Number`;
        case Datatypes.NUMERIC:
            return `Number`;
        case Datatypes.BOOLEAN:
            return `Boolean`;
        case Datatypes.JSON:
            return `"{}"`;
        case Datatypes.JSONB:
            return `"{}"`;
        case Datatypes.DATE:
            return `Date`;
        case Datatypes.TIME:
            return `Time`;
        case Datatypes.DATETIME:
            return `Date`;
        case Datatypes.TIMESTAMP:
            return `Date`;
        case Datatypes.UUID_ARRAY:
            return `[String]`;
        case Datatypes.STRING_ARRAY:
            return `[String]`;
        case Datatypes.TEXT_ARRAY:
            return `[String]`;
        case Datatypes.INT_ARRAY:
            return `[Number]`;
        case Datatypes.BIGINT_ARRAY:
            return `[Number]`;
        case Datatypes.FLOAT_ARRAY:
            return `[Number]`;
        case Datatypes.DECIMAL_ARRAY:
            return `[Number]`;
        case Datatypes.NUMERIC_ARRAY:
            return `[Number]`;
        case Datatypes.BOOLEAN_ARRAY:
            return `[Boolean]`;
        case Datatypes.DATE_ARRAY:
            return `[Date]`;
        case Datatypes.TIME_ARRAY:
            return `[Time]`;
        case Datatypes.DATETIME_ARRAY:
            return `[Date]`;
        case Datatypes.TIMESTAMP_ARRAY:
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
        case Datatypes.ID:
            return `ID`;
        case Datatypes.AUTO_INCREMENTED_ID:
            return `number`;
        case Datatypes.UUID:
            return `string`;
        case Datatypes.STRING:
            return `string`;
        case Datatypes.TEXT:
            return `string`;
        case Datatypes.INT:
            return `number`;
        case Datatypes.BIGINT:
            return `"number`;
        case Datatypes.FLOAT:
            return `number`;
        case Datatypes.DECIMAL:
            return `number`;
        case Datatypes.NUMERIC:
            return `number`;
        case Datatypes.BOOLEAN:
            return `boolean`;
        case Datatypes.JSON:
            return `"{}"`;
        case Datatypes.JSONB:
            return `"{}"`;
        case Datatypes.DATE:
            return `string`;
        case Datatypes.TIME:
            return `string`;
        case Datatypes.DATETIME:
            return `string`;
        case Datatypes.TIMESTAMP:
            return `string`;
        case Datatypes.UUID_ARRAY:
            return `string[]`;
        case Datatypes.STRING_ARRAY:
            return `string[]`;
        case Datatypes.TEXT_ARRAY:
            return `string[]`;
        case Datatypes.INT_ARRAY:
            return `number[]`;
        case Datatypes.BIGINT_ARRAY:
            return `number[]`;
        case Datatypes.FLOAT_ARRAY:
            return `number[]`;
        case Datatypes.DECIMAL_ARRAY:
            return `number[]`;
        case Datatypes.NUMERIC_ARRAY:
            return `number[]`;
        case Datatypes.BOOLEAN_ARRAY:
            return `boolean[]`;
        case Datatypes.DATE_ARRAY:
            return `string[]`;
        case Datatypes.TIME_ARRAY:
            return `string[]`;
        case Datatypes.DATETIME_ARRAY:
            return `string[]`;
        case Datatypes.TIMESTAMP_ARRAY:
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
