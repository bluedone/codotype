const {
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
  DATATYPE_SINGLE_FILE,
  DATATYPE_SINGLE_IMAGE,
} = require('./datatypes')

// Defines datatype metadata
const DATATYPE_META = {}

DATATYPE_META[DATATYPE_STRING] = {
  value: DATATYPE_STRING,
  label: 'String',
  desc: 'Titles, names, and labels',
  icon: 'fa fa-quote-left'
}

DATATYPE_META[DATATYPE_TEXT] = {
  value: DATATYPE_TEXT,
  label: 'Text',
  desc: 'Descriptions, paragraphs, and articles',
  icon: 'fa fa-align-left'
}

DATATYPE_META[DATATYPE_BOOLEAN] = {
  value: DATATYPE_BOOLEAN,
  label: 'Boolean',
  desc: 'Yes or no, true or false',
  icon: 'fa fa-toggle-on'
}

DATATYPE_META[DATATYPE_INTEGER] = {
  value: DATATYPE_INTEGER,
  label: 'Integer',
  desc: 'Whole numbers',
  icon: 'fa fa-hashtag'
}

DATATYPE_META[DATATYPE_BIGINT] = {
  value: DATATYPE_BIGINT,
  label: 'BigInt',
  desc: 'Data in BigInt format',
  icon: 'fa fa-hashtag'
}

DATATYPE_META[DATATYPE_FLOAT] = {
  value: DATATYPE_FLOAT,
  label: 'Float',
  desc: 'Numbers with decimals',
  icon: 'fa fa-divide'
}

DATATYPE_META[DATATYPE_DECIMAL] = {
  value: DATATYPE_DECIMAL,
  label: 'Decimal',
  desc: 'Data in Decimal format',
  icon: 'fa fa-hashtag'
}

DATATYPE_META[DATATYPE_NUMERIC] = {
  value: DATATYPE_NUMERIC,
  label: 'Numeric',
  desc: 'Data in Numeric format',
  icon: 'fa fa-hashtag'
}

DATATYPE_META[DATATYPE_DATE] = {
  value: DATATYPE_DATE,
  label: 'Date',
  desc: 'Calendar date, no time of day',
  icon: 'far fa-calendar'
}

DATATYPE_META[DATATYPE_TIME] = {
  value: DATATYPE_TIME,
  label: 'Time',
  desc: 'Time of day, no date',
  icon: 'far fa-clock'
}

DATATYPE_META[DATATYPE_DATETIME] = {
  value: DATATYPE_DATETIME,
  label: 'Datetime',
  desc: 'Event dates, deadlines, opening hours',
  icon: 'far fa-calendar-alt'
}

DATATYPE_META[DATATYPE_TIMESTAMP] = {
  value: DATATYPE_TIMESTAMP,
  label: 'Timestamp',
  desc: 'Data in Timestamp format',
  icon: 'fa fa-hashtag'
}

DATATYPE_META[DATATYPE_BINARY] = {
  value: DATATYPE_BINARY,
  label: 'Binary',
  desc: 'Data in Binary format',
  icon: 'fa fa-hashtag'
}

DATATYPE_META[DATATYPE_JSON] = {
  value: DATATYPE_JSON,
  label: 'JSON',
  desc: 'Data in JSON format',
  icon: 'fa fa-code'
}

DATATYPE_META[DATATYPE_JSONB] = {
  value: DATATYPE_JSONB,
  label: 'JSONB',
  desc: 'Data in JSONB format',
  icon: 'fa fa-code'
}

DATATYPE_META[DATATYPE_OBJECT] = {
  value: DATATYPE_OBJECT,
  label: 'Object',
  desc: 'Data in JSONB format',
  icon: 'fa fa-code'
}

// // // //
// Array Datatypes

DATATYPE_META[DATATYPE_STRING_ARRAY] = {
  value: DATATYPE_STRING_ARRAY,
  label: 'String Array',
  desc: 'An array of Strings',
  icon: 'fa fa-tags'
}

DATATYPE_META[DATATYPE_TEXT_ARRAY] = {
  value: DATATYPE_TEXT_ARRAY,
  label: 'Text Array',
  desc: 'An array of Text',
  icon: 'fa fa-tags'
}

DATATYPE_META[DATATYPE_INTEGER_ARRAY] = {
  value: DATATYPE_INTEGER_ARRAY,
  label: 'Integer Array',
  desc: 'An array of Integers',
  icon: 'fa fa-tags'
}

DATATYPE_META[DATATYPE_BIGINT_ARRAY] = {
  value: DATATYPE_BIGINT_ARRAY,
  label: 'BigInt Array',
  desc: 'An array of BigInts',
  icon: 'fa fa-tags'
}

DATATYPE_META[DATATYPE_FLOAT_ARRAY] = {
  value: DATATYPE_FLOAT_ARRAY,
  label: 'Float Array',
  desc: 'An array of Floats',
  icon: 'fa fa-tags'
}

DATATYPE_META[DATATYPE_DECIMAL_ARRAY] = {
  value: DATATYPE_DECIMAL_ARRAY,
  label: 'Decimal Array',
  desc: 'An array of Decimals',
  icon: 'fa fa-tags'
}

DATATYPE_META[DATATYPE_NUMERIC_ARRAY] = {
  value: DATATYPE_NUMERIC_ARRAY,
  label: 'Numeric Array',
  desc: 'An array of Numerics',
  icon: 'fa fa-tags'
}

DATATYPE_META[DATATYPE_BOOLEAN_ARRAY] = {
  value: DATATYPE_BOOLEAN_ARRAY,
  label: 'Boolean Array',
  desc: 'An array of Booleans',
  icon: 'fa fa-tags'
}

DATATYPE_META[DATATYPE_DATE_ARRAY] = {
  value: DATATYPE_DATE_ARRAY,
  label: 'Date Array',
  desc: 'An array of Dates',
  icon: 'fa fa-tags'
}

DATATYPE_META[DATATYPE_TIME_ARRAY] = {
  value: DATATYPE_TIME_ARRAY,
  label: 'Time Array',
  desc: 'An array of Times',
  icon: 'fa fa-tags'
}

DATATYPE_META[DATATYPE_DATETIME_ARRAY] = {
  value: DATATYPE_DATETIME_ARRAY,
  label: 'Datetime Array',
  desc: 'An array of Datetimes',
  icon: 'fa fa-tags'
}

DATATYPE_META[DATATYPE_TIMESTAMP_ARRAY] = {
  value: DATATYPE_TIMESTAMP_ARRAY,
  label: 'Timestamp Array',
  desc: 'An array of Timestamps',
  icon: 'fa fa-tags'
}

// // // //
// Special Datatypes
DATATYPE_META[DATATYPE_SINGLE_FILE] = {
  value: DATATYPE_SINGLE_FILE,
  label: 'File Upload',
  desc: 'Single file upload',
  icon: 'fa fa-file'
}

DATATYPE_META[DATATYPE_SINGLE_IMAGE] = {
  value: DATATYPE_SINGLE_IMAGE,
  label: 'Image Upload',
  desc: 'Single image upload',
  icon: 'fa fa-image'
}

// // // //

module.exports = DATATYPE_META