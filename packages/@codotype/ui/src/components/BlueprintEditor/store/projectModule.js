import sanitizeLabel from '@codotype/util/lib/sanitizeLabel'
import inflateMeta from '@codotype/util/lib/inflateMeta'

export default {
  namespaced: true,
  state: {
    label: '',
    identifier: '',
    class_name: ''
  },
  actions: {
    setLabel ({ commit }, label) {
      const sanitizedLabel = sanitizeLabel(label)
      const { identifier, class_name } = inflateMeta(sanitizedLabel)
      commit('label', sanitizedLabel)
      commit('identifier', identifier)
      commit('class_name', class_name)
    },
    reset ({ commit }) {
      commit('label', '')
      commit('identifier', '')
      commit('class_name', '')
    }
  },
  mutations: {
    label (state, label) {
      state.label = label
    },
    identifier (state, identifier) {
      state.identifier = identifier
    },
    class_name (state, class_name) {
      state.class_name = class_name
    }
  },
  getters: {
    label: state => {
      return state.label
    },
    identifier: state => {
      return state.identifier
    },
    class_name: state => {
      return state.class_name
    },
    enableSubmit: state => {
      return state.identifier !== "" && state.identifier !== "" && state.label.length > 2
    }
  }
}
