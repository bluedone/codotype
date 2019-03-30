<template>
  <div
    class="step-indicator d-flex flex-column justify-content-center align-items-center w-25"
    @click="jumpToStep(index)"
  >
    <template v-if="currentStep === index">
      <span :class="textClassName + 'text-success'">{{ step.label }}</span>
    </template>

    <template v-else-if="index < currentStep">
      <span :class="textClassName + 'text-success'">{{ step.label }}</span>
    </template>

    <template v-else>
      <span :class="textClassName + 'text-secondary'">{{ step.label }}</span>
    </template>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BuildStepChild',
  props: {
    step: {
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      currentStep: 'build/steps/current',
      selectedStep: 'build/steps/selectedStep'
    }),
    textClassName () {
      let css = 'd-flex flex-row step-text '
      return css
    }
  },
  methods: mapActions({
    jumpToStep: 'build/steps/jumpTo'
  })
}
</script>

<style lang="sass">

  .step-indicator
    cursor: pointer

  .step-text
    font-weight: 200

</style>
