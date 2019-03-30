<template>
  <button
    class="btn btn-lg btn-yellow"
    @click="generate()"
    v-if="currentStep === steps.length - 1"
  >
    <i class="fa fa-spin fa-cog"></i>
    Generate Code
  </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'GenerateCodeButton',
  computed: mapGetters({
    currentStep: 'build/steps/current',
    steps: 'build/steps/collection/items'
  }),
  methods: mapActions({
    generate: 'build/runtime/generate'
  })
}
</script>

<style lang='sass'>
  @import '../../../sass/vendor.sass'

  button.btn-yellow
    @include button-variant(#ffd700, #ffd700)

</style>
