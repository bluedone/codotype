export default {
  namespaced: true,
  state: {
    showing: false
  },
  mutations: {
    showing (state, showing) {
      console.log('SHOWING?', showing)
      state.showing = showing
    }
  },
  getters: {
    showing: state => {
      return state.showing
    }
  }
}
