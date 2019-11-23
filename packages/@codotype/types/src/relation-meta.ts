import { RelationType } from ".";

export const RELATION_META = {};

RELATION_META[RelationType.BELONGS_TO] = {
  id: RelationType.BELONGS_TO,
  // label: 'Many To One',
  // description: 'Many reference One'
  label: "Belongs To",
  description: "Many reference One"
};

RELATION_META[RelationType.HAS_ONE] = {
  id: RelationType.HAS_ONE,
  // label: 'One references One',
  // description: 'One'
  label: "Has One",
  description: "One references One"
};

RELATION_META[RelationType.HAS_MANY] = {
  id: RelationType.HAS_MANY,
  // label: 'One To Many',
  // description: 'One references Many'
  label: "Has Many",
  description: "One references Many"
};

RELATION_META[RelationType.HAS_AND_BELONGS_TO_MANY] = {
  id: RelationType.HAS_AND_BELONGS_TO_MANY,
  label: "Has and Belongs To Many",
  description: "Many reference Many"
};

RELATION_META[RelationType.TO_ONE] = {
  id: RelationType.TO_ONE,
  label: "To One",
  description: "One reference one"
};

RELATION_META[RelationType.TO_MANY] = {
  id: RelationType.TO_MANY,
  label: "To Many",
  description: "One references Many"
};

