import { DEFAULT_BUILD } from './constants'
import stepModule from './stepModule'
import runtimeModule from './runtimeModule'
import editorModule from './editorModule'
import collectionModule from '../../../store/lib/collectionModule'
import buildConfiguration from '@codotype/util/lib/buildConfiguration'

export default {
  namespaced: true,
  actions: {
    // NOTE - a lot of the process here may need to be replicated elsewhere - something to think about moving forward...
    loadSteps ({ rootGetters, dispatch }, generator_id) {
      // Finds the generator by id
      const generatorMeta = rootGetters['generator/collection'].find(g => g.id === generator_id)

      // Loads the generator into the step module
      dispatch('editor/created', {}, { root: true })
      dispatch('steps/load', generatorMeta)
      dispatch('runtime/reset')
    },
    selectBuild ({ state, getters, rootGetters, commit, dispatch }, generator_id) {
      // Finds the generator by id
      const generatorMeta = rootGetters['generator/collection'].find(g => g.id === generator_id)
      // TODO - throw an error here if no generator has been found

      // Pulls in schemas
      const schemas = rootGetters['editor/schema/collection/items']

      // FIND OR CREATES BUILD MODEL
      let selectedBuild = getters['collection/items'].find(s => s.generator_id === generator_id)

      // Defines a new build if one does not exist for the selected generator (generator_id)
      if (!selectedBuild) {

        // Defines a new Build model
        const newModel = Object.assign({}, DEFAULT_BUILD)
        newModel.generator_id = generator_id
        // newModel.configuration = {}
        // TODO - the new implementation doesn't rely on buildConfiguration quite as directly
        newModel.configuration = buildConfiguration({ schemas: schemas, generator: generatorMeta })

        // Saves the new model and re-dispatches this action
        dispatch('collection/insert', newModel)
        return dispatch('selectBuild', generator_id)
      }

      // Sets the selectedBuild.configuration property
      // Merges the existing configuration to handle the addition / removal of schemas
      selectedBuild.configuration = buildConfiguration({
        schemas: rootGetters['editor/schema/collection/items'],
        generator: generatorMeta,
        configuration: selectedBuild.configuration
      })

      // Clears the current editor & runtime store
      dispatch('editor/clear')

      // Loads the generator into the build editor module
      return dispatch('editor/load', {
        schemas: rootGetters['editor/schema/collection/items'],
        generator: generatorMeta,
        configuration: selectedBuild.configuration
      })
    }
  },
  modules: {
    collection: collectionModule({ NEW_MODEL: DEFAULT_BUILD }), // TODO - update collectionModule
    steps: stepModule,
    runtime: runtimeModule,
    editor: editorModule
  }
}
