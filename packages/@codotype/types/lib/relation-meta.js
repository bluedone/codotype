const {
  RELATION_TYPE_BELONGS_TO,
  RELATION_TYPE_HAS_ONE,
  RELATION_TYPE_HAS_MANY
} = require('./relation-types')

const RELATION_META = {}
RELATION_META[RELATION_TYPE_BELONGS_TO] = { id: RELATION_TYPE_BELONGS_TO, label: 'Many To One', description: 'A two-way association to a single model' },
RELATION_META[RELATION_TYPE_HAS_ONE] = { id: RELATION_TYPE_HAS_ONE, label: 'One To One', description: 'A one-way association to a single model' },
RELATION_META[RELATION_TYPE_HAS_MANY] = { id: RELATION_TYPE_HAS_MANY, label: 'One To Many', description: 'A one-way association to many models' }

module.exports = RELATION_META
