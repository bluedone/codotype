import collectionModule from '../../../store/lib/collectionModule'

const DEFAULT_PROJECT = {
  label: '',
  identifier:'',
  class_name: '',
  generator_id: '',
  schemas: [],
  configuration: {},
}

export default {
  namespaced: true,
  modules: {
    collection: collectionModule({ NEW_MODEL: DEFAULT_PROJECT })
  }
}
