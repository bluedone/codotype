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
    selectBuild ({ state, getters, rootGetters, commit, dispatch }, generator_id) {
      // Finds the generator by id
      const generatorMeta = rootGetters['generator/collection'].find(g => g.id === generator_id)

      // FIND OR CREATES BUILD MODEL
      let selectedBuild = getters['collection/items'].find(s => s.generator_id === generator_id)

      // Defines a new build if one does not exist for the selected generator (generator_id)
      if (!selectedBuild) {
        console.log('MISSING BUILD - CREATE AND RE-RUN')
        // Pulls in generatorMeta
        const generatorMeta = rootGetters['generator/collection'].find(g => g.id === generator_id)
        // TODO - throw an error here if no generator has been found

        // Pulls in schemas from editor/schema
        const schemas = rootGetters['editor/schema/collection/items']
        // console.log(schemas)

        // Defines a new Build model
        const newModel = Object.assign({}, DEFAULT_BUILD)
        newModel.generator_id = generator_id
        // newModel.configuration = {}
        // TODO - the new implementation doesn't rely on buildConfiguration quite as directly
        newModel.configuration = buildConfiguration({ schemas: schemas, generator: generatorMeta })

        // Saves the new model and re-dispatches this action
        commit('collection/newModel', newModel)
        dispatch('collection/create')
        return dispatch('selectBuild', generator_id)
      }

      // QUESTION - how to handle the case where a build is being reloaded, but the schemas have changed?
      // If selectedBuild is found, there should be a merge function that can runs buildConfiguration for a new
      // configuration for the editor, and merges that with the previous one.
      // *Should exist in @codotype/util

      // Clears the current editor (TODO - it might be )
      dispatch('editor/clear')

      // Loads the generator into the step module
      dispatch('steps/load', generatorMeta)

      // Loads the generator into the build editor module
      return dispatch('editor/load', {
        schemas: rootGetters['editor/schema/collection/items'],
        generator_option_groups: generatorMeta.option_groups,
        configuration: selectedBuild.configuration
      })
    }
  },
  modules: {
    collection: Object.assign({}, collectionModule({ NEW_MODEL: DEFAULT_BUILD })),
    steps: stepModule,
    runtime: runtimeModule,
    editor: editorModule
  }
}
