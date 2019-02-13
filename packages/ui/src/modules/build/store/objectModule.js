export default ({ defaultState }) => {

  return Object.assign({}, {
    namespaced: true,
    state: Object.assign({}, defaultState) || {},
    mutations: {
      value (state, { attr, value }) {
        // TODO - validate here??
        // NOTE - it might make the most sense to use dynamic modules to create the scaffold for the OPTION_GROUPS,
        // and use a top-down flux-y pattern to actually update those individual values
        // i.e. this value function is only invoked from the editorModule at the top-level,
        // after everything has been validated
        state[attr] = value
      }
    },
    getters: {
      valueOf: state => attr_id => {
        return state[attr_id]
      },
      toObj: state => {
        return state
      }
    }
  })
}
