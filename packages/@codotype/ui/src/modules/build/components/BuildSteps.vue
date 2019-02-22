<template>
  <b-row v-if="steps[0]">
    <b-col lg="12" class="step-wrapper d-flex flex-row w-100 align-items-center justify-content-between">

      <template v-for="step, index in steps">

        <BuildStepChild
          :key="step.id"
          :step="step"
          :index="index"
          style="width: 33.3%;"
        />

        <!-- Conditionally inserts dividing lines between each BuildStepChild component -->
        <span class="divider done w-50 success d-flex" v-if="currentStep > index && index < 2"></span>
        <span class="divider w-50 d-flex" v-else-if="index < 2 && steps.length > 2"></span>
      </template>

    </b-col>

    <b-col lg="12">
      <hr>
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

export default {
  name: 'BuildSteps',
  components: {
    BuildStepChild
  },
  computed: {
    ...mapGetters({
      steps: 'build/steps/collection/items',
      currentStep: 'build/steps/current',
      selectedStep: 'build/steps/selectedStep'
    }),
    colClassName () {
      let css = 'h-100 align-items-center d-flex'
      if (this.currentStep === 0) css += ' min-height-20'
      return css
    }
  }
}
</script>

<style lang="sass">
  // TODO - replace with a global SASS import
  // https://vueschool.io/articles/vuejs-tutorials/globally-load-sass-into-your-vue-js-applications/
  @import '../../../sass/vendor'

  div.step-wrapper
    padding-top: 1.25rem
    background: #f5f6f9

  span.divider
    transition: all 0.3s
    min-height: 4px
    max-height: 4px
    border-radius: 4px
    background: linear-gradient(to right, $success 50%, $secondary 50%)
    background-size: 200% 100%
    background-position: right bottom

    &.success
      background-position: left bottom

  div.min-height-20
    min-height: 20rem

</style>
