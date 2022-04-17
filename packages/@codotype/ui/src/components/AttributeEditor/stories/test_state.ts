import {
    Attribute,
    Datatypes,
    buildTokenCasing,
    testState,
} from "@codotype/core";
const { emailAttribute } = testState;

// // // //

export const attributeExample01: Attribute = {
    ...emailAttribute,
    id: "1",
    identifiers: buildTokenCasing("Name"),
};

export const attributeExample02: Attribute = {
    ...emailAttribute,
    id: "2",
    identifiers: buildTokenCasing("Email"),
};

export const supportedDatatypes: Datatypes[] = [
    Datatypes.STRING,
    Datatypes.TEXT,
    Datatypes.INT,
    Datatypes.BIGINT,
    Datatypes.FLOAT,
    Datatypes.DECIMAL,
    Datatypes.NUMBER,
    Datatypes.BOOLEAN,
    Datatypes.DATE,
    Datatypes.TIME,
    Datatypes.DATETIME,
    Datatypes.TIMESTAMP,
    Datatypes.BINARY,
    Datatypes.JSON,
    Datatypes.JSONB,
    Datatypes.OBJECT,
    Datatypes.STRING_ARRAY,
    Datatypes.TEXT_ARRAY,
    Datatypes.INT_ARRAY,
    Datatypes.BIGINT_ARRAY,
    Datatypes.FLOAT_ARRAY,
    Datatypes.DECIMAL_ARRAY,
    Datatypes.NUMBER_ARRAY,
    Datatypes.BOOLEAN_ARRAY,
    Datatypes.DATE_ARRAY,
    Datatypes.TIME_ARRAY,
    Datatypes.DATETIME_ARRAY,
    Datatypes.TIMESTAMP_ARRAY,
    Datatypes.SINGLE_FILE,
    Datatypes.SINGLE_IMAGE,
    Datatypes.EMAIL,
    Datatypes.EMAIL_ARRAY,
    Datatypes.AUTO_INCREMENTED_ID,
    Datatypes.AUTO_INCREMENTED_ID_ARRAY,
];
