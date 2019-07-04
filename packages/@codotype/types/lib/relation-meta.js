const {
  RELATION_TYPE_BELONGS_TO,
  RELATION_TYPE_HAS_ONE,
  RELATION_TYPE_HAS_MANY,
  RELATION_TYPE_HAS_AND_BELONGS_TO_MANY
} = require('./relation-types')

const RELATION_META = {}

RELATION_META[RELATION_TYPE_BELONGS_TO] = {
  id: RELATION_TYPE_BELONGS_TO,
  // label: 'Many To One',
  // description: 'Many reference One'
  label: 'Belongs To',
  description: 'Many reference One'
}

RELATION_META[RELATION_TYPE_HAS_ONE] = {
  id: RELATION_TYPE_HAS_ONE,
  // label: 'One references One',
  // description: 'One'
  label: 'Has One',
  description: 'One references One'
}

RELATION_META[RELATION_TYPE_HAS_MANY] = {
  id: RELATION_TYPE_HAS_MANY,
  // label: 'One To Many',
  // description: 'One references Many'
  label: 'Has Many',
  description: 'One references Many'
}

RELATION_META[RELATION_TYPE_HAS_AND_BELONGS_TO_MANY] = {
  id: RELATION_TYPE_HAS_AND_BELONGS_TO_MANY,
  label: 'Has and Belongs To Many',
  description: 'Many reference Many'
}

module.exports = RELATION_META
