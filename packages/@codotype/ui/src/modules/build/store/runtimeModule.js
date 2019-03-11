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

        // Sets state.responseType
        commit('responseType', data.type)

        // Sets filepath and/or download_url
        if (data.filepath) commit('filepath', data.filepath + '/' + blueprint.identifier)
        if (data.downloadUrl) commit('downloadUrl', data.downloadUrl)

        // Builing antici...pation
        setTimeout(() => {
          commit('finished', true)
          commit('loading', false)
        }, 500)
      })
      .catch((error) => {
        commit('loading', false)
        commit('finished', false)
        // console.log(error)
        // TODO - handle error here
      })
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
