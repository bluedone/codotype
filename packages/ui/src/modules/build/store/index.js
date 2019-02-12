import stepModule from './stepModule'
import runtimeModule from './runtimeModule'

export default {
  namespaced: true,
  modules: {
    steps: stepModule,
    runtime: runtimeModule
  }
}
