<template>
  <b-row class="d-flex justify-content-center" v-if="steps[0]">
    <b-col sm=12 lg=12 xl=9 class="step-wrapper d-flex flex-row w-100 align-items-center justify-content-between">

      <template v-for="step, index in steps">

        <BuildStepChild
          :key="step.id"
          :step="step"
          :index="index"
        />

        <!-- Conditionally inserts dividing lines between each BuildStepChild component -->
        <span class="divider done w-50 success d-flex" v-if="currentStep > index && index < 2"></span>
        <span class="divider w-50 d-flex" v-else-if="index < 2 && steps.length > 2"></span>
      </template>
    </b-col>

    <b-col sm=12 lg=12 xl=9 class="label-wrapper py-2 d-flex flex-row w-100 align-items-center justify-content-between">
      <template v-for="step, index in steps">

        <BuildStepLabel
          :key="step.id"
          :step="step"
          :index="index"
        />

        <!-- Conditionally inserts empty dividing lines between each BuildStepLabel component -->
        <span class="divider hideme w-50 d-flex" v-if="index < 2 && steps.length > 2"></span>
      </template>
    </b-col>

    <b-col lg="12">
      <hr class="mt-0">
    </b-col>

    <!-- <b-col lg="12" class='h-100 align-items-center d-flex' style="min-height: 20rem;"> -->
    <b-col lg="12" :class='colClassName' style="padding-bottom: 5rem;">
      <slot name="step-1" v-if="selectedStep.id === 'getting_started'" />
      <slot name="step-2" v-if="selectedStep.id === 'blueprint_step'" />
      <slot name="step-3" v-if="selectedStep.id === 'configure_generator'" />
    </b-col>

  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import BuildStepChild from './BuildStepChild'
import BuildStepLabel from './BuildStepLabel'

export default {
  name: 'BuildSteps',
  components: {
    BuildStepChild,
    BuildStepLabel
  },
  computed: {
    ...mapGetters({
      steps: 'build/steps/collection/items',
      currentStep: 'build/steps/current',
      selectedStep: 'build/steps/selectedStep'
    }),
    colClassName () {
      // let css = 'h-100 align-items-center d-flex w-100'
      let css = ''
      if (this.currentStep === 0) css += ' min-height-20'
      return css
    }
  }
}
</script>

<style lang="sass">
  // CLEANUP - replace with a global SASS import
  // https://vueschool.io/articles/vuejs-tutorials/globally-load-sass-into-your-vue-js-applications/
  // @import '../../../sass/vendor'

  div.step-wrapper
    padding-top: 1.25rem
    background: #f5f6f9

  div.label-wrapper
    // padding-top: 1.25rem
    background: #f5f6f9

  span.divider
    transition: all 0.3s ease
    min-height: 4px
    max-height: 4px
    border-radius: 4px
    background: linear-gradient(to right, #02B875 50%, #ced4da 50%)
    background-size: 200% 100%
    background-position: right bottom
    margin-left: -2.5rem
    margin-right: -2.5rem

    &.success
      background-position: left bottom

    &.hideme
      opacity: 0

  div.min-height-20
    min-height: 20rem

</style>
