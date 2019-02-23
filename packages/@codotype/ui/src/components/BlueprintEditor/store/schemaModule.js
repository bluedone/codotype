import { inflateMeta } from '@codotype/util/lib/inflateMeta'
import { sanitizeLabel } from '@codotype/util/lib/sanitizeLabel'
import { NEW_SCHEMA_MODEL } from '@codotype/types/lib/default_schema'
import formModule from '../../../store/lib/formModule'
import modalModule from '../../../store/lib/modalModule'
import collectionModule from '../../../store/lib/collectionModule'
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
    newModel ({ commit }) {
      commit('form/reset')
      commit('modals/new/showing', true)
    },
    editModel ({ commit, getters }) {
      commit('form/model', getters['selectedModel'])
      commit('modals/edit/showing', true)
    },
    createModel ({ getters, commit, dispatch }) {
      const model = getters['form/model']
      dispatch('collection/insert', model)
      dispatch('selectModel', getters['collection/last'])
    },
    updateModel ({ getters, commit, dispatch }) {
      const model = getters['form/model']
      dispatch('collection/insert', model)
    },
    destroyModel ({ getters, dispatch }, model) {
      dispatch('selectModel', getters['collection/first'])
      dispatch('collection/destroy', model.id)
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
    },
    setLabel ({ getters, commit }, label) {
      let model = getters['form/model']

      // Replaces all non letter & whitespace characters
      // Replaces all chains of whitespace to a single space each
      const sanitizedLabel = sanitizeLabel(label)

      // Gets metadata from the trimmed sanitizedLabel
      const metadata = inflateMeta(sanitizedLabel.trim())

      // Assigns metadata to model
      metadata.label = sanitizedLabel
      model = Object.assign(model, metadata)
      commit('form/model', model)
    }
  },
  getters: {
    selectedModel: state => {
      return state.collection.items.find(i => i.id === state.selectedModel.id)
    }
  },
  modules: {
    form: formModule({ NEW_MODEL: NEW_SCHEMA_MODEL }),
    collection: collectionModule({ NEW_MODEL: NEW_SCHEMA_MODEL }), // TODO - refactor collectionModule
    selectedModel: selectModelModule(),
    attribute: attributeModule,
    relation: relationModule,
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
