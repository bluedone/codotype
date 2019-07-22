### v0.2.2 (UNPUBLISHED)

#### Fixes
* Cleaned up `datatype-meta.js`
* Added `locked`, and `source` properties to `DEFAULT_SCHEMA`
* Added `SCHEMA_SOURCE_GENERATOR` and `SCHEMA_SOURCE_GENERATOR` to `DEFAULT_SCHEMA`
* Renamed `option-group-types.js` to `configuration-group-types.js`
* Renamed `OPTION_GROUP_*` to `CONFIGURATION_GROUP_*`
* Deprecated old `OPTION_GROUP_TYPE_*` variables in favor of maintaining `type` and `scope` properties
* Added `CONFIGURATION_GROUP_TYPE_OPTION` and `CONFIGURATION_GROUP_TYPE_ADDON`
* Added `CONFIGURATION_GROUP_SCOPE_GLOBAL` and `CONFIGURATION_GROUP_SCOPE_SCHEMA`
* Added `configuration-option-types.js` to store types of attributes assigned to `ConfigurationGroups`
* Added the following datatypes and datatype meta:
  - `DATATYPE_BIGINT`
  - `DATATYPE_DECIMAL`
  - `DATATYPE_NUMERIC`
  - `DATATYPE_TIMESTAMP`
  - `DATATYPE_BINARY`
  - `DATATYPE_JSONB`
  - `DATATYPE_OBJECT`
  - `DATATYPE_TEXT_ARRAY`
  - `DATATYPE_INTEGER_ARRAY`
  - `DATATYPE_BIGINT_ARRAY`
  - `DATATYPE_FLOAT_ARRAY`
  - `DATATYPE_DECIMAL_ARRAY`
  - `DATATYPE_NUMERIC_ARRAY`
  - `DATATYPE_BOOLEAN_ARRAY`
  - `DATATYPE_DATE_ARRAY`
  - `DATATYPE_TIME_ARRAY`
  - `DATATYPE_DATETIME_ARRAY`
  - `DATATYPE_TIMESTAMP_ARRAY`
  - `DATATYPE_SINGLE_FILE`
  - `DATATYPE_SINGLE_IMAGE`

---

### v0.2.1

#### Fixes
* Typo fixed in `datatype-meta.js`
* Cleaned up formatting in `relation-meta.js`

---

### v0.2.0

#### Features
* Improved iconography and descriptions for datatypes

#### Deprecations
* Deprecated `DATATYPE_DOUBLE` type - merged functionality with `DATATYPE_FLOAT`

---

### v0.1.1

#### Features
* Added basic testing infrastructure with Mocha, Chai, & NYC

---

### v0.1.0

#### Features
* Added `@codotype/types` module
