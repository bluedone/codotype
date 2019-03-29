<template>
  <b-row class='w-100 justify-content-center'>

    <b-col xl=10 lg=12 class="d-flex flex-row w-100 justify-content-between">

      <b-button
        v-if="currentStep !== 0"
        variant="outline-primary"
        size="lg"
        @click="decrementStep()"
        :disabled="currentStep === 0"
      >
        <i class="fa fa-chevron-left mr-1"></i>
        Back
      </b-button>
      <span v-else></span>

      <span v-if="currentStep === 1">
        <!-- <HelpButton class='mr-2' /> -->
        <TourButton class='mr-2' size="lg" tour="appEditorSteps" />

        <b-dropdown
          right
          no-caret
          size="lg"
          variant="light"
          class='mr-2'
          toggle-class='rounded'
        >
          <template slot="button-content">
            <i class="fa fa-fw fa-ellipsis-h"></i>
          </template>

          <b-dropdown-item-button @click="$store.commit('editor/modals/import/showing', true)">
            <i class="fa fa-fw fa-upload"></i>
            Import Blueprint
          </b-dropdown-item-button>

          <b-dropdown-item-button @click="$store.commit('editor/modals/export/showing', true)">
            <i class="fa fa-fw fa-download"></i>
            Export Blueprint
          </b-dropdown-item-button>

        </b-dropdown>

        <!-- <span class='text-muted' v-if="currentStep === 1">
          <router-link to="/auth/signup" >Sign Up</router-link> or <router-link to="/auth/login">Log In</router-link> to Save Schemas<i class="ml-1 fa fa-info-circle" title="Codotype automatically saves your Blueprint in localstorage. Signing up is a great idea if you want to continue making changes on another device." v-b-tooltip.hover.top></i>
        </span> -->
      </span>

      <b-button
        size="lg"
        variant="outline-primary"
        @click="incrementStep()"
        :disabled="disableNext"
        v-if="currentStep !== 2 && currentStep !== steps.length - 1"
      >
        Next
        <i class="ml-1 fa fa-chevron-right"></i>
      </b-button>

      <GenerateCodeButton />

    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TourButton from '../../../components/TourButton'
import HelpButton from '../../../components/HelpButton'
import GenerateCodeButton from './GenerateCodeButton'

export default {
  name: 'BuildStepsControls',
  components: {
    TourButton,
    HelpButton,
    GenerateCodeButton
  },
  computed: {
    ...mapGetters({
      currentStep: 'build/steps/current',
      steps: 'build/steps/collection/items',
      enableSubmit: 'editor/project/enableSubmit'
    }),
    disableNext () {
      if (this.currentStep === 0 && !this.enableSubmit) return true
      return false
    }
  },
  methods: mapActions({
    incrementStep: 'build/steps/increment',
    decrementStep: 'build/steps/decrement'
  })
}
</script>
