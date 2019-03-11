import uniq from 'lodash/uniq'
import axios from 'axios'
import { API_ROOT } from './constants'
const namespaced = true

export default {
  namespaced,
  state: {
    collection: [],
    fetching: false,
    selectedModel: {},
    error: false
  },
  mutations: {
    fetching (state, bool) { state.fetching = bool },
    collection (state, data) { state.collection = data },
    selectedModel (state, model) { state.selectedModel = model },
    error (state, err) { state.error = err }
  },
  actions: {
    selectModel: ({ commit, state }, model_id) => {
      let model = state.collection.find(m => m._id === model_id)
      commit('selectedModel', model)
    },
    clearSelected: ({ commit }) => {
      commit('selectedModel', {})
    },
    fetchCollection: async ({ commit, state }, model_id) => {
      commit('fetching', true)
      commit('error', false)
      try {
        const { data } = await axios.get(API_ROOT)
        commit('collection', data)
        commit('fetching', false)
      } catch (err) {
        commit('error', true)
        commit('fetching', false)
        throw err
      }
    },
    selectModel: ({ commit, state }, model_id) => {
      let model = state.collection.find(m => m.id === model_id)
      commit('selectedModel', model)
    }
  },
  getters: {
    collection: state => {
      return state.collection
    },
    getModel: state => id => { // Nice higher-order getter
      return state.collection.find(m => m.id === id)
    },
    fetching: state => {
      return state.fetching
    },
    selectedModel: state => {
      return state.selectedModel
    },
    error: state => {
      return state.error
    },
    techTags: state => {
      return uniq(state.collection.reduce((techTags, g) => { return techTags.concat(g.tech_tags) }, [])).map((t) => { return { selected: false, label: t } })
    },
    typeTags: state => {
      return uniq(state.collection.reduce((typeTags, g) => { return typeTags.concat(g.type_tags) }, [])).map((t) => { return { selected: false, label: t } })
    }
  }
}
