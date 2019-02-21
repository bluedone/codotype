<template>
  <b-button
    variant="success"
    size="lg"
    @click="generate()"
    v-if="currentStep === steps.length - 1"
  >
    <i class="fa fa-spin fa-cog"></i>
    Generate Code
  </b-button>
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
