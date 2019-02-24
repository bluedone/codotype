<template>
  <b-row class='justify-content-center'>
    <b-col xl=9 lg=12>

      <!-- TODO - remove v-if="model.id" -->
      <BuildSteps v-if="model.id">
        <template slot="step-1">
          <ProjectForm />
        </template>

        <template slot="step-2">
          <BlueprintEditor />
        </template>

        <template slot="step-3">
          <b-row class='w-100 justify-content-center'>
            <b-col sm=12>
              <ConfigureGenerator :id="id" />
            </b-col>
          </b-row>
        </template>
      </BuildSteps>

    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BuildSteps from '../../build/components/BuildSteps'
import ProjectForm from '../../../components/BlueprintEditor/components/project/ProjectForm'
import BlueprintEditor from '../../../components/BlueprintEditor'
import ConfigureGenerator from '../../build/components/ConfigurationEditor'

export default {
  name: 'GeneratorBuild',
  props: {
    id: {
      required: true
    }
  },
  components: {
    BuildSteps,
    ProjectForm,
    BlueprintEditor,
    ConfigureGenerator
  },
  metaInfo () {
    return {
      title: this.model.label
    }
  },
  async created () {
    // TODO - this is only needed IF the generator has NOT been fetched yet
    // Should display a loading animation as needed
    await this.$store.dispatch('generator/fetchCollection')
    this.selectModel(this.id)
    this.$store.dispatch('build/loadSteps', this.id)
    this.$store.dispatch('build/steps/reset')
  },
  methods: mapActions({
    selectModel: 'generator/selectModel'
  }),
  computed: mapGetters({
    model: 'generator/selectedModel'
  })
}
</script>
