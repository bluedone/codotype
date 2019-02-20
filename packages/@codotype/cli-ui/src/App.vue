<template>
  <div id="app">
    <Navbar v-if="$store.getters['generator/selectedModel']" />
    <div class="container router-container">
      <router-view/>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import AppFooter from '@codotype/ui/src/components/Footer'

export default {
  name: 'app',
  components: {
    Navbar,
    AppFooter
  },
  created () {
    this.$store.dispatch('generator/selectFromServer')
  }
}
</script>

<style lang="sass">
  @import "@codotype/ui/src/sass/vendor.sass"

  html
    height: 100%

  body
    height: 100%

  .container.router-container
    padding-top: 3.5rem
    padding-bottom: 4rem
    height: 100%

  #app
    height: 100%
    width: 100%

</style>

