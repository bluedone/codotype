import { inflateMeta } from '@codotype/util/lib/inflateMeta'
import { sanitizeLabel } from '@codotype/util/lib/sanitizeLabel'
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
    newModel ({ commit }, model) {
      commit('collection/resetNewModel')
      commit('modals/form/showing', true)
    },
    createModel ({ getters, commit, dispatch }, model) {
      commit('collection/newModel', model)
      dispatch('collection/create')
      dispatch('selectModel', getters['collection/last'])
    },
    // TODO - implement top-level update method
    // update ({ state, commit }, schema) {
    //   let collection = state.collection.map((s) => {
    //     if (s._id === schema._id) {
    //       s.label = schema.label // TODO - titleize
    //       s.label_plural = schema.label_plural
    //       s.identifier = schema.identifier
    //       s.identifier_plural = schema.identifier_plural
    //       s.class_name = schema.class_name
    //       s.class_name_plural = schema.class_name_plural
    //     }
    //     return s
    //   })
    //   return commit('collection', collection)
    // },
    destroyModel ({ getters, dispatch }, model) {
      dispatch('selectModel', getters['collection/first'])
      dispatch('collection/destroy', model.id)
    },
    setLabel ({ getters, commit }, label) {
      let newModel = getters['collection/newModel']

      // Replaces all non letter & whitespace characters
      // Replaces all chains of whitespace to a single space each
      const sanitizedLabel = sanitizeLabel(label)

      // Gets metadata from the trimmed sanitizedLabel
      const metadata = inflateMeta(sanitizedLabel.trim())

      // Assigns metadata to newModel
      metadata.label = sanitizedLabel
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
