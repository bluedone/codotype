export default function configureMediator (store) {

  // Attempt to load localStorage.schemas && localStorage.projectLabel
  try {
    // Loads the projectLabel
    let { projectLabel } = window.localStorage
    if (projectLabel) {
      store.dispatch('editor/project/setLabel', projectLabel)
    }

    // Loads the schemas
    let loaded = JSON.parse(window.localStorage.schemas)
    store.commit('editor/schema/collection/items', loaded)
  } catch {
    // console.log('ERROR LOADING FROM LOCAL STORAGE')
  }

  store.subscribe(({ type, payload }) => {
    if (type === 'editor/project/label') {
      window.localStorage.setItem('projectLabel', payload)
    }
    if (type === 'editor/schema/collection/items') {
      const stringified = JSON.stringify(payload)
      window.localStorage.setItem('schemas', stringified)
    }
    // if (type === 'build/editor/configuration') {
    //   console.log('UPDATE CONFIGURATION')
    //   console.log(payload)
    // }
  })

}
