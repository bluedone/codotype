import Vue from 'vue'
import Router from 'vue-router'

import GeneratorAbout from './components/GeneratorAbout'
import GeneratorBuild from './components/GeneratorBuild'

// Vue Router setup
Vue.use(Router)

// Exports new Router instance
export default new Router({
  routes: [
    {
      path: '/',
      component: GeneratorAbout
    },
    {
      path: '/build',
      component: GeneratorBuild
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 } // Top of page on change
  }
})
