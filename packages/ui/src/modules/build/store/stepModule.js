import collectionModule from '../../../store/lib/collectionModule'

// TODO - clean up the rest of this vuex module
export default {
  namespaced: true,
  state: {
    current: 0
  },
  actions: {
    selectGenerator ({}, generator) {
      // TODO - implement BuildStep factory logic
      // PROJECT STEP ALWAYS PRESENT
      // if generator.self_configuring ----> NO SCHEMA EDITOR STEP
      // if NOT generator.option_groups[0] ----> NO GENERATOR CONFIGURATION STEP
      // QUESTION - what happens if there's a generator that's self-configuring, with no option_groups?
    }
  },
  mutations: {
    current (state, current) {
      state.current = current
    }
  },
  getters: {
    current (state) {
      return state.current
    }
  },
  actions: {
    reset ({ state, commit }) {
      commit('current', 0)
    },
    increment ({ state, commit }) {
      commit('current', Math.min(state.current + 1, 3))
    },
    decrement ({ state, commit }) {
      commit('current', Math.max(state.current - 1, 0))
    },
    jumpTo ({ state, commit }, step) {
      commit('current', step)
    }
  },
  modules: {
    // TODO - complete implementation of step/collection module
    collection: Object.assign({}, collectionModule({ NEW_MODEL: {} }))
  }
}
