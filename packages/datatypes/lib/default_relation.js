// Relation constants
// QUESTION - add schema_id to this type?
const DEFAULT_RELATION = {
  id: null,
  order: 0,
  type: 'BELONGS_TO', // Moved from datatypeOptions.relationType
  required: false,
  related_schema_id: '',
  reverse_relation_id: '',
  as: '', // TODO - rename 'as' to something else?
  reverse_as: '' // TODO - rename 'reverse_as' to something else?
}

module.exports = {
  DEFAULT_RELATION
}
