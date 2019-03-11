import uniqueId from 'lodash/uniqueId'

// // // //

// removeNotification
// Helper function used to remove a notification from state.collection
function removeNotification (collection, id) {
  return collection.filter(e => e.id !== id)
}

// // // //

export default {
  namespaced: true,
  state: {
    collection: [
      // Notification examples:
      // { dismissible: true, strong: 'Warning', message: 'Something went wrong.', context: 'warning' },
      // { dismissible: true, strong: 'Info', message: 'Something went wrong.', context: 'info' },
      // { dismissible: true, strong: 'Danger!', message: 'Something went wrong.', context: 'danger' }
    ]
  },
  mutations: {
    // Adds a notification to state.collection
    add (state, notification) {
      // Assigns unique ID to notification
      // this is used for removing the notification after a timeout
      let id = uniqueId()
      notification.id = id

      // Adds the notification to state.collection
      state.collection.push(notification)

      // Removes the notification after
      setTimeout(() => {
        state.collection = removeNotification(state.collection, id)
      }, notification.timeout || 2500)
    },
    // Removes a Notification from state.collection
    remove (state, notificationId) {
      state.collection = removeNotification(state.collection, notificationId)
    }
  },
  actions: {},
  getters: {
    collection: state => {
      return state.collection
    }
  }
}
