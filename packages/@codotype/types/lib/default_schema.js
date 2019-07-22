const DEFAULT_SCHEMA = {
  id: null,
  order: 0,
  locked: false,
  source: "", // STRING - 'generator' | 'user'
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

// Allowed values for SCHEMA.source property
const SCHEMA_SOURCE_USER = 'USER';
const SCHEMA_SOURCE_GENERATOR = 'GENERATOR';

module.exports = {
  DEFAULT_SCHEMA,
  SCHEMA_SOURCE_USER,
  SCHEMA_SOURCE_GENERATOR
}
