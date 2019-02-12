// import axios from 'axios'

export default {
  namespaced: true,
  state: {
    loading: false,
    finished: false,
    downloadUrl: '',
    error: '' // TODO - implement some basic error handling
  },
  actions: {
    generate: ({ rootGetters, state, commit }) => {
      // Pulls requisite data from state
      // const { stages } = state.newModel
      // const blueprint = rootGetters['blueprint/selectedModel']

      // Defines build object to send to the server
      // let build = { blueprint, stages }

      // Sets `state.fetching` to `true`
      // commit('fetching', true)
      // commit('buildFinished', false)

      // Generates the code and downloads the response
      // return axios.post(GENERATE_ROUTE, { build })
      // .then(({ data }) => {
      //   console.log(data)
      //   commit('downloadUrl', data.download_url)
      //   commit('fetching', false)
      //   commit('buildFinished', true)
      //   // console.log(data.download_url)
      //   window.open(data.download_url)
      // })
      // .catch((error) => {
      //   commit('fetching', false)
      //   commit('buildFinished', false)
      //   console.log(error)
      //   // TODO - handle error here
      // })
      // DownloadFile(blob, `${blueprint.identifier}_codotype.zip`, 'application/zip')
    }
  },
  mutations: {
    loading (state, loading) { state.loading = loading },
    finished (state, finished) { state.finished = finished },
    downloadUrl (state, downloadUrl) { state.downloadUrl = downloadUrl },
    error (state, error) { state.error = error }
  },
  getters: {
    loading (state) { return state.loading },
    finished (state) { return state.finished },
    downloadUrl (state) { return state.downloadUrl },
    error (state) { return state.error }
  }
}
