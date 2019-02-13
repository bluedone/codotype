import { DEFAULT_BUILD } from './constants'
import stepModule from './stepModule'
import runtimeModule from './runtimeModule'
import editorModule from './editorModule'
import collectionModule from '../../../store/lib/collectionModule'

export default {
  namespaced: true,
  modules: {
    collection: Object.assign({}, collectionModule({ NEW_MODEL: DEFAULT_BUILD })),
    steps: stepModule,
    runtime: runtimeModule,
    editor: editorModule
  }
}
