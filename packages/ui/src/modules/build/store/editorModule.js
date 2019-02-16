import collectionModule from '../../../store/lib/collectionModule'
import objectModule from './objectModule'

// const setValue = (state, { group, attr, val }) => { state.config[group][attr] = val }

// NOTE - the editor module is ONLY responsible for editing the build.configuration property
export default {
  namespaced: true,
  state: {
    schemas: [],
    option_groups: [],
    configuration: {}
  },
  // This is used to edit the CURRENT addon, is it needed?
  modules: {
    // addon: Object.assign({}, collectionModule({ NEW_MODEL: {} })),
    // data: { namespaced: true, modules: {} }
  },
  getters: {
    // TODO - this will pull out ONLY what's needed from the modules
    // NOTE - this will NEED to reference option_groups and schemas
    // toObj: state => {
    //   return state.data
    // }
    // valueOf: state => attr_id => {
    //   return state[attr_id]
    // },
    toObj: state => {
      return state.configuration
    },
    optionValue: state => ({ group, attribute }) => {
      return state.configuration[group.identifier][attribute.identifier]
    },
    modelOptionValue: state => ({ group, schema, attribute }) => {
      console.log(group)
      console.log(schema)
      console.log(attribute)
      console.log(state.configuration)
      if (!group || !schema || !attribute) return

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
    optionValue (state, { group, attribute, value }) {
      state.configuration[group.identifier][attribute.identifier] = value
    },
    modelOptionValue (state, { group, schema, attribute, value }) {
      console.log(group)
      console.log(schema)
      console.log(attribute)
      console.log(value)
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
    }
  }
}
