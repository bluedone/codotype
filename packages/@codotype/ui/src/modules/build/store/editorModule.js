import collectionModule from '../../../store/lib/collectionModule'
import { buildConfigurationDefault } from '@codotype/util/lib/buildDefault'

export default {
  namespaced: true,
  state: {
    selectedSchemaId: '',
    generatorId: '',
    schemas: [], // CLEANUP - this should implement a collectionModule and copy the schemas over from the blueprint
    configuration_groups: [],
    configuration: {}
  },
  modules: {
    global_addon: collectionModule({ NEW_MODEL: {} }),
    model_addon: collectionModule({ NEW_MODEL: {} })
  },
  getters: {
    buildParameters: state => {
      return {
        generator_id: state.generatorId,
        configuration: state.configuration
      }
    },
    selectedSchema: state => {
      return state.schemas.find(s => s.id === state.selectedSchemaId) || state.schemas[0]
    },
    optionValue: state => ({ group, attribute }) => {
      return state.configuration[group.identifier][attribute.identifier]
    },
    modelOptionValue: state => ({ group, schema, attribute }) => {
      if (!group || !schema || !attribute) return

      // CLEANUP - this should be removed, handled by a higher-level configuration merge sub-routine
      if (!state.configuration[group.identifier][schema.identifier]) {
        state.configuration[group.identifier][schema.identifier] = {}
      }
      return state.configuration[group.identifier][schema.identifier][attribute.identifier]
    }
  },
  mutations: {
    schemas (state, schemas) { state.schemas = schemas },
    configuration_groups (state, configuration_groups) { state.configuration_groups = configuration_groups },
    configuration (state, configuration) { state.configuration = configuration },
    generatorId (state, generatorId) { state.generatorId = generatorId },
    selectedSchemaId (state, selectedSchemaId) { state.selectedSchemaId = selectedSchemaId },
    optionValue (state, { group, attribute, value }) {
      state.configuration[group.identifier][attribute.identifier] = value
    },
    modelOptionValue (state, { group, schema, attribute, value }) {
      state.configuration[group.identifier][schema.identifier][attribute.identifier] = value
    }
  },
  actions: {
    // LOAD a build configuration into the editor
    load ({ commit, dispatch }, { generator, schemas, configuration }) {
      commit('configuration', configuration)
      commit('schemas', schemas)  // CLEANUP - should interface with collectionModule (should it though?)
      commit('configuration_groups', generator.configuration_groups)
      commit('generatorId', generator.id)
    },
    setOptionValue({ state, commit }, { group, attribute, value }) {
      commit('optionValue', { group, attribute, value })
      commit('configuration', state.configuration)
    },
    // CLEARS the editor module state
    // De-registers all dynamic modules
    clear ({}) {
      // console.log('CLEAR EDITOR MODULE HERE')
    },
    selectModelAddon ({ state, getters, commit, dispatch }, { group, schema }) {
      const configuration = state.configuration

      // Loads new option group into model_addon module
      commit('selectedSchemaId', schema.id)
      let newModelAddon = buildConfigurationDefault({ attributes: group.attributes })
      newModelAddon.order = state.model_addon.items.length
      commit('model_addon/defaultNewModel', newModelAddon)
      commit('model_addon/items', configuration[group.identifier_plural][schema.identifier])
    },
    selectGlobalAddon ({ state, getters, commit, dispatch }, { group }) {
      const configuration = state.configuration

      // Loads new option group into global_addon module
      commit('global_addon/defaultNewModel', buildConfigurationDefault({ attributes: group.attributes }))
      commit('global_addon/items', configuration[group.identifier_plural])
    },
    syncModelAddon ({ state, getters, commit }, { group, schema }) {
      const configuration = state.configuration
      configuration[group.identifier_plural][schema.identifier] = getters['model_addon/items']
      commit('configuration', configuration)
    },
    syncGlobalAddon ({ state, getters, commit }, { group }) {
      const configuration = state.configuration
      configuration[group.identifier_plural] = getters['global_addon/items']
      commit('configuration', configuration)
    }
  }
}
