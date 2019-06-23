// Datattype IDs
const DATATYPE_STRING       = "STRING";       // Postgres, MongoDB
const DATATYPE_TEXT         = "TEXT";         // Postgres, MongoDB (Equiv. to String)
const DATATYPE_INTEGER      = "INTEGER";      // Postgres, MongoDB
const DATATYPE_BIGINT       = "BIGINT";       // Postgres
const DATATYPE_FLOAT        = "FLOAT";        // Postgres
const DATATYPE_DECIMAL      = "DECIMAL";      // Postgres
const DATATYPE_NUMERIC      = "NUMERIC";      // Postgres
const DATATYPE_BOOLEAN      = "BOOLEAN";      // Postgres, MongoDB
const DATATYPE_DATE         = "DATE";         // Postgres, MongoDB
const DATATYPE_TIME         = "TIME";         // Postgres
const DATATYPE_DATETIME     = "DATETIME";     // Postgres
const DATATYPE_TIMESTAMP    = "TIMESTAMP";    // MongoDB
const DATATYPE_BINARY       = "BINARY";       // Postgres, MongoDB
const DATATYPE_JSON         = "JSON";         // Postgres
const DATATYPE_JSONB        = "JSONB";        // Postgres
const DATATYPE_OBJECT       = "OBJECT";       // MongoDB

// // // //

// Array Datatypes
const DATATYPE_STRING_ARRAY     = "STRING_ARRAY";     // Postgres, MongoDB
const DATATYPE_TEXT_ARRAY       = "TEXT_ARRAY";       // Postgres, MongoDB (Equiv. to String)
const DATATYPE_INTEGER_ARRAY    = "INTEGER_ARRAY";    // Postgres, MongoDB
const DATATYPE_BIGINT_ARRAY     = "BIGINT_ARRAY";     // Postgres
const DATATYPE_FLOAT_ARRAY      = "FLOAT_ARRAY";      // Postgres
const DATATYPE_DECIMAL_ARRAY    = "DECIMAL_ARRAY";    // Postgres
const DATATYPE_NUMERIC_ARRAY    = "NUMERIC_ARRAY";    // Postgres
const DATATYPE_BOOLEAN_ARRAY    = "BOOLEAN_ARRAY";    // Postgres, MongoDB
const DATATYPE_DATE_ARRAY       = "DATE_ARRAY";       // Postgres, MongoDB
const DATATYPE_TIME_ARRAY       = "TIME_ARRAY";       // Postgres
const DATATYPE_DATETIME_ARRAY   = "DATETIME_ARRAY";   // Postgres
const DATATYPE_TIMESTAMP_ARRAY  = "TIMESTAMP_ARRAY";  // MongoDB

// // // //

// TODO - deprecate, move to OPTION_DATATYPES
const DATATYPE_STRING_SELECT = 'STRING_SELECT';

// // // //

// Special Datatypes
// These are datatypes that require more nuanced,
// customized implementation inside a generator.
const DATATYPE_SINGLE_FILE  = "SINGLE_FILE";
const DATATYPE_SINGLE_IMAGE = "SINGLE_IMAGE";

// // // //

module.exports = {
  // Standard datatypes
  DATATYPE_STRING,
  DATATYPE_TEXT,
  DATATYPE_INTEGER,
  DATATYPE_BIGINT,
  DATATYPE_FLOAT,
  DATATYPE_DECIMAL,
  DATATYPE_NUMERIC,
  DATATYPE_BOOLEAN,
  DATATYPE_DATE,
  DATATYPE_TIME,
  DATATYPE_DATETIME,
  DATATYPE_TIMESTAMP,
  DATATYPE_BINARY,
  DATATYPE_JSON,
  DATATYPE_JSONB,
  DATATYPE_OBJECT,

  // Array datatypes
  DATATYPE_STRING_ARRAY,
  DATATYPE_TEXT_ARRAY,
  DATATYPE_INTEGER_ARRAY,
  DATATYPE_BIGINT_ARRAY,
  DATATYPE_FLOAT_ARRAY,
  DATATYPE_DECIMAL_ARRAY,
  DATATYPE_NUMERIC_ARRAY,
  DATATYPE_BOOLEAN_ARRAY,
  DATATYPE_DATE_ARRAY,
  DATATYPE_TIME_ARRAY,
  DATATYPE_DATETIME_ARRAY,
  DATATYPE_TIMESTAMP_ARRAY,

  // Special Datatypes
  DATATYPE_SINGLE_FILE,
  DATATYPE_SINGLE_IMAGE,

  // TODO - remove this, move into option_types
  DATATYPE_STRING_SELECT
}
