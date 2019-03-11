// Exports a items build around a basic model prototype
export default function ({ NEW_MODEL }) {

  return Object.assign({}, {
    namespaced: true,
    state: {
      defaultNewModel: Object.assign({}, NEW_MODEL), // TODO - remove
      newModel: Object.assign({}, NEW_MODEL), // TODO - remove
      editModel: Object.assign({}, NEW_MODEL), // TODO - remove
      items: []
    },
    mutations: {
      items (state, items) {
        state.items = items
      },
      newModelAttr (state, { attribute, value }) { // TODO - remove
        state.newModel[attribute.identifier] = value
      },
      defaultNewModel (state, overriddenDefault) { // TODO - remove
        state.defaultNewModel = Object.assign({}, overriddenDefault)
        state.newModel = Object.assign({}, overriddenDefault)
        state.editModel = Object.assign({}, overriddenDefault)
      },
      resetNewModel (state) { // TODO - remove
        state.newModel = state.defaultNewModel
      },
      resetEditModel (state) { // TODO - remove
        state.editModel = state.defaultNewModel
      },
      newModel (state, model) { // TODO - remove
        state.newModel = Object.assign({}, model)
      },
      editModel (state, model) { // TODO - remove
        state.editModel = Object.assign({}, model)
      }
    },
    getters: {
      items (state) {
        return state.items
      },
      byId: state => id => {
        return state.items.find(m => m.id === id)
      },
      first (state) {
        return state.items[0]
      },
      last (state) {
        return state.items[state.items.length - 1]
      },
      newModel (state) { // TODO - remove
        return state.newModel
      },
      newModelAttr: state => ({ attribute }) => { // TODO - remove
        return state.newModel[attribute.identifier]
      },
      editModel (state) { // TODO - remove
        return Object.assign({}, state.editModel)
      }
    },
    actions: {
      create ({ state, commit }) { // TODO - remove
        // Sets up createdModel
        const createdModel = Object.assign({}, state.newModel);
        createdModel.id = Math.random().toString()

        // Resets state.newModel()
        commit('resetNewModel')

        // Updates state.items
        commit('items', [...state.items, createdModel])
      },
      update ({ state, commit }) { // TODO - remove
        // Updates items
        const items = state.items.map((model) => {
          if (model.id !== state.editModel.id) return model
          return state.editModel
        })
        commit('items', items)

        // Resets state.editModel
        commit('resetEditModel')
      },
      insert ({ state, commit }, model) { // Invoked from one module level above in a Vuex store
        if (!model.id) {
          model.id = Math.random().toString()
          const items = state.items
          items.push(model)
          commit('items', items)
        } else {
          const collection = state.items.map((m) => {
            if (model.id !== m.id) return m
            return model
          })
          commit('items', collection)
        }
      },
      destroy ({ state, commit }, modelId) {
        const items = state.items.filter(m => m.id !== modelId)
        commit('items', items)
      }
    }

  })

}
