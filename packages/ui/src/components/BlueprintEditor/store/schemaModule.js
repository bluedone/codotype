import { inflateMeta } from '@codotype/util/lib/inflateMeta'
import { NEW_SCHEMA_MODEL } from '@codotype/types/lib/default_schema'
import formModule from './modules/formModule'
import modalModule from './modules/modalModule'
import collectionModule from './modules/collectionModule'
import selectModelModule from './modules/selectModelModule'
import attributeModule from './attributeModule'
import relationModule from './relationModule'

export default {
  namespaced: true,
  actions: {
    selectModel ({ commit }, model) {
      commit('selectedModel/id', model.id)
      commit('attribute/collection/items', model.attributes)
      commit('relation/collection/items', model.relations)
    },
    destroyModel ({ getters, dispatch }, model) {
      dispatch('selectModel', getters['collection/first'])
      dispatch('collection/destroy', model.id)
    },
    setLabel ({ getters, commit }, label) {
      let newModel = getters['collection/newModel']

      const metadata = inflateMeta(label)
      metadata.label = label // TODO - titleize label attribute

      newModel = Object.assign(newModel, metadata)
      commit('collection/newModel', newModel)
    },
    updateAttributes ({ state, getters, dispatch }) {
      const model = getters['selectedModel']
      model.attributes = state.attribute.collection.items
      dispatch('collection/insert', model)
    },
    updateRelations ({ state, getters, dispatch }) {
      const model = getters['selectedModel']
      model.relations = state.relation.collection.items
      dispatch('collection/insert', model)
    }
  },
  getters: {
    selectedModel: state => {
      return state.collection.items.find(i => i.id === state.selectedModel.id)
    }
  },
  modules: {
    collection: Object.assign({}, collectionModule({ NEW_MODEL: NEW_SCHEMA_MODEL })),
    selectedModel: Object.assign({}, selectModelModule),
    destroy_modal: Object.assign({}, modalModule),
    attribute: attributeModule,
    relation: relationModule,
    modals: {
      namespaced: true,
      modules: {
        form: Object.assign({}, modalModule),
        destroy: Object.assign({}, modalModule)
      }
    }
  }
}
