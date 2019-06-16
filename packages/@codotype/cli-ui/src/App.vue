<template>
  <div id="app">
    <Navbar v-if="$store.getters['generator/selectedModel']" />
    <Overlay/>
    <div class="container-fluid router-container">
      <router-view/>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Overlay from '@codotype/ui/src/components/Overlay'
import AppFooter from '@codotype/ui/src/components/Footer'

export default {
  name: 'app',
  components: {
    Navbar,
    Overlay,
    AppFooter
  },
  metaInfo: {
    title: 'Loading...',
    titleTemplate: 'Codotype - %s',
    htmlAttrs: {
      lang: 'en'
    }
  }
}
</script>

<style lang="sass">
  @import "@codotype/ui/src/sass/vendor.sass"

  html
    height: 100%

  body
    height: 100%

  .container-fluid.router-container
    padding-top: 3.5rem
    padding-bottom: 4rem
    height: 100%

  #app
    height: 100%
    width: 100%

</style>

