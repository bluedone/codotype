import { sanitizeLabel } from '@codotype/util/lib/sanitizeLabel'
import { inflateMeta } from '@codotype/util/lib/inflateMeta'

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
    }
  }
}
