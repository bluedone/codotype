import schemaModule from './schemaModule'
import projectModule from './projectModule'
import helpModule from './helpModule'
import { DEFAULT_USER_SCHEMA } from '@codotype/types/lib/default_user'
const DownloadFile = require('downloadjs')

export default {
  namespaced: true,
  actions: {
    created ({ getters, commit, dispatch }) {
      if (!getters['schema/collection/first']) {
        commit('schema/collection/items', [Object.assign({}, DEFAULT_USER_SCHEMA)])
      }
      dispatch('schema/selectModel', getters['schema/collection/first'])
    },
    reset ({ getters, commit, dispatch }) {
      dispatch('project/reset')
      commit('schema/collection/items', [Object.assign({}, DEFAULT_USER_SCHEMA)])
      dispatch('schema/selectModel', getters['schema/collection/first'])
    },
    // TODO - implement import/export blueprint functionality here
    // importBlueprint () {},
    export ({ getters }) {
      const blueprint = getters['blueprint']
      DownloadFile(JSON.stringify(blueprint, null, 2), `${blueprint.identifier}-codotype.json`, 'application/json')
    }
  },
  getters: {
    blueprint: state => {
      return {
        label: state.project.label || 'Project Name',
        identifier: state.project.identifier || 'project_name',
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
