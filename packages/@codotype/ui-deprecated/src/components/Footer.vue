<template>
  <div class='footer-bottom py-2' v-if="showFooter">
    <div class="container">
      <BuildStepsControls />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BuildStepsControls from '../modules/build/components/BuildStepsControls'

export default {
  name: 'Footer',
  components: {
    BuildStepsControls
  },
  computed: {
    ...mapGetters({
      fetchError: 'generator/error',
      buildFinished: 'build/runtime/finished',
      buildLoading: 'build/runtime/loading',
      runtimeError: 'build/runtime/error'
    }),
    showFooter () {
      return ['GeneratorBuild'].includes(this.$route.name) && !this.fetchError && !this.buildFinished && !this.buildLoading && !this.runtimeError
    }
  }
}
</script>

<style lang="sass" scoped>
.footer-bottom
  position: fixed
  width: 100%
  max-width: 100%
  bottom: 0
  z-index: 100
  background: white
  border-top: 1px solid #cccccc
</style>
