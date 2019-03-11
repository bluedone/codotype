import Vue from 'vue'
import Router from 'vue-router'

import About from './components/About'
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
      path: '/about',
      component: About
    },
    {
      path: '/build',
      component: GeneratorBuild,
      name: 'GeneratorBuild'
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 } // Top of page on change
  },
  mode: 'history'
})
