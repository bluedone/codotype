const {
  DATATYPE_STRING,
  DATATYPE_TEXT,
  DATATYPE_STRING_SELECT,
  DATATYPE_STRING_ARRAY,
  DATATYPE_INTEGER,
  DATATYPE_FLOAT,
  DATATYPE_BOOLEAN,
  DATATYPE_DATE,
  DATATYPE_TIME,
  DATATYPE_DATETIME,
  DATATYPE_JSON
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

DATATYPE_META[DATATYPE_STRING_ARRAY] = {
  value: DATATYPE_STRING_ARRAY,
  label: 'Tags',
  desc: 'An array of text tags',
  icon: 'fa fa-tags'
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

DATATYPE_META[DATATYPE_FLOAT] = {
  value: DATATYPE_FLOAT,
  label: 'Float',
  desc: 'Numbers with decimals',
  icon: 'fa fa-divide'
}

// DATATYPE_META[DATATYPE_DATE] = {
//   value: DATATYPE_DATE,
//   label: 'Date',
//   desc: 'DATATYPE_DATE Description Goes Here!',
//   icon: 'far fa-calendar'
// }

// DATATYPE_META[DATATYPE_TIME] = {
//   value: DATATYPE_TIME,
//   label: 'Time',
//   desc: 'DATATYPE_TIME Description Goes Here!',
//   icon: 'far fa-clock'
// }

DATATYPE_META[DATATYPE_DATETIME] = {
  value: DATATYPE_DATETIME,
  label: 'Datetime',
  desc: 'Event dates, deadlines, opening hours',
  icon: 'far fa-calendar-alt'
}

DATATYPE_META[DATATYPE_JSON] = {
  value: DATATYPE_JSON,
  label: 'JSON',
  desc: 'Data in JSON format',
  icon: 'fa fa-code'
}

module.exports = DATATYPE_META