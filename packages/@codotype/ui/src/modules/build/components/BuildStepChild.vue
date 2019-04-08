<template>
  <div
    class="step-indicator d-flex flex-column justify-content-center align-items-center w-25"
    @click="jumpToStep(index)"
  >
    <template v-if="currentStep === index">
      <span :class="badgeClassName + 'bg-transparent text-success border-success'">{{index + 1}}</span>
    </template>

    <template v-else-if="index < currentStep">
      <span :class="badgeClassName + 'bg-success border-success'">
        <i class="fa fa-check"></i>
      </span>
    </template>

    <template v-else>
      <span :class="badgeClassName + 'bg-transparent text-secondary border-secondary'">{{index + 1}}</span>
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
      return 'd-flex flex-row text-white justify-content-center align-items-center step-badge '
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
    width: 2rem
    height: 2rem
    border-radius: 25px
    font-weight: 700
    transition: all 0.3s
    border: 2px solid

</style>
