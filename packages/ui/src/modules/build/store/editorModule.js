import collectionModule from '../../../store/lib/collectionModule'
import objectModule from './objectModule'
import buildDefault from '@codotype/util/lib/buildDefault'

export default {
  namespaced: true,
  state: {
    selectedOptionGroupId: '',
    selectedSchemaId: '',
    schemas: [],
    option_groups: [],
    configuration: {}
  },
  modules: {
    addon: Object.assign({}, collectionModule({ NEW_MODEL: {} })),
  },
  getters: {
    toObj: state => {
      return state.configuration
    },
    optionValue: state => ({ group, attribute }) => {
      return state.configuration[group.identifier][attribute.identifier]
    },
    selectedSchema: state => { return state.schemas.find(s => s.id === state.selectedSchemaId) || state.schemas[0] },
    modelOptionValue: state => ({ group, schema, attribute }) => {
      if (!group || !schema || !attribute) return

      // TODO - this should be removed, handled by a higher-level configuration merge sub-routine
      if (!state.configuration[group.identifier][schema.identifier]) {
        state.configuration[group.identifier][schema.identifier] = {}
      }
      return state.configuration[group.identifier][schema.identifier][attribute.identifier]
    }
  },
  mutations: {
    schemas (state, schemas) { state.schemas = schemas },
    option_groups (state, option_groups) { state.option_groups = option_groups },
    configuration (state, configuration) { state.configuration = configuration },
    selectedOptionGroupId (state, selectedOptionGroupId) { state.selectedOptionGroupId = selectedOptionGroupId },
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
    load ({ commit, dispatch }, { generator_option_groups, schemas, configuration }) {
      commit('configuration', configuration)
      commit('schemas', schemas)
      commit('option_groups', generator_option_groups)
    },

    // CLEARS the editor module state
    // De-registers all dynamic modules
    clear ({}) {
      console.log('CLEAR EDITOR MODULE HERE')
    },
    selectModelAddon ({ state, getters, commit, dispatch }, { group, schema }) {
      const configuration = state.configuration

      // Sets configuration from values currently in the addon module
      if (state.selectedOptionGroupId && state.selectedSchemaId) {
        const selectedOptionGroup = state.option_groups.find(og => og.id === state.selectedOptionGroupId)
        const selectedSchema = state.schemas.find(s => s.id === state.selectedSchemaId)
        configuration[selectedOptionGroup.identifier_plural][selectedSchema.identifier] = getters['addon/items']
        commit('configuration', configuration)
      }

      // Loads new option group into addon module
      commit('selectedOptionGroupId', group.id)
      commit('selectedSchemaId', schema.id)
      commit('addon/defaultNewModel', buildDefault({ attributes: group.attributes }))
      commit('addon/items', configuration[group.identifier_plural][schema.identifier])
    }
  }
}
