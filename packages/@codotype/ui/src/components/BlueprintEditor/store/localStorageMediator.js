export default function configureMediator (store) {

  // Attempt to load localStorage.schemas
  try {
    let loaded = JSON.parse(window.localStorage.schemas)
    store.commit('editor/schema/collection/items', loaded)
    // console.log('LOADED')
  } catch {
    // console.log('ERROR LOADING FROM LOCAL STORAGE')
  }

  store.subscribe(({ type, payload }) => {
    if (type === 'editor/schema/collection/items') {
      // console.log('UPDATE STORAGE HERE')
      // console.log(type)
      // console.log(payload)
      const stringified = JSON.stringify(payload)
      window.localStorage.setItem('schemas', stringified)
    }
    // if (type === 'build/editor/configuration') {
    //   console.log('UPDATE CONFIGURATION')
    //   console.log(payload)
    // }
  })

}
