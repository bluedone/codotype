const {
  DATATYPE_STRING,
  DATATYPE_TEXT,
  DATATYPE_STRING_SELECT,
  DATATYPE_STRING_ARRAY,
  DATATYPE_INTEGER,
  DATATYPE_FLOAT,
  DATATYPE_DOUBLE,
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
  desc: 'Short string of text with minimal formatting',
  icon: 'fa fa-quote-left'
}

DATATYPE_META[DATATYPE_TEXT] = {
  value: DATATYPE_TEXT,
  label: 'Text',
  desc: 'A body of text with formatting intact',
  icon: 'fa fa-quote-left'
}

DATATYPE_META[DATATYPE_STRING_ARRAY] = {
  value: DATATYPE_STRING_ARRAY,
  label: 'String Array',
  desc: 'DATATYPE_STRING_ARRAY Description Goes Here!',
  icon: 'fa fa-quote-left'
}

DATATYPE_META[DATATYPE_BOOLEAN] = {
  value: DATATYPE_BOOLEAN,
  label: 'Boolean',
  desc: 'A single true or false statement',
  icon: 'far fa-check-square'
}

DATATYPE_META[DATATYPE_INTEGER] = {
  value: DATATYPE_INTEGER,
  label: 'Integer',
  desc: 'A numeric datatype for whole numbers',
  icon: 'fa fa-hashtag'
}

DATATYPE_META[DATATYPE_FLOAT] = {
  value: DATATYPE_FLOAT,
  label: 'Float',
  desc: 'A numeric datatype with n points of precision',
  icon: 'fa fa-hashtag'
}

// DATATYPE_META[DATATYPE_DOUBLE] = {
//   value: DATATYPE_DOUBLE,
//   label: 'Double',
//   desc: 'A numeric datatype with n points of precision',
//   icon: 'fa fa-hashtag'
// }

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
  label: 'DateTime',
  desc: 'Represent dates and times',
  icon: 'far fa-calendar-alt'
}

// DATATYPE_META[DATATYPE_JSON] = {
//   value: DATATYPE_JSON,
//   label: 'JSON',
//   desc: 'DATATYPE_JSON Description Goes Here!',
//   icon: 'fa fa-code'
// }

module.exports = DATATYPE_META