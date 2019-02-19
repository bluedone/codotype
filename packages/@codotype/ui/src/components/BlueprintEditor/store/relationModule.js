import modalModule from './modules/modalModule'
import selectModelModule from './modules/selectModelModule'
import collectionModule from '../../../store/lib/collectionModule'
import { DEFAULT_RELATION } from '@codotype/types/lib/default_relation'

export default {
  namespaced: true,
  actions: {
    newModel ({ commit }) {
      commit('collection/resetNewModel')
      commit('modals/new/showing', true)
    }
  },
  modules: {
    collection: Object.assign({}, collectionModule({ NEW_MODEL: DEFAULT_RELATION })),
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
