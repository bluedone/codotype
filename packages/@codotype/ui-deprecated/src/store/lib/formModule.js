// TODO - annotate the purpose and usage of this Vuex module
export default function ({ NEW_MODEL }) {

  return {
    namespaced: true,
    state: {
      defaultModel: Object.assign({}, NEW_MODEL),
      model: Object.assign({}, NEW_MODEL)
    },
    mutations: {
      defaultModel (state, defaultModel) {
        state.defaultModel = Object.assign({}, defaultModel)
      },
      reset (state) {
        state.model = Object.assign({}, state.defaultModel)
      },
      modelAttr (state, { attribute, value }) {
        state.model[attribute.identifier] = value
      },
      model (state, model) {
        state.model = Object.assign({}, model)
      }
    },
    getters: {
      model (state) {
        return state.model
      },
      modelAttr: state => ({ attribute }) => {
        return state.model[attribute.identifier]
      }
    },
    actions: {
      validate () {}
    }
  }

}
