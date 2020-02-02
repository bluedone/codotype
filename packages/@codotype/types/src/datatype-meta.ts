import { Datatype } from "./datatype";

export interface DatatypeMeta {
  value: Datatype;
  label: string;
  description: string;
  icon: string;
}

// Defines datatype metadata
export const DATATYPE_META: {
  [key in Datatype]: DatatypeMeta
} = {

  [Datatype.STRING]: {
    value: Datatype.STRING,
    label: "String",
    description: "Titles, names, and labels",
    icon: "fa fa-quote-left"
  },

  [Datatype.TEXT]: {
    value: Datatype.TEXT,
    label: "Text",
    description: "Descriptions, paragraphs, and articles",
    icon: "fa fa-align-left"
  },

  [Datatype.BOOLEAN]: {
    value: Datatype.BOOLEAN,
    label: "Boolean",
    description: "Yes or no, true or false",
    icon: "fa fa-toggle-on"
  },

  [Datatype.INTEGER]: {
    value: Datatype.INTEGER,
    label: "Integer",
    description: "Whole numbers",
    icon: "fa fa-hashtag"
  },

  [Datatype.BIGINT]: {
    value: Datatype.BIGINT,
    label: "BigInt",
    description: "Data in BigInt format",
    icon: "fa fa-hashtag"
  },

  [Datatype.FLOAT]: {
    value: Datatype.FLOAT,
    label: "Float",
    description: "Numbers with decimals",
    icon: "fa fa-divide"
  },

  [Datatype.DECIMAL]: {
    value: Datatype.DECIMAL,
    label: "Decimal",
    description: "Data in Decimal format",
    icon: "fa fa-hashtag"
  },

  [Datatype.NUMERIC]: {
    value: Datatype.NUMERIC,
    label: "Numeric",
    description: "Data in Numeric format",
    icon: "fa fa-hashtag"
  },

  [Datatype.DATE]: {
    value: Datatype.DATE,
    label: "Date",
    description: "Calendar date, no time of day",
    icon: "far fa-calendar"
  },

  [Datatype.TIME]: {
    value: Datatype.TIME,
    label: "Time",
    description: "Time of day, no date",
    icon: "far fa-clock"
  },

  [Datatype.DATETIME]: {
    value: Datatype.DATETIME,
    label: "Datetime",
    description: "Event dates, deadlines, opening hours",
    icon: "far fa-calendar-alt"
  },

  [Datatype.TIMESTAMP]: {
    value: Datatype.TIMESTAMP,
    label: "Timestamp",
    description: "Data in Timestamp format",
    icon: "fa fa-hashtag"
  },

  [Datatype.BINARY]: {
    value: Datatype.BINARY,
    label: "Binary",
    description: "Data in Binary format",
    icon: "fa fa-hashtag"
  },

  [Datatype.JSON]: {
    value: Datatype.JSON,
    label: "JSON",
    description: "Data in JSON format",
    icon: "fa fa-code"
  },

  [Datatype.JSONB]: {
    value: Datatype.JSONB,
    label: "JSONB",
    description: "Data in JSONB format",
    icon: "fa fa-code"
  },

  [Datatype.OBJECT]: {
    value: Datatype.OBJECT,
    label: "Object",
    description: "Data in JSONB format",
    icon: "fa fa-code"
  },

  // // // //
  // Array Datatypes

  [Datatype.STRING_ARRAY]: {
    value: Datatype.STRING_ARRAY,
    label: "String Array",
    description: "An array of Strings",
    icon: "fa fa-tags"
  },

  [Datatype.TEXT_ARRAY]: {
    value: Datatype.TEXT_ARRAY,
    label: "Text Array",
    description: "An array of Text",
    icon: "fa fa-tags"
  },

  [Datatype.INTEGER_ARRAY]: {
    value: Datatype.INTEGER_ARRAY,
    label: "Integer Array",
    description: "An array of Integers",
    icon: "fa fa-tags"
  },

  [Datatype.BIGINT_ARRAY]: {
    value: Datatype.BIGINT_ARRAY,
    label: "BigInt Array",
    description: "An array of BigInts",
    icon: "fa fa-tags"
  },

  [Datatype.FLOAT_ARRAY]: {
    value: Datatype.FLOAT_ARRAY,
    label: "Float Array",
    description: "An array of Floats",
    icon: "fa fa-tags"
  },

  [Datatype.DECIMAL_ARRAY]: {
    value: Datatype.DECIMAL_ARRAY,
    label: "Decimal Array",
    description: "An array of Decimals",
    icon: "fa fa-tags"
  },

  [Datatype.NUMERIC_ARRAY]: {
    value: Datatype.NUMERIC_ARRAY,
    label: "Numeric Array",
    description: "An array of Numerics",
    icon: "fa fa-tags"
  },

  [Datatype.BOOLEAN_ARRAY]: {
    value: Datatype.BOOLEAN_ARRAY,
    label: "Boolean Array",
    description: "An array of Booleans",
    icon: "fa fa-tags"
  },

  [Datatype.DATE_ARRAY]: {
    value: Datatype.DATE_ARRAY,
    label: "Date Array",
    description: "An array of Dates",
    icon: "fa fa-tags"
  },

  [Datatype.TIME_ARRAY]: {
    value: Datatype.TIME_ARRAY,
    label: "Time Array",
    description: "An array of Times",
    icon: "fa fa-tags"
  },

  [Datatype.DATETIME_ARRAY]: {
    value: Datatype.DATETIME_ARRAY,
    label: "Datetime Array",
    description: "An array of Datetimes",
    icon: "fa fa-tags"
  },

  [Datatype.TIMESTAMP_ARRAY]: {
    value: Datatype.TIMESTAMP_ARRAY,
    label: "Timestamp Array",
    description: "An array of Timestamps",
    icon: "fa fa-tags"
  },

  // // // //
  // Special Datatypes
  [Datatype.SINGLE_FILE]: {
    value: Datatype.SINGLE_FILE,
    label: "File Upload",
    description: "Single file upload",
    icon: "fa fa-file"
  },

  [Datatype.SINGLE_IMAGE]: {
    value: Datatype.SINGLE_IMAGE,
    label: "Image Upload",
    description: "Single image upload",
    icon: "fa fa-image"
  },
};

