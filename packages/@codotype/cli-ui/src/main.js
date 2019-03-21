import config from '@codotype/ui/src/config'
import initTourMediator from '@codotype/ui/src/modules/build/store/tourMediator'
import localStorageMediator from './localStorageMediator'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// bootstrap-vue
// Bootstrap components and directives
Vue.use(config.BootstrapVue)

// vue-meta
// supports `meta` object returned with `module.defaults`
Vue.use(config.Meta)

// vue-toggle-button
// http://vue-js-toggle-button.yev.io/
Vue.use(config.ToggleButton)

// vue-github-buttons
Vue.use(config.VueGitHubButtons)

// vue-clipboard2
Vue.use(config.VueClipboard)

// VRuntimeTemplate
Vue.component('v-runtime-template', config.VRuntimeTemplate)

// Configures top-level vuex mediators
initTourMediator(store, router)
localStorageMediator(store, router)

Vue.config.productionTip = false

new Vue({
  store: store,
  router: router,
  render: h => h(App),
}).$mount('#app')

