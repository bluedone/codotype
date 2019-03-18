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
DATATYPE_META[DATATYPE_STRING] = { value: DATATYPE_STRING, text: 'String', icon: 'fa fa-quote-left' },
DATATYPE_META[DATATYPE_TEXT] = { value: DATATYPE_TEXT, text: 'Text', icon: 'fa fa-quote-left' },
DATATYPE_META[DATATYPE_STRING_ARRAY] = { value: DATATYPE_STRING_ARRAY, text: 'String Array', icon: 'fa fa-quote-left' },

DATATYPE_META[DATATYPE_BOOLEAN] = { value: DATATYPE_BOOLEAN, text: 'Boolean', icon: 'far fa-check-square' },

DATATYPE_META[DATATYPE_INTEGER] = { value: DATATYPE_INTEGER, text: 'Integer', icon: 'fa fa-hashtag' },
DATATYPE_META[DATATYPE_FLOAT] = { value: DATATYPE_FLOAT, text: 'Float', icon: 'fa fa-hashtag' },
DATATYPE_META[DATATYPE_DOUBLE] = { value: DATATYPE_DOUBLE, text: 'Double', icon: 'fa fa-hashtag' },

DATATYPE_META[DATATYPE_DATE] = { value: DATATYPE_DATE, text: 'Date', icon: 'far fa-calendar' },
DATATYPE_META[DATATYPE_TIME] = { value: DATATYPE_TIME, text: 'Time', icon: 'far fa-clock' },
DATATYPE_META[DATATYPE_DATETIME] = { value: DATATYPE_DATETIME, text: 'DateTime', icon: 'far fa-calendar-alt' },

DATATYPE_META[DATATYPE_JSON] = { value: DATATYPE_JSON, text: 'JSON', icon: 'fa fa-code' }

module.exports = DATATYPE_META