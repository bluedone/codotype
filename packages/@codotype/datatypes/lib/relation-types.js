const RELATION_TYPE_BELONGS_TO = 'BELONGS_TO'
const RELATION_TYPE_HAS_ONE = 'HAS_ONE'
const RELATION_TYPE_HAS_MANY = 'HAS_MANY'

const RELATION_TYPES = {}
RELATION_TYPES[RELATION_TYPE_BELONGS_TO] = { id: RELATION_TYPE_BELONGS_TO, label: 'Many To One', description: 'A two-way association to a single model' },
RELATION_TYPES[RELATION_TYPE_HAS_ONE] = { id: RELATION_TYPE_HAS_ONE, label: 'One To One', description: 'A one-way association to a single model' },
RELATION_TYPES[RELATION_TYPE_HAS_MANY] = { id: RELATION_TYPE_HAS_MANY, label: 'One To Many', description: 'A one-way association to many models' }

module.exports = {
 RELATION_TYPE_BELONGS_TO,
 RELATION_TYPE_HAS_ONE,
 RELATION_TYPE_HAS_MANY,
 RELATION_TYPES
}