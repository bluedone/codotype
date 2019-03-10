import axios from 'axios'
const GENERATE_ROUTE = '/api/generate'
// const DownloadFile = require('downloadjs')

export default {
  namespaced: true,
  state: {
    loading: false,
    finished: false,
    downloadUrl: '', // TODO - implement mutation
    filepath: '', // TODO - implement mutation
    responseType: '', // TODO - implement mutation
    error: '' // TODO - implement some basic error handling
  },
  actions: {
    reset: ({ commit }) => {
      commit('loading', false)
      commit('finished', false)
      commit('downloadUrl', '')
      commit('filepath', '')
      commit('responseType', '')
      commit('error', '')
    },
    generate: ({ rootGetters, state, commit }) => {
      // TODO - this should just be responsible for interfacing with the runtime API
      // All data gathering & validation should take place OUTSIDE the runtime module
      // console.log('GENERATE IN RUNTIME MODULE')

      // Pulls requisite data from state
      const blueprint = rootGetters['editor/blueprint']

      // Pulls in configuration object
      const stage = rootGetters['build/editor/toBuildStage']

      // Defines build object to send to the server
      let build = { blueprint, stages: [stage] }

      // Debugging
      // console.log(blueprint)
      // console.log(configuration)
      // console.log(build)

      // Sets `state.loading` to `true`
      // Sets `state.finished` to `false`
      commit('loading', true)
      commit('finished', false)

      // Generates the code and downloads the response
      return axios.post(GENERATE_ROUTE, { build })
      .then(({ data }) => {
        // Debugging
        console.log(data)

        // Builing antici...pation
        setTimeout(() => {
          // commit('downloadUrl', data.download_url)
          commit('finished', true)
          commit('loading', false)

          // Handle response type (data.type)
          // TODO - update store state & mutations accordingly

          // console.log(data.download_url)
          // window.open(data.download_url)
        }, 500)
      })
      .catch((error) => {
        commit('loading', false)
        commit('finished', false)
        console.log(error)
        // TODO - handle error here
      })
      // DownloadFile(blob, `${blueprint.identifier}_codotype.zip`, 'application/zip')
    }
  },
  mutations: {
    loading (state, loading) { state.loading = loading },
    finished (state, finished) { state.finished = finished },
    downloadUrl (state, downloadUrl) { state.downloadUrl = downloadUrl },
    responseType (state, responseType) { state.responseType = responseType },
    filepath (state, filepath) { state.filepath = filepath },
    error (state, error) { state.error = error }
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
