export default () => {

  return Object.assign({}, {
    namespaced: true,
    state: {
      items: []
    },
    mutations: {
      items (state, items) {
        state.items = items
      }
    },
    getters: {
      items: state => {
        return state.items
      }
    }
  })
}
