import collectionModule from '../../../store/lib/collectionModule'

const PROJECT_STEP = {
  id: 'getting_started',
  label: 'New Project'
}

const BLUEPRINT_STEP = {
  id: 'blueprint_step',
  label: 'Define Schemas'
}

const CONFIGURATION_STEP = {
  id: 'configure_step',
  label: 'Configure Generator'
}

// TODO - clean up the rest of this vuex module
export default {
  namespaced: true,
  state: {
    current: 0
  },
  mutations: {
    current (state, current) {
      state.current = current
    }
  },
  getters: {
    current (state) {
      return state.current
    },
    selectedStep (state) {
      return state.collection.items[state.current]
    }
  },
  actions: {
    load ({ commit }, generator) {
      // Defines default base steps
      const steps = [PROJECT_STEP]

      // Include BLUEPRINT_STEP iff generator is NOT self-configuring
      if (!generator.self_configuring) { steps.push(BLUEPRINT_STEP) }

      // Include CONFIGURATION_STEP iff generator has any defined option groups
      if (generator.option_groups[0]) { steps.push(CONFIGURATION_STEP) }

      // QUESTION - what happens if there's a generator that's self-configuring, with no option_groups?

      // Updates the nested collection module
      return commit('collection/items', steps)
    },
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
    collection: collectionModule({ NEW_MODEL: {} }) // TODO - update collectionModule
  }
}
