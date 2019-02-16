const buildDefault = ({ attributes }) => {
  const defaultState = {}
  attributes.forEach((attr) => {
    defaultState[attr.identifier] = attr.default_value
  })
  return defaultState
}

module.exports = buildDefault
