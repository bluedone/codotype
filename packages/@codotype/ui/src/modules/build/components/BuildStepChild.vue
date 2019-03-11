<template>
  <div
    class="step-indicator d-flex flex-column justify-content-center align-items-center"
    style="width: 33.3%;"
    @click="jumpToStep(index)"
  >
    <template v-if="currentStep === index">
      <span :class="badgeClassName + 'bg-primary'">
        {{index + 1}}
      </span>
      <span :class="textClassName + 'text-primary'">{{ step.label }}</span>
    </template>

    <template v-else-if="index < currentStep">
      <span :class="badgeClassName + 'bg-success'">
        <i class="fa fa-check"></i>
      </span>
      <span :class="textClassName + 'text-success'">{{ step.label }}</span>
    </template>

    <template v-else>
      <span :class="badgeClassName + 'bg-secondary'">
        {{index + 1}}
      </span>
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
    badgeClassName () {
      return 'd-flex flex-row mb-2 text-white justify-content-center align-items-center step-badge '
    },
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

  .step-badge
    font-size: 1rem
    width: 1.5rem
    height: 1.5rem
    border-radius: 25px
    font-weight: 700
    transition: all 0.3s

  .step-text
    font-weight: 700

</style>
