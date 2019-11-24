import { Datatype } from "./datatype";

export interface DatatypeMeta {
  value: Datatype;
  label: string;
  description: string;
  icon: string;
}

// Defines datatype metadata
export const DATATYPE_META = {};

DATATYPE_META[Datatype.STRING] = {
  value: Datatype.STRING,
  label: "String",
  description: "Titles, names, and labels",
  icon: "fa fa-quote-left"
};

DATATYPE_META[Datatype.TEXT] = {
  value: Datatype.TEXT,
  label: "Text",
  description: "Descriptions, paragraphs, and articles",
  icon: "fa fa-align-left"
};

DATATYPE_META[Datatype.BOOLEAN] = {
  value: Datatype.BOOLEAN,
  label: "Boolean",
  description: "Yes or no, true or false",
  icon: "fa fa-toggle-on"
};

DATATYPE_META[Datatype.INTEGER] = {
  value: Datatype.INTEGER,
  label: "Integer",
  description: "Whole numbers",
  icon: "fa fa-hashtag"
};

DATATYPE_META[Datatype.BIGINT] = {
  value: Datatype.BIGINT,
  label: "BigInt",
  description: "Data in BigInt format",
  icon: "fa fa-hashtag"
};

DATATYPE_META[Datatype.FLOAT] = {
  value: Datatype.FLOAT,
  label: "Float",
  description: "Numbers with decimals",
  icon: "fa fa-divide"
};

DATATYPE_META[Datatype.DECIMAL] = {
  value: Datatype.DECIMAL,
  label: "Decimal",
  description: "Data in Decimal format",
  icon: "fa fa-hashtag"
};

DATATYPE_META[Datatype.NUMERIC] = {
  value: Datatype.NUMERIC,
  label: "Numeric",
  description: "Data in Numeric format",
  icon: "fa fa-hashtag"
};

DATATYPE_META[Datatype.DATE] = {
  value: Datatype.DATE,
  label: "Date",
  description: "Calendar date, no time of day",
  icon: "far fa-calendar"
};

DATATYPE_META[Datatype.TIME] = {
  value: Datatype.TIME,
  label: "Time",
  description: "Time of day, no date",
  icon: "far fa-clock"
};

DATATYPE_META[Datatype.DATETIME] = {
  value: Datatype.DATETIME,
  label: "Datetime",
  description: "Event dates, deadlines, opening hours",
  icon: "far fa-calendar-alt"
};

DATATYPE_META[Datatype.TIMESTAMP] = {
  value: Datatype.TIMESTAMP,
  label: "Timestamp",
  description: "Data in Timestamp format",
  icon: "fa fa-hashtag"
};

DATATYPE_META[Datatype.BINARY] = {
  value: Datatype.BINARY,
  label: "Binary",
  description: "Data in Binary format",
  icon: "fa fa-hashtag"
};

DATATYPE_META[Datatype.JSON] = {
  value: Datatype.JSON,
  label: "JSON",
  description: "Data in JSON format",
  icon: "fa fa-code"
};

DATATYPE_META[Datatype.JSONB] = {
  value: Datatype.JSONB,
  label: "JSONB",
  description: "Data in JSONB format",
  icon: "fa fa-code"
};

DATATYPE_META[Datatype.OBJECT] = {
  value: Datatype.OBJECT,
  label: "Object",
  description: "Data in JSONB format",
  icon: "fa fa-code"
};

// // // //
// Array Datatypes

DATATYPE_META[Datatype.STRING_ARRAY] = {
  value: Datatype.STRING_ARRAY,
  label: "String Array",
  description: "An array of Strings",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.TEXT_ARRAY] = {
  value: Datatype.TEXT_ARRAY,
  label: "Text Array",
  description: "An array of Text",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.INTEGER_ARRAY] = {
  value: Datatype.INTEGER_ARRAY,
  label: "Integer Array",
  description: "An array of Integers",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.BIGINT_ARRAY] = {
  value: Datatype.BIGINT_ARRAY,
  label: "BigInt Array",
  description: "An array of BigInts",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.FLOAT_ARRAY] = {
  value: Datatype.FLOAT_ARRAY,
  label: "Float Array",
  description: "An array of Floats",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.DECIMAL_ARRAY] = {
  value: Datatype.DECIMAL_ARRAY,
  label: "Decimal Array",
  description: "An array of Decimals",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.NUMERIC_ARRAY] = {
  value: Datatype.NUMERIC_ARRAY,
  label: "Numeric Array",
  description: "An array of Numerics",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.BOOLEAN_ARRAY] = {
  value: Datatype.BOOLEAN_ARRAY,
  label: "Boolean Array",
  description: "An array of Booleans",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.DATE_ARRAY] = {
  value: Datatype.DATE_ARRAY,
  label: "Date Array",
  description: "An array of Dates",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.TIME_ARRAY] = {
  value: Datatype.TIME_ARRAY,
  label: "Time Array",
  description: "An array of Times",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.DATETIME_ARRAY] = {
  value: Datatype.DATETIME_ARRAY,
  label: "Datetime Array",
  description: "An array of Datetimes",
  icon: "fa fa-tags"
};

DATATYPE_META[Datatype.TIMESTAMP_ARRAY] = {
  value: Datatype.TIMESTAMP_ARRAY,
  label: "Timestamp Array",
  description: "An array of Timestamps",
  icon: "fa fa-tags"
};

// // // //
// Special Datatypes
DATATYPE_META[Datatype.SINGLE_FILE] = {
  value: Datatype.SINGLE_FILE,
  label: "File Upload",
  description: "Single file upload",
  icon: "fa fa-file"
};

DATATYPE_META[Datatype.SINGLE_IMAGE] = {
  value: Datatype.SINGLE_IMAGE,
  label: "Image Upload",
  description: "Single image upload",
  icon: "fa fa-image"
};
