import uniq from 'lodash/uniq'
import axios from 'axios'
import { API_ROOT } from './constants'
const namespaced = true

export default {
  namespaced,
  state: {
    collection: [],
    fetching: false,
    selectedModel: {}
  },
  mutations: {
    fetching (state, bool) {
      state.fetching = bool
    },
    collection (state, data) {
      state.collection = data
    },
    selectedModel (state, model) {
      state.selectedModel = model
    }
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
      const { data } = await axios.get(API_ROOT)
      commit('collection', data)
      commit('fetching', false)
    },
    selectModel: ({ commit, state }, model_id) => {
      let model = state.collection.find(m => m.id === model_id)
      commit('selectedModel', model)
    },
    selectFromServer: async ({ commit }) => {
      const { data } = await axios.get(API_ROOT)
      commit('collection', data)
      commit('selectedModel', data[0])
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
    techTags: state => {
      return uniq(state.collection.reduce((techTags, g) => { return techTags.concat(g.tech_tags) }, [])).map((t) => { return { selected: false, label: t } })
    },
    typeTags: state => {
      return uniq(state.collection.reduce((typeTags, g) => { return typeTags.concat(g.type_tags) }, [])).map((t) => { return { selected: false, label: t } })
    }
  }
}
