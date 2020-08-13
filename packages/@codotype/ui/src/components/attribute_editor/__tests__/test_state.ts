import { Attribute, Datatype, buildTokenCasing, testState } from "@codotype/core";
const { emailAttribute } = testState;

// // // //

export const attributeExample01: Attribute = {
    ...emailAttribute,
    identifiers: buildTokenCasing("Name"),
};

export const attributeExample02: Attribute = {
    ...emailAttribute,
    identifiers: buildTokenCasing("Email"),
};

export const supportedDatatypes: Datatype[] = [
    Datatype.STRING,
    Datatype.TEXT,
    Datatype.INTEGER,
    Datatype.BIGINT,
    Datatype.FLOAT,
    Datatype.DECIMAL,
    Datatype.NUMERIC,
    Datatype.BOOLEAN,
    Datatype.DATE,
    Datatype.TIME,
    Datatype.DATETIME,
    Datatype.TIMESTAMP,
    Datatype.BINARY,
    Datatype.JSON,
    Datatype.JSONB,
    Datatype.OBJECT,
    Datatype.STRING_ARRAY,
    Datatype.TEXT_ARRAY,
    Datatype.INTEGER_ARRAY,
    Datatype.BIGINT_ARRAY,
    Datatype.FLOAT_ARRAY,
    Datatype.DECIMAL_ARRAY,
    Datatype.NUMERIC_ARRAY,
    Datatype.BOOLEAN_ARRAY,
    Datatype.DATE_ARRAY,
    Datatype.TIME_ARRAY,
    Datatype.DATETIME_ARRAY,
    Datatype.TIMESTAMP_ARRAY,
    Datatype.SINGLE_FILE,
    Datatype.SINGLE_IMAGE,
];
