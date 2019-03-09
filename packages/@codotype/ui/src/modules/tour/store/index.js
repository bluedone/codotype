import {
  APP_EDITOR_TOUR,
  GENERATOR_LIST_TOUR,
  APP_LIST_TOUR,
  BUILD_TOUR
} from './constants'

export default {
  namespaced: true,
  state: {
    seenBlueprint: false,
    seenConfigure: false
  },
  mutations: {
    seenBlueprint (state, seen) { state.seenBlueprint = seen },
    seenConfigure (state, seen) { state.seenConfigure = seen }
  },
  getters: {
    appEditorSteps: state => {
      return APP_EDITOR_TOUR
    },
    generatorListSteps: state => {
      return GENERATOR_LIST_TOUR
    },
    buildSteps: state => {
      return BUILD_TOUR
    },
    appListSteps: state => {
      return APP_LIST_TOUR
    }
  },
  actions: {
    created ({ commit }) {
      const seenBlueprint = localStorage.seenBlueprintTour || false
      const seenConfigure = localStorage.seenConfigureTour || false
      commit('seenBlueprint', seenBlueprint)
      commit('seenConfigure', seenConfigure)
    }
  }
}
