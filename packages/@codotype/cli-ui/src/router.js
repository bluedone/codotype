import Vue from 'vue'
import Router from 'vue-router'

import About from './components/About'
import GeneratorAbout from './components/GeneratorAbout'
import GeneratorBuild from './components/GeneratorBuild'
import PageNotFound from '@codotype/ui/src/components/PageNotFound'

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
    },
    {
      path: "*",
      component: PageNotFound
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 } // Top of page on change
  },
  mode: 'history'
})
