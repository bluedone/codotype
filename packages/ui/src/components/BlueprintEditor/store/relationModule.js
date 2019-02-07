import modalModule from './modules/modalModule'
import collectionModule from './modules/collectionModule'
import { DEFAULT_RELATION } from '@codotype/types/lib/default_relation'

export default {
  namespaced: true,
  actions: {
    newRelation ({ commit }) {
      commit('collection/resetNewModel')
      commit('modals/form/showing', true)
    }
  },
  modules: {
    collection: Object.assign({}, collectionModule({ NEW_MODEL: DEFAULT_RELATION })),
    modals: {
      namespaced: true,
      modules: {
        form: Object.assign({}, modalModule),
        destroy: Object.assign({}, modalModule)
      }
    }
  }
}
