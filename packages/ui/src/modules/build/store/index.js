import stepModule from './stepModule'
import runtimeModule from './runtimeModule'

// import { DEFAULT_BUILD } from './constants'

// export default {
//   newModel: DEFAULT_BUILD,
//   defaultNewModel: DEFAULT_BUILD,
// }

export default {
  namespaced: true,
  modules: {
    steps: stepModule,
    runtime: runtimeModule
  }
}
