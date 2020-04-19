import sanitizeLabel from '@codotype/util/lib/sanitizeLabel'
import inflateMeta from '@codotype/util/lib/inflateMeta'
import modalModule from '../../../store/lib/modalModule'
import selectModelModule from './modules/selectModelModule'
import formModule from '../../../store/lib/formModule'
import collectionModule from '../../../store/lib/collectionModule'
import { DEFAULT_ATTRIBUTE } from '@codotype/types/lib/default_attribute'

export default {
  namespaced: true,
  actions: {
    newModel ({ commit }) {
      commit('form/reset')
      commit('modals/new/showing', true)
    },
    editModel ({ commit }, model) {
      commit('form/model', model)
      commit('modals/edit/showing', true)
    },
    createModel ({ getters, commit, dispatch }) {
      const model = getters['form/model']
      dispatch('collection/insert', model)
      dispatch('editor/schema/updateAttributes', {}, { root:true })
    },
    updateModel ({ getters, commit, dispatch }) {
      const model = getters['form/model']
      dispatch('collection/insert', model)
      dispatch('editor/schema/updateAttributes', {}, { root:true })
    },
    destroyModel ({ getters, commit, dispatch }, modelId) {
      dispatch('collection/destroy', modelId)
      dispatch('editor/schema/updateAttributes', {}, { root:true })
    },
    setLabel ({ getters, commit }, label) {
      const model = getters['form/model']
      const sanitizedLabel = sanitizeLabel(label)
      const { identifier } = inflateMeta(sanitizedLabel)

      // Assigns the new label & identifier values
      model.label = sanitizedLabel
      model.identifier = identifier
      commit('form/model', model)
    }
  },
  getters: {
    formErrors: state => {
      const errors = []
      if (!state.form.model.label) {
        errors.push('Label property is not defined')
      }
      if (!state.form.model.identifier) {
        errors.push('Identifier property is not defined')
      }
      if (!state.form.model.datatype) {
        errors.push('Datatype is not defined')
      }
      if (!state.collection.items.filter(a => a.id !== state.form.model.id).map(a => a.label).includes(state.form.model.label)) {
        errors.push('Label property is not unique')
      }
      if (!state.collection.items.filter(a => a.id !== state.form.model.id).map(a => a.identifier).includes(state.form.model.identifier)) {
        errors.push('Identifier property is not unique')
      }
      return errors;
    },
    enableSubmit: state => {
      return state.form.model.label
        && state.form.model.identifier
        && state.form.model.datatype
        && !state.collection.items.filter(a => a.id !== state.form.model.id).map(a => a.label).includes(state.form.model.label)
        && !state.collection.items.filter(a => a.id !== state.form.model.id).map(a => a.identifier).includes(state.form.model.identifier)
    }
  },
  modules: {
    form: formModule({ NEW_MODEL: DEFAULT_ATTRIBUTE }),
    collection: collectionModule({ NEW_MODEL: DEFAULT_ATTRIBUTE }), // TODO - update collection module
    selectedModel: selectModelModule(),
    modals: {
      namespaced: true,
      modules: {
        new: modalModule(),
        edit: modalModule(),
        destroy: modalModule()
      }
    }
  }
}
