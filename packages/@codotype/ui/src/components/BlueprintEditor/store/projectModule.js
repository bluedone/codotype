import sanitizeLabel from '@codotype/util/lib/sanitizeLabel'
import inflateMeta from '@codotype/util/lib/inflateMeta'
import modalModule from '../../../store/lib/modalModule'

export default {
  namespaced: true,
  state: {
    editLabel: '',
    editIdentifier: '',
    label: 'Project Name',
    identifier: 'project_name',
    class_name: 'ProjectName'
  },
  actions: {
    edit ({ state, commit, dispatch }) {
      dispatch('setEditLabel', state.label)
      commit('modals/form/showing', true)
    },
    submitForm ({ state, commit, dispatch }) {
      dispatch('setLabel', state.editLabel)
      commit('modals/form/showing', false)
    },
    setEditLabel ({ commit }, label) {
      const sanitizedLabel = sanitizeLabel(label)
      const { identifier } = inflateMeta(sanitizedLabel)
      commit('editLabel', sanitizedLabel)
      commit('editIdentifier', identifier)
    },
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
    editLabel (state, label) {
      state.editLabel = label
    },
    editIdentifier (state, identifier) {
      state.editIdentifier = identifier
    },
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
    editLabel: state => {
      return state.editLabel
    },
    editIdentifier: state => {
      return state.editIdentifier
    },
    label: state => {
      return state.label
    },
    identifier: state => {
      return state.identifier
    },
    class_name: state => {
      return state.class_name
    },
    disableSubmit: state => {
      return state.editIdentifier === "" || state.editIdentifier === "" || state.editLabel.length < 2
    }
  },
  modules: {
    modals: {
      namespaced: true,
      modules: {
        form: modalModule(),
      }
    }
  }
}
