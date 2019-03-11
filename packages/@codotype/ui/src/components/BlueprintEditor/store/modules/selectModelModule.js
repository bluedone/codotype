// TODO - annotate the purpose and usage of this Vuex module
export default () => {
  return Object.assign({}, {
    namespaced: true,
    state: {
      id: null
    },
    getters: {
      id: state => state.id
    },
    mutations: {
      id (state, modelId) {
        state.id = modelId
      },
      reset (state) {
        state.id = null
      }
    }
  })
}
