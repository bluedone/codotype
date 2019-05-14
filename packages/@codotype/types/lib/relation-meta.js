const {
  RELATION_TYPE_BELONGS_TO,
  RELATION_TYPE_HAS_ONE,
  RELATION_TYPE_HAS_MANY
} = require('./relation-types')

const RELATION_META = {}

RELATION_META[RELATION_TYPE_BELONGS_TO] = {
  id: RELATION_TYPE_BELONGS_TO,
  label: 'Many To One',
  description: 'Many reference One'
}

RELATION_META[RELATION_TYPE_HAS_ONE] = {
  id: RELATION_TYPE_HAS_ONE,
  label: 'One references One',
  description: 'One'
}

RELATION_META[RELATION_TYPE_HAS_MANY] = {
  id: RELATION_TYPE_HAS_MANY,
  label: 'One To Many',
  description: 'One references Many'
}

module.exports = RELATION_META
