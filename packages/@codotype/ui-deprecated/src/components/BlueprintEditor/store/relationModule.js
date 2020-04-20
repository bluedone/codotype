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
      // TODO - VERIFY UNIQUENESS OF RELATION TYPE + ALIAS
      // SHORT-TERM - skip `collection/insert` if not unique
      dispatch('collection/insert', model)
      dispatch('editor/schema/updateRelations', {}, { root:true })
    },
    updateModel ({ getters, commit, dispatch }) {
      const model = getters['form/model']
      // TODO - VERIFY UNIQUENESS OF RELATION TYPE + ALIAS
      // SHORT-TERM - skip `collection/insert` if not unique
      dispatch('collection/insert', model)
      dispatch('editor/schema/updateRelations', {}, { root:true })
    },
    destroyModel ({ getters, commit, dispatch }, modelId) {
      dispatch('collection/destroy', modelId)
      dispatch('editor/schema/updateRelations', {}, { root:true })
    },
  },
  getters: {
    disableSubmit: state => {
      // TODO - abstract into a util or types
      function validateRelation({ relation, relationCollection }) {
        let errors = []

        // TODO - inflate these relations first
        // relationCollection.forEach((rel) => {
        //   if (
        //     rel.schema_id === relation.schema_id &&
        //     (
        //       (rel.as === relation.as && !!rel.as) ||
        //       (rel.related_schema_id === relation.related_schema_id && rel.type === relation.type)
        //     )
        //   ) {
        //     errors.push('Already exists a conflicting relation between these two Schemas')
        //   }
        // })

        return errors
      }

      const errors = validateRelation({
        relation: state.form.model,
        relationCollection: state.collection.items
      })

      // console.log(errors)
      return !errors[0]
    }
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
