<template>
  <button
    class="btn btn-lg btn-yellow"
    :disabled="disabled"
    @click="generate()"
  >
    <i class="fa fa-cog" v-if="disabled"></i>
    <i class="fa fa-spin fa-cog" v-else></i>
    Generate Code
  </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'GenerateCodeButton',
  props: {
    disabled: {
      type: Boolean
    }
  },
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
