import { Datatype } from "./datatype";

// Defines datatype metadata
export const DATATYPE_META = {};

DATATYPE_META[Datatype.STRING] = {
  value: Datatype.STRING,
  label: "String",
  desc: "Titles, names, and labels",
  icon: "fa fa-quote-left"
};

DATATYPE_META[Datatype.TEXT] = {
  value: Datatype.TEXT,
  label: "Text",
  desc: "Descriptions, paragraphs, and articles",
  icon: "fa fa-align-left"
};

DATATYPE_META[Datatype.BOOLEAN] = {
  value: Datatype.BOOLEAN,
  label: "Boolean",
  desc: "Yes or no, true or false",
  icon: "fa fa-toggle-on"
};

DATATYPE_META[Datatype.INTEGER] = {
  value: Datatype.INTEGER,
  label: "Integer",
  desc: "Whole numbers",
  icon: "fa fa-hashtag"
};

DATATYPE_META[Datatype.BIGINT] = {
  value: Datatype.BIGINT,
  label: "BigInt",
  desc: "Data in BigInt format",
  icon: "fa fa-hashtag"
};

DATATYPE_META[Datatype.FLOAT] = {
  value: Datatype.FLOAT,
  label: "Float",
  desc: "Numbers with decimals",
  icon: "fa fa-divide"
};

DATATYPE_META[Datatype.DECIMAL] = {
  value: Datatype.DECIMAL,
  label: "Decimal",
  desc: "Data in Decimal format",
  icon: "fa fa-hashtag"
};

DATATYPE_META[Datatype.NUMERIC] = {
  value: Datatype.NUMERIC,
  label: "Numeric",
  desc: "Data in Numeric format",
  icon: "fa fa-hashtag"
};

DATATYPE_META[Datatype.DATE] = {
  value: Datatype.DATE,
  label: "Date",
  desc: "Calendar date, no time of day",
  icon: "far fa-calendar"
};

DATATYPE_META[Datatype.TIME] = {
  value: Datatype.TIME,
  label: "Time",
  desc: "Time of day, no date",
  icon: "far fa-clock"
};

DATATYPE_META[Datatype.DATETIME] = {
  value: Datatype.DATETIME,
  label: "Datetime",
  desc: "Event dates, deadlines, opening hours",
  icon: "far fa-calendar-alt"
};

DATATYPE_META[Datatype.TIMESTAMP] = {
  value: Datatype.TIMESTAMP,
  label: "Timestamp",
  desc: "Data in Timestamp format",
  icon: "fa fa-hashtag"
};

DATATYPE_META[Datatype.BINARY] = {
  value: Datatype.BINARY,
  label: "Binary",
  desc: "Data in Binary format",
  icon: "fa fa-hashtag"
};

DATATYPE_META[Datatype.JSON] = {
  value: Datatype.JSON,
  label: "JSON",
  desc: "Data in JSON format",
  icon: "fa fa-code"
};

DATATYPE_META[Datatype.JSONB] = {
  value: Datatype.JSONB,
  label: "JSONB",
  desc: "Data in JSONB format",
  icon: "fa fa-code"
};

DATATYPE_META[Datatype.OBJECT] = {
  value: Datatype.OBJECT,
  label: "Object",
  desc: "Data in JSONB format",
  icon: "fa fa-code"
};

// // // //
// Array Datatypes

DATATYPE_META[Datatype.STRING_ARRAY] = {
  value: Datatype.STRING_ARRAY,
  label: "String Array",
  desc: "An array of Strings",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.TEXT_ARRAY] = {
  value: Datatype.TEXT_ARRAY,
  label: "Text Array",
  desc: "An array of Text",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.INTEGER_ARRAY] = {
  value: Datatype.INTEGER_ARRAY,
  label: "Integer Array",
  desc: "An array of Integers",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.BIGINT_ARRAY] = {
  value: Datatype.BIGINT_ARRAY,
  label: "BigInt Array",
  desc: "An array of BigInts",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.FLOAT_ARRAY] = {
  value: Datatype.FLOAT_ARRAY,
  label: "Float Array",
  desc: "An array of Floats",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.DECIMAL_ARRAY] = {
  value: Datatype.DECIMAL_ARRAY,
  label: "Decimal Array",
  desc: "An array of Decimals",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.NUMERIC_ARRAY] = {
  value: Datatype.NUMERIC_ARRAY,
  label: "Numeric Array",
  desc: "An array of Numerics",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.BOOLEAN_ARRAY] = {
  value: Datatype.BOOLEAN_ARRAY,
  label: "Boolean Array",
  desc: "An array of Booleans",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.DATE_ARRAY] = {
  value: Datatype.DATE_ARRAY,
  label: "Date Array",
  desc: "An array of Dates",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.TIME_ARRAY] = {
  value: Datatype.TIME_ARRAY,
  label: "Time Array",
  desc: "An array of Times",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.DATETIME_ARRAY] = {
  value: Datatype.DATETIME_ARRAY,
  label: "Datetime Array",
  desc: "An array of Datetimes",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.TIMESTAMP_ARRAY] = {
  value: Datatype.TIMESTAMP_ARRAY,
  label: "Timestamp Array",
  desc: "An array of Timestamps",
  icon: "fa fa-tags"
};

// // // //
// Special Datatypes
DATATYPE_META[Datatype.SINGLE_FILE] = {
  value: Datatype.SINGLE_FILE,
  label: "File Upload",
  desc: "Single file upload",
  icon: "fa fa-file"
};

DATATYPE_META[Datatype.SINGLE_IMAGE] = {
  value: Datatype.SINGLE_IMAGE,
  label: "Image Upload",
  desc: "Single image upload",
  icon: "fa fa-image"
};
