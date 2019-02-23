import schemaModule from './schemaModule'
import projectModule from './projectModule'
import helpModule from './helpModule'
import { DEFAULT_USER_SCHEMA } from '@codotype/types/lib/default_user'

export default {
  namespaced: true,
  actions: {
    // TODO - implement import/export blueprint functionality here
    // importBlueprint () {},
    // exportBlueprint () {},
    created ({ getters, commit, dispatch }) {
      if (!getters['schema/collection/first']) {
        commit('schema/collection/items', [Object.assign({}, DEFAULT_USER_SCHEMA)])
      }
      dispatch('schema/selectModel', getters['schema/collection/first'])
    },
    reset ({ getters, commit, dispatch }) {
      commit('schema/collection/items', [Object.assign({}, DEFAULT_USER_SCHEMA)])
      dispatch('schema/selectModel', getters['schema/collection/first'])
    }
  },
  getters: {
    blueprint: state => {
      return {
        label: state.project.label,
        identifier: state.project.identifier,
        schemas: state.schema.collection.items
      }
    }
  },
  modules: {
    schema: schemaModule,
    project: projectModule,
    help: helpModule
  }
}
