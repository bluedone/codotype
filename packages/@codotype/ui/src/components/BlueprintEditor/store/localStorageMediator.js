import sanitizeLabel from '@codotype/util/lib/sanitizeLabel'
import inflateMeta from '@codotype/util/lib/inflateMeta'

function updateProjectLocalStorate(store, build) {
  store.dispatch('build/collection/insert', build)
  window.localStorage.setItem('projects', JSON.stringify(store.getters['build/collection/items']))
}

function getSelectedBuild(store) {
  const selectedGenerator = store.getters['generator/selectedModel'];
  return store.getters['build/collection/items'].find(s => s.generator_id === selectedGenerator.id)
}

let selectedBuild = {}

export default function configureMediator (store) {

  // Attempt to load localStorage.schemas && localStorage.projectLabel
  try {
    // Loads localStorage.projects, if it exitss
    let { projects = [] } = window.localStorage

    // Loads the projects
    store.commit('build/collection/items', JSON.parse(projects))
  } catch {
    delete window.localStorage.vuex
    delete window.localStorage.projects
  }

  store.subscribe(({ type, payload }) => {
    if (type === 'editor/project/label') {
      // Gets project metadata
      const sanitizedLabel = sanitizeLabel(payload)
      const { identifier, class_name } = inflateMeta(sanitizedLabel)

      // Update selected build
      selectedBuild = getSelectedBuild(store)
      selectedBuild.label = sanitizedLabel;
      selectedBuild.identifier = identifier;
      selectedBuild.class_name = class_name;
      updateProjectLocalStorate(store, selectedBuild)
    }
    if (type === 'editor/schema/collection/items') {
      selectedBuild = getSelectedBuild(store)
      selectedBuild.schemas = payload
      updateProjectLocalStorate(store, selectedBuild)
    }
    if (type === 'build/collection/items') {
      const stringified = JSON.stringify(payload)
      window.localStorage.setItem('projects', stringified)
    }
    if (type === 'build/editor/configuration') {
      selectedBuild = getSelectedBuild(store)
      selectedBuild.configuration = payload
      updateProjectLocalStorate(store, selectedBuild)
    }
  })

}
