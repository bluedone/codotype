import sanitizeLabel from '@codotype/util/lib/sanitizeLabel'
import { inflateMeta } from '@codotype/util/lib/inflateMeta'

// TODO - this module should implement some basic validation & error handling
// TODO - module-specific errors should be handled in a dedicated sub-module
export default {
  namespaced: true,
  state: {
    label: '',
    identifier: ''
  },
  actions: {
    setLabel ({ commit }, label) {
      const sanitizedLabel = sanitizeLabel(label)
      const { identifier } = inflateMeta(sanitizedLabel)
      commit('label', sanitizedLabel)
      commit('identifier', identifier)
    },
    reset ({ commit }) {
      commit('label', '')
      commit('identifier', '')
    }
  },
  mutations: {
    label (state, label) {
      state.label = label
    },
    identifier (state, identifier) {
      state.identifier = identifier
    }
  },
  getters: {
    label: state => {
      return state.label
    },
    identifier: state => {
      return state.identifier
    },
    enableSubmit: state => {
      return state.label && state.identifier && state.label.length > 2
    }
  }
}
