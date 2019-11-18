
export enum Datatype {
  // Datattype IDs
  STRING = "STRING",    // Postgres, MongoDB
  TEXT = "TEXT",      // Postgres, MongoDB (Equiv. to String)
  INTEGER = "INTEGER",   // Postgres, MongoDB
  BIGINT = "BIGINT",    // Postgres
  FLOAT = "FLOAT",     // Postgres
  DECIMAL = "DECIMAL",   // Postgres
  NUMERIC = "NUMERIC",   // Postgres
  BOOLEAN = "BOOLEAN",   // Postgres, MongoDB
  DATE = "DATE",      // Postgres, MongoDB
  TIME = "TIME",      // Postgres
  DATETIME = "DATETIME",  // Postgres
  TIMESTAMP = "TIMESTAMP", // MongoDB
  BINARY = "BINARY",    // Postgres, MongoDB
  JSON = "JSON",      // Postgres
  JSONB = "JSONB",     // Postgres
  OBJECT = "OBJECT",    // MongoDB

  // // // //

  // Array Datatypes
  STRING_ARRAY = "STRING_ARRAY",     // Postgres, MongoDB
  TEXT_ARRAY = "TEXT_ARRAY",       // Postgres, MongoDB (Equiv. to String)
  INTEGER_ARRAY = "INTEGER_ARRAY",    // Postgres, MongoDB
  BIGINT_ARRAY = "BIGINT_ARRAY",     // Postgres
  FLOAT_ARRAY = "FLOAT_ARRAY",      // Postgres
  DECIMAL_ARRAY = "DECIMAL_ARRAY",    // Postgres
  NUMERIC_ARRAY = "NUMERIC_ARRAY",    // Postgres
  BOOLEAN_ARRAY = "BOOLEAN_ARRAY",    // Postgres, MongoDB
  DATE_ARRAY = "DATE_ARRAY",       // Postgres, MongoDB
  TIME_ARRAY = "TIME_ARRAY",       // Postgres
  DATETIME_ARRAY = "DATETIME_ARRAY",   // Postgres
  TIMESTAMP_ARRAY = "TIMESTAMP_ARRAY",  // MongoDB

  // // // //

  // Special Datatypes
  // These are datatypes that require more nuanced,
  // customized implementation inside a generator.
  SINGLE_FILE = "SINGLE_FILE",
  SINGLE_IMAGE = "SINGLE_IMAGE",
}
