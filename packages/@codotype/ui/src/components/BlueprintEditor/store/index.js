import schemaModule from './schemaModule'
import projectModule from './projectModule'
import helpModule from './helpModule'
import modalModule from '../../../store/lib/modalModule'
import { DEFAULT_USER_SCHEMA } from '@codotype/types/lib/default_user'
const DownloadFile = require('downloadjs')

export default {
  namespaced: true,
  actions: {
    created ({ getters, commit, dispatch }) {
      // if (!getters['schema/collection/first']) {
      //   commit('schema/collection/items', [Object.assign({}, DEFAULT_USER_SCHEMA)])
      // }
      // dispatch('schema/selectModel', getters['schema/collection/first'])
    },
    reset ({ getters, commit, dispatch }) {
      dispatch('project/reset')
      // TODO - pull default schemas here from generator
      // commit('schema/collection/items', [Object.assign({}, DEFAULT_USER_SCHEMA)])
      commit('schema/collection/items', [])
      dispatch('schema/selectModel', getters['schema/collection/first'])
    },
    import ({ getters, commit, dispatch }, blueprint) {
      commit('project/label', blueprint.label)
      commit('project/identifier', blueprint.identifier)
      commit('project/class_name', blueprint.class_name)
      commit('schema/collection/items', blueprint.schemas)
      dispatch('schema/selectModel', getters['schema/collection/first'])
    },
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
        schemas: state.schema.collection.items.filter(s => s.attributes.length > 0 || s.relations.length > 0)
      }
    }
  },
  modules: {
    schema: schemaModule,
    project: projectModule,
    help: helpModule,
    modals: {
      namespaced: true,
      modules: {
        import: modalModule(),
        export: modalModule(),
      }
    }
  }
}
