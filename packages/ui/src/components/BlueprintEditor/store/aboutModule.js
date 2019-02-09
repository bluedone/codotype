export default {
  namespaced: true,
  state: {
    showing: false
  },
  mutations: {
    showing (state, showing) {
      state.showing = showing
    }
  },
  getters: {
    showing: state => {
      return state.showing
    }
  }
}
