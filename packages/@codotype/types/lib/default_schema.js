
// Allowed values for SCHEMA.source property
const SCHEMA_SOURCE_USER = 'USER';
const SCHEMA_SOURCE_GENERATOR = 'GENERATOR';

const DEFAULT_SCHEMA = {
  id: null,
  order: 0,
  locked: false,
  source: SCHEMA_SOURCE_USER, // STRING - 'generator' | 'user'
  removable: true,
  label: '',
  label_plural: '',
  identifier: '',
  identifier_plural: '',
  class_name: '',
  class_name_plural: '',
  attributes: [],
  relations: [],
  reverse_relations: []
}

module.exports = {
  DEFAULT_SCHEMA,
  SCHEMA_SOURCE_USER,
  SCHEMA_SOURCE_GENERATOR
}
