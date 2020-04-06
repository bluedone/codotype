import { Relation, Schema, Datatype } from "../@codotype/types";

// // // //

export const relationExample01: Relation = {
    id: "name-attr",
    label: "Name",
    identifier: "name",
    description: "the name of the user",
    required: true,
    unique: true,
    locked: false,
    datatype: Datatype.STRING,
    default_value: "string",
    datatypeOptions: {},
};

export const relationExample02: Relation = {
    id: "email-attr",
    label: "Email",
    identifier: "email",
    description: "the email of the user",
    required: true,
    unique: true,
    locked: false,
    datatype: Datatype.STRING,
    default_value: "string",
    datatypeOptions: {},
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

export const userSchema: Schema = {
    id: "12345",
    tokens: {
        label: "User",
        label_plural: "Users",
        identifier: "user",
        identifier_plural: "users",
    },
    attributes: [],
    relations: [],
    locked: false,
    removable: false,
    source: "USER",
    configuration: {},
};
