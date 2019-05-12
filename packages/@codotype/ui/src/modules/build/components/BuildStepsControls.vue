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
          <i class="fa fa-lg fa-chevron-circle-left"></i>
        </button>
      </span>

      <span>
        <b-dropdown
          right
          :disabled="currentStep === 0"
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

        <TourButton class='mr-2' size="lg" tour="appEditorSteps" :disabled="currentStep === 0"/>

        <GenerateCodeButton :disabled="currentStep === 0" />

        <!-- <span class='text-muted' v-if="currentStep === 1">
          <router-link to="/auth/signup" >Sign Up</router-link> or <router-link to="/auth/login">Log In</router-link> to Save Schemas<i class="ml-1 fa fa-info-circle" title="Codotype automatically saves your Blueprint in localstorage. Signing up is a great idea if you want to continue making changes on another device." v-b-tooltip.hover.top></i>
        </span> -->
      </span>

      <span class="py-1">
        <button
          size="lg"
          class="btn btn-link"
          @click="incrementStep()"
          :disabled="disableNext"
        >
          <i class="fa fa-lg fa-chevron-circle-right"></i>
        </button>
      </span>

    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TourButton from '../../../components/TourButton'
import GenerateCodeButton from './GenerateCodeButton'

export default {
  name: 'BuildStepsControls',
  components: {
    TourButton,
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
