import schemaModule from './schemaModule'
import projectModule from './projectModule'
import helpModule from './helpModule'
import modalModule from '../../../store/lib/modalModule'
const DownloadFile = require('downloadjs')

export default {
  namespaced: true,
  actions: {
    created ({ getters, commit, dispatch }) {
      // TODO - this should be combined with the logic in the ConfigurationEditor store
      // These two modules should be combined into the (upcoming) ProjectEditor store
    },
    reset ({ getters, commit, dispatch }) {
      dispatch('project/reset')
      // TODO - pull default schemas here from generator
      // TODO - pull default schemas here from generator
      // TODO - pull default schemas here from generator
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
