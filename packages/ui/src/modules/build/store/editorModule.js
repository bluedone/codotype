// import cloneDeep from 'lodash/cloneDeep'
// import buildConfiguration from '@codotype/util/lib/buildConfiguration'
import collectionModule from '../../../store/lib/collectionModule'
import objectModule from './objectModule'

// const setValue = (state, { group, attr, val }) => { state.config[group][attr] = val }

// NOTE - the editor module is ONLY responsible for editing the build.configuration property
export default {
  namespaced: true,
  state: {
    schemas: [],
    option_groups: [],
  },
  // This is used to edit the CURRENT addon, is it needed?
  modules: {
    addon: Object.assign({}, collectionModule({ NEW_MODEL: {} })),
    data: { namespaced: true, modules: {} }
  },
  getters: {
    // TODO - this will pull out ONLY what's needed from the modules
    // NOTE - this will NEED to reference option_groups and schemas
    toObj: state => {
      return state.data
    }
  },
  mutations: {
    schemas (state, schemas) { state.schemas = schemas },
    option_groups (state, option_groups) { state.option_groups = option_groups }
  },
  actions: {
    // LOAD a build configuration into the editor
    // The editor is NOT responsible for creating the configuration object...?
    load ({ commit, dispatch }, { generator_option_groups, schemas }) {
      commit('schemas', schemas)
      commit('option_groups', generator_option_groups)
      dispatch('registerAllOptionGroups')
    },

    // CLEARS the editor module state
    // De-registers all dynamic modules
    clear ({}) {
      console.log('CLEAR EDITOR MODULE HERE')
    },

    registerAllOptionGroups ({ state, dispatch }) {
      state.option_groups.forEach((og) => dispatch('registerOptionGroup', { option_group: og }))
    },

    // TODO - check if option group has already been defined here
    registerOptionGroup ({ state }, { option_group }) {
      // TODO - constantize GLOBAL_OPTION type
      if (option_group.type === 'OPTION_GROUP_TYPE_GLOBAL_OPTION') {

        // Defines the default state
        // TODO - this must be moved into @codotype/util
        const defaultState = {}
        option_group.attributes.forEach((attr) => {
          defaultState[attr.identifier] = attr.default_value
        })

        // TODO - this should accept the attributes of the option group, yeah?
        // All validations can be managed in there?
        const newModule = objectModule({ defaultState: defaultState })

        // Defines the scope of the module
        const scope = option_group.identifier
        this.registerModule(['build', 'editor', 'data', scope], newModule)

      // TODO - constantize global option here
      } else if (option_group.type === 'OPTION_GROUP_TYPE_MODEL_OPTION') {
        // New empty module to wrap an ObjectModule for each schema
        const newModule = { modules: {}, namespaced: true }

        // Defines the default state
        // TODO - this must be moved into @codotype/util
        const defaultState = {}
        option_group.attributes.forEach((attr) => {
          defaultState[attr.identifier] = attr.default_value
        })

        // Defines schema-level modules
        state.schemas.forEach((s) => {
          newModule.modules[s.identifier] = objectModule({ defaultState: defaultState })
        })

        // Defines the scope of the module
        console.log('ADDED ', option_group.identifier)
        const scope = option_group.identifier
        this.registerModule(['build', 'editor', 'data', scope], newModule)

      // HANDLES OPTION_GROUP_TYPE_GLOBAL_ADDON
      } else if (option_group.type === 'OPTION_GROUP_TYPE_GLOBAL_ADDON') {
        console.log('HANDLE ADDON HERE')
        const scope = option_group.identifier_plural

        // TODO - pass in newModel from @codotype/ui
        this.registerModule(['build', 'editor', 'data', scope], collectionModule({ NEW_MODEL: {} }))

      // HANDLES OPTION_GROUP_TYPE_MODEL_ADDON
      } else if (option_group.type === 'OPTION_GROUP_TYPE_MODEL_ADDON') {
        // New empty module to wrap an ObjectModule for each schema
        const newModule = { state: {}, namespaced: true }

        // Defines the default state
        // TODO - this must be moved into @codotype/util
        const defaultState = {}
        option_group.attributes.forEach((attr) => {
          defaultState[attr.identifier] = attr.default_value
        })

        // Defines schema-level modules
        // NOTE - a full-blown collectionModule might not be ideal here
        // Would be best to issue a stripped-down module, and be able to select
        state.schemas.forEach((s) => {
          newModule.state[s.identifier] = []
          console.log('Added ADDON ARRAY for ', s.identifier)
        })

        // Defines the scope of the module
        console.log(option_group)
        const scope = option_group.identifier_plural
        this.registerModule(['build', 'editor', 'data', scope], newModule)
      }

      // QUESTION - do we want { preserveState: true } ?
      // const newModule = Object.assign({}, collectionModule({ NEW_MODEL: {} }))

      // Registers the new Vuex module
      // QUESTION - do we need to de-register it as well?
      // this.registerModule(['build', 'editor', scope], newModule)
    }
  }
}
