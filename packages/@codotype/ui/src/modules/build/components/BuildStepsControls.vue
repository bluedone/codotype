<template>
  <b-row class='w-100 justify-content-center'>

    <b-col xl=10 lg=12 class="d-flex flex-row w-100 justify-content-between">

      <span class="py-1">
        <button
          class="btn btn-link"
          size="lg"
          @click="decrementStep()"
          :disabled="currentStep === 0"
        >
          <i class="fa fa-lg fa-chevron-circle-left" />
        </button>
      </span>

      <span>
        <b-dropdown
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
            Import Project
          </b-dropdown-item-button>

          <b-dropdown-item-button @click="$store.commit('editor/modals/export/showing', true)">
            <i class="fa fa-fw fa-download"></i>
            Export Project
          </b-dropdown-item-button>

        </b-dropdown>

        <!-- <TourButton class='mr-2' size="lg" tour="appEditorSteps" :disabled="currentStep === 0"/> -->
        <HelpButton class='mr-2' />

        <GenerateCodeButton :disabled="currentStep === 0" />

        <!-- <span class='text-muted ml-2'>
          <router-link to="/auth/signup" >Sign Up</router-link> or <router-link to="/auth/login">Log In</router-link> to Save Projects<i class="ml-1 fa fa-info-circle" title="Codotype automatically saves your Blueprint in localstorage. Signing up is a great idea if you want to continue making changes on another device." v-b-tooltip.hover.top></i>
        </span> -->
      </span>

      <span class="py-1">
        <button
          size="lg"
          class="btn btn-link"
          @click="incrementStep()"
          :disabled="disableNext"
        >
          <i class="fa fa-lg fa-chevron-circle-right" />
        </button>
      </span>

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
    GenerateCodeButton,
  },
  computed: {
    ...mapGetters({
      currentStep: 'build/steps/current',
      steps: 'build/steps/collection/items',
      enableSubmit: 'editor/project/enableSubmit'
    }),
    disableNext () {
      if (this.currentStep === 0 && !this.enableSubmit) return true
      if (this.currentStep === 1 && this.steps.length === 2) return true
      if (this.currentStep === 2) return true
      return false
    }
  },
  methods: mapActions({
    incrementStep: 'build/steps/increment',
    decrementStep: 'build/steps/decrement'
  })
}
</script>
