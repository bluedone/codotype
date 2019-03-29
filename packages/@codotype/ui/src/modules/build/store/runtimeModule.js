import axios from 'axios'
const GENERATE_ROUTE = '/api/generate'

export default {
  namespaced: true,
  state: {
    loading: false,
    finished: false,
    downloadUrl: '',
    filepath: '',
    responseType: '',
    error: false
  },
  actions: {
    reset: ({ commit }) => {
      commit('loading', false)
      commit('finished', false)
      commit('error', false)
      commit('downloadUrl', '')
      commit('filepath', '')
      commit('responseType', '')
    },
    generate: ({ rootGetters, state, commit, dispatch }) => {
      // CLEANUP - All data gathering & validation should take place OUTSIDE the runtime module

      // Pulls requisite data from state
      const blueprint = rootGetters['editor/blueprint']

      // Pulls in configuration object & generator_id
      const buildParameters = rootGetters['build/editor/buildParameters']

      // Defines build object to send to the server
      let build = {
        blueprint,
        generator_id: buildParameters.generator_id,
        configuration: buildParameters.configuration
      }

      // Debugging
      // console.log(blueprint)
      // console.log(configuration)
      // console.log(build)

      // Flushes state before fetch
      dispatch('reset')
      commit('loading', true)

      // Generates the code and downloads the response
      return axios.post(GENERATE_ROUTE, { build })
      .then(({ data }) => {
        // Debugging
        console.log(data)

        // Sets state.responseType
        commit('responseType', data.type)

        // Sets filepath and/or download_url
        if (data.filepath) commit('filepath', data.filepath)
        if (data.downloadUrl) commit('downloadUrl', data.downloadUrl)

        // Builing antici...pation
        setTimeout(() => {
          commit('finished', true)
          commit('loading', false)
        }, 500)
      })
      .catch((error) => {
        // Builing antici...pation
        setTimeout(() => {
          commit('finished', true)
          commit('loading', false)
          commit('error', true)
          throw error
        }, 500)
      })
    }
  },
  mutations: {
    loading (state, loading) { state.loading = loading },
    finished (state, finished) { state.finished = finished },
    downloadUrl (state, downloadUrl) { state.downloadUrl = downloadUrl },
    responseType (state, responseType) { state.responseType = responseType },
    filepath (state, filepath) { state.filepath = filepath },
    error (state, err) { state.error = err }
  },
  getters: {
    loading (state) { return state.loading },
    finished (state) { return state.finished },
    downloadUrl (state) { return state.downloadUrl },
    responseType (state) { return state.responseType },
    filepath (state) { return state.filepath },
    error (state) { return state.error }
  }
}
