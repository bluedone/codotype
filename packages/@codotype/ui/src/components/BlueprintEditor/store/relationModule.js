import modalModule from '../../../store/lib/modalModule'
import formModule from '../../../store/lib/formModule'
import selectModelModule from './modules/selectModelModule'
import collectionModule from '../../../store/lib/collectionModule'
import { DEFAULT_RELATION } from '@codotype/types/lib/default_relation'

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
      dispatch('editor/schema/updateRelations', {}, { root:true })
    },
    updateModel ({ getters, commit, dispatch }) {
      const model = getters['form/model']
      dispatch('collection/insert', model)
      dispatch('editor/schema/updateRelations', {}, { root:true })
    },
    destroyModel ({ getters, commit, dispatch }, modelId) {
      dispatch('collection/destroy', modelId)
      dispatch('editor/schema/updateRelations', {}, { root:true })
    },
  },
  modules: {
    form: formModule({ NEW_MODEL: DEFAULT_RELATION }),
    collection: collectionModule({ NEW_MODEL: DEFAULT_RELATION }),
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
