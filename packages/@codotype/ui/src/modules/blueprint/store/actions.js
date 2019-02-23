import cloneDeep from 'lodash/cloneDeep'
import uniqueId from 'lodash/uniqueId'
import ObjectID from 'bson-objectid'
import router from '@/routers'
import { DEFAULT_BLUEPRINT, DEFAULT_USER_SCHEMA } from './constants'

// TODO - use this instead?
// import { underscored } from 'underscore.string'

const underscored = require('underscore.string/underscored')
const DownloadFile = require('downloadjs')

export default {
  create: ({ state, dispatch, commit }) => {
    dispatch('persist', { record: cloneDeep(state.newModel) })

    // Displays encouraging notification
    // commit('notification/add', CREATE_SUCCESS_NOTIFICATION, { root: true })

    // Resets state.newModel
    dispatch('resetNewModel')
  },

  import: ({ dispatch }, blueprintJson) => {
    dispatch('persist', { record: cloneDeep(blueprintJson) })

    // Displays encouraging notification
    // commit('notification/add', CREATE_SUCCESS_NOTIFICATION, { root: true })
  },

  exportJson: ({ commit }, model) => {
    DownloadFile(JSON.stringify(model, null, 2), `${model.identifier}_codotype.json`, 'application/json')
  },

  rename: ({ state, commit, dispatch }, { label }) => {
    const selectedModel = state.selectedModel
    selectedModel.label = label
    selectedModel.identifier = underscored(label)
    dispatch('persist', { record: selectedModel })
    dispatch('selectModel', selectedModel._id)
  },

  clone: ({ dispatch, commit }, example) => {
    // Resets project, schema, and attribute IDs
    let projectModel = cloneDeep(example)
    projectModel._id = null

    // Adds to the project collection
    dispatch('persist', { record: projectModel })
  }
}
