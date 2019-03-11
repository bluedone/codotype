import Driver from 'driver.js'

export default function configureModerator (store, router) {
  store.subscribe(({ type, payload }, state) => {
    if (type === 'build/steps/current') {

      // Pulls seenBlueprintTour from state (derived from localStorage on load)
      const seenBlueprintTour = state.tour.seenBlueprint

      // CLEANUP - replace hardcoded `blueprint_step` id string
      let selectedStep = store.getters['build/steps/selectedStep']
      if (selectedStep && selectedStep.id === 'blueprint_step' && !seenBlueprintTour) {
        setTimeout(() => {
          let driver = new Driver()
          let tourSteps = store.getters['tour/appEditorSteps']
          driver.defineSteps(tourSteps)
          driver.start()
          store.commit('tour/seenBlueprint', true)
          window.localStorage.setItem('seenBlueprintTour', true)
        }, 300)
      }

    }
  })
}
