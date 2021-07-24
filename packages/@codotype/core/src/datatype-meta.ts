import { Datatype, Datatypes } from "./datatype";

// // // //

export interface DatatypeMeta {
    value: Datatype;
    label: string;
    description: string;
}

// Defines datatype metadata
export const DATATYPE_META: {
    [key in Datatypes]: DatatypeMeta;
} = {
    [Datatypes.ID]: {
        value: Datatypes.ID,
        label: "ID",
        description: "Unique ID",
    },
    [Datatypes.AUTO_INCREMENTED_ID]: {
        value: Datatypes.AUTO_INCREMENTED_ID,
        label: "Auto-incremented ID",
        description: "Automatically incremented numeric ID",
    },
    [Datatypes.UUID]: {
        value: Datatypes.UUID,
        label: "UUID",
        description: "Unique identifiers",
    },
    [Datatypes.OBJECT_ID]: {
        value: Datatypes.OBJECT_ID,
        label: "ObjectID",
        description: "A MongoDB ObjectID",
    },
    [Datatypes.STRING]: {
        value: Datatypes.STRING,
        label: "String",
        description: "Titles, names, and labels",
    },
    [Datatypes.TEXT]: {
        value: Datatypes.TEXT,
        label: "Text",
        description: "Descriptions, paragraphs, and articles",
    },
    [Datatypes.EMAIL]: {
        value: Datatypes.EMAIL,
        label: "Email",
        description: "An email address",
    },
    [Datatypes.EMAIL_ARRAY]: {
        value: Datatypes.EMAIL_ARRAY,
        label: "Email Array",
        description: "An array of email addresses",
    },
    [Datatypes.BOOLEAN]: {
        value: Datatypes.BOOLEAN,
        label: "Boolean",
        description: "Yes or no, true or false",
    },

    [Datatypes.INT]: {
        value: Datatypes.INT,
        label: "Integer",
        description: "Whole numbers",
    },

    [Datatypes.BIGINT]: {
        value: Datatypes.BIGINT,
        label: "BigInt",
        description: "Data in BigInt format",
    },

    [Datatypes.FLOAT]: {
        value: Datatypes.FLOAT,
        label: "Float",
        description: "Numbers with decimals",
    },

    [Datatypes.DECIMAL]: {
        value: Datatypes.DECIMAL,
        label: "Decimal",
        description: "Data in Decimal format",
    },

    [Datatypes.NUMBER]: {
        value: Datatypes.NUMBER,
        label: "Number",
        description: "Any numeric data",
    },

    [Datatypes.DATE]: {
        value: Datatypes.DATE,
        label: "Date",
        description: "Calendar date, no time of day",
    },

    [Datatypes.TIME]: {
        value: Datatypes.TIME,
        label: "Time",
        description: "Time of day, no date",
    },

    [Datatypes.DATETIME]: {
        value: Datatypes.DATETIME,
        label: "Datetime",
        description: "Event dates, deadlines, opening hours",
    },

    [Datatypes.TIMESTAMP]: {
        value: Datatypes.TIMESTAMP,
        label: "Timestamp",
        description: "Data in Timestamp format",
    },

    [Datatypes.BINARY]: {
        value: Datatypes.BINARY,
        label: "Binary",
        description: "Data in Binary format",
    },

    [Datatypes.JSON]: {
        value: Datatypes.JSON,
        label: "JSON",
        description: "Data in JSON format",
    },

    [Datatypes.JSONB]: {
        value: Datatypes.JSONB,
        label: "JSONB",
        description: "Data in JSONB format",
    },

    [Datatypes.OBJECT]: {
        value: Datatypes.OBJECT,
        label: "Object",
        description: "Data in JSONB format",
    },

    // // // //
    // Array Datatypes
    [Datatypes.ID_ARRAY]: {
        value: Datatypes.ID_ARRAY,
        label: "ID Array",
        description: "An array of IDs",
    },

    [Datatypes.AUTO_INCREMENTED_ID_ARRAY]: {
        value: Datatypes.AUTO_INCREMENTED_ID_ARRAY,
        label: "Auto Incremented ID Array",
        description: "An array of Auto Incremented IDs",
    },

    [Datatypes.UUID_ARRAY]: {
        value: Datatypes.UUID_ARRAY,
        label: "UUID Array",
        description: "An array of UUIDs",
    },

    [Datatypes.OBJECT_ID_ARRAY]: {
        value: Datatypes.STRING_ARRAY,
        label: "ObjectID Array",
        description: "An array of ObjectIDs",
    },

    [Datatypes.STRING_ARRAY]: {
        value: Datatypes.STRING_ARRAY,
        label: "String Array",
        description: "An array of Strings",
    },

    [Datatypes.TEXT_ARRAY]: {
        value: Datatypes.TEXT_ARRAY,
        label: "Text Array",
        description: "An array of Text",
    },

    [Datatypes.INT_ARRAY]: {
        value: Datatypes.INT_ARRAY,
        label: "Integer Array",
        description: "An array of Integers",
    },

    [Datatypes.BIGINT_ARRAY]: {
        value: Datatypes.BIGINT_ARRAY,
        label: "BigInt Array",
        description: "An array of BigInts",
    },

    [Datatypes.FLOAT_ARRAY]: {
        value: Datatypes.FLOAT_ARRAY,
        label: "Float Array",
        description: "An array of Floats",
    },

    [Datatypes.DECIMAL_ARRAY]: {
        value: Datatypes.DECIMAL_ARRAY,
        label: "Decimal Array",
        description: "An array of Decimals",
    },

    [Datatypes.NUMBER_ARRAY]: {
        value: Datatypes.NUMBER_ARRAY,
        label: "Number Array",
        description: "An array of numbers",
    },

    [Datatypes.BOOLEAN_ARRAY]: {
        value: Datatypes.BOOLEAN_ARRAY,
        label: "Boolean Array",
        description: "An array of Booleans",
    },

    [Datatypes.DATE_ARRAY]: {
        value: Datatypes.DATE_ARRAY,
        label: "Date Array",
        description: "An array of Dates",
    },

    [Datatypes.TIME_ARRAY]: {
        value: Datatypes.TIME_ARRAY,
        label: "Time Array",
        description: "An array of Times",
    },

    [Datatypes.DATETIME_ARRAY]: {
        value: Datatypes.DATETIME_ARRAY,
        label: "Datetime Array",
        description: "An array of Datetimes",
    },

    [Datatypes.TIMESTAMP_ARRAY]: {
        value: Datatypes.TIMESTAMP_ARRAY,
        label: "Timestamp Array",
        description: "An array of Timestamps",
    },

    // // // //
    // Special Datatypes
    [Datatypes.SINGLE_FILE]: {
        value: Datatypes.SINGLE_FILE,
        label: "File Upload",
        description: "Single file upload",
    },

    [Datatypes.SINGLE_IMAGE]: {
        value: Datatypes.SINGLE_IMAGE,
        label: "Image Upload",
        description: "Single image upload",
    },
};
