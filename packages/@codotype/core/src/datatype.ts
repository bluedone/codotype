export enum Datatype {
    // Standard datatypes
    STRING = "STRING", // Postgres, MongoDB
    TEXT = "TEXT", // Postgres, MongoDB (Equiv. to String)
    INT = "INT", // Postgres, MongoDB
    BIGINT = "BIGINT", // Postgres
    FLOAT = "FLOAT", // Postgres
    DECIMAL = "DECIMAL", // Postgres
    NUMERIC = "NUMERIC", // Postgres
    BOOLEAN = "BOOLEAN", // Postgres, MongoDB
    DATE = "DATE", // Postgres, MongoDB
    TIME = "TIME", // Postgres
    DATETIME = "DATETIME", // Postgres
    TIMESTAMP = "TIMESTAMP", // MongoDB
    BINARY = "BINARY", // Postgres, MongoDB
    JSON = "JSON", // Postgres
    JSONB = "JSONB", // Postgres
    OBJECT = "OBJECT", // MongoDB
    ID = "ID", // Postgres, MongoDB
    UUID = "UUID", // Postgres
    AUTO_INCREMENTED_ID = "AUTO_INCREMENTED_ID", // Postgres
    OBJECT_ID = "OBJECT_ID", // MongoDB

    // Array datatypes
    STRING_ARRAY = "STRING_ARRAY", // Postgres, MongoDB
    TEXT_ARRAY = "TEXT_ARRAY", // Postgres, MongoDB (Equiv. to String)
    INT_ARRAY = "INT_ARRAY", // Postgres, MongoDB
    BIGINT_ARRAY = "BIGINT_ARRAY", // Postgres
    FLOAT_ARRAY = "FLOAT_ARRAY", // Postgres
    DECIMAL_ARRAY = "DECIMAL_ARRAY", // Postgres
    NUMERIC_ARRAY = "NUMERIC_ARRAY", // Postgres
    BOOLEAN_ARRAY = "BOOLEAN_ARRAY", // Postgres, MongoDB
    DATE_ARRAY = "DATE_ARRAY", // Postgres, MongoDB
    TIME_ARRAY = "TIME_ARRAY", // Postgres
    DATETIME_ARRAY = "DATETIME_ARRAY", // Postgres
    TIMESTAMP_ARRAY = "TIMESTAMP_ARRAY", // MongoDB
    UUID_ARRAY = "UUID_ARRAY", // Postgres
    OBJECT_ID_ARRAY = "OBJECT_ID_ARRAY", // MongoDB

    // Special Datatypes
    SINGLE_FILE = "SINGLE_FILE",
    SINGLE_IMAGE = "SINGLE_IMAGE",

    // Future datatypes?
    // BLOB = "BLOB";
    // BYTEA = "BYTEA";
    // CHAR = "CHAR";
    // CHAR = "CHAR";
    // DOUBLE = "DOUBLE";
    // ENUM = "ENUM";
    // GEOMETRY = "GEOMETRY";
    // GEOMETRY_COLLECTION = "GEOMETRY_COLLECTION";
    // LINESTRING = "LINESTRING";
    // LONGTEXT = "LONGTEXT";
    // MEDIUM_INT = "MEDIUM_INT";
    // MEDIUM_TEXT = "MEDIUM_TEXT";
    // MULTI_LINE_STRING = "MULTI_LINE_STRING";
    // MULTI_POINT = "MULTI_POINT";
    // MULTI_POLYGON = "MULTI_POLYGON";
    // POINT = "POINT";
    // POLYGON = "POLYGON";
    // SMALL_INT = "SMALL_INT";
    // TIMESTAMPTZ = "TIMESTAMPTZ";
    // TIMETZ = "TIMETZ";
    // TINY_INT = "TINY_INT";
    // VARCHAR = "VARCHAR";
    // YEAR = "YEAR";
}
