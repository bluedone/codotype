import { sanitizeLabel } from '@codotype/util/lib/sanitizeLabel'
import { inflateMeta } from '@codotype/util/lib/inflateMeta'
import modalModule from './modules/modalModule'
import collectionModule from '../../../store/lib/collectionModule'
import { DEFAULT_ATTRIBUTE } from '@codotype/types/lib/default_attribute'

export default {
  namespaced: true,
  actions: {
    newModel ({ commit }) {
      commit('collection/resetNewModel')
      commit('modals/new/showing', true)
    },
    setLabel ({ getters, commit }, label) {
      const newModel = getters['collection/newModel']
      const sanitizedLabel = sanitizeLabel(label)
      const { identifier } = inflateMeta(sanitizedLabel)

      // Assigns the new label & identifier values
      newModel.label = sanitizedLabel
      newModel.identifier = identifier
      commit('collection/newModel', newModel)
    }
  },
  modules: {
    collection: Object.assign({}, collectionModule({ NEW_MODEL: DEFAULT_ATTRIBUTE })),
    modals: {
      namespaced: true,
      modules: {
        new: Object.assign({}, modalModule),
        edit: Object.assign({}, modalModule),
        destroy: Object.assign({}, modalModule)
      }
    }
  }
}
