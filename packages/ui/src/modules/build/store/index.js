// import actions from './actions'
// import state from './state'
import stepModule from './stepModule'
import runtimeModule from './runtimeModule'
const namespaced = true

export default {
  namespaced,
  // state,
  // actions,
  modules: {
    steps: stepModule,
    runtime: runtimeModule
  }
}
