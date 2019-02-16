<template>
  <b-row>
    <b-col lg=12>

      <!-- TODO - remove v-if="model.id" -->
      <BuildSteps v-if="model.id">
        <template slot="step-1">
          <ProjectForm />
        </template>

        <template slot="step-2">
          <BlueprintEditor />
        </template>

        <template slot="step-3">
          <ConfigureGenerator :id="id" />
        </template>

        <template slot="step-4">
          <LoadingBuild />
        </template>
      </BuildSteps>

    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingBuild from '../../build/components/LoadingBuild'
import BuildSteps from '../../build/components/BuildSteps'
import ProjectForm from '../../../components/BlueprintEditor/components/project/ProjectForm'
import BlueprintEditor from '../../../components/BlueprintEditor'
import ConfigureGenerator from '../components/ConfigureGenerator'

export default {
  name: 'GeneratorBuild',
  props: {
    id: {
      required: true
    }
  },
  components: {
    LoadingBuild,
    BuildSteps,
    ProjectForm,
    ConfigureGenerator,
    BlueprintEditor
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
    this.$store.dispatch('build/selectBuild', this.id)
    this.$store.dispatch('build/steps/reset')
    this.$store.commit('editor/about/showing', false)
  },
  methods: mapActions({
    selectModel: 'generator/selectModel'
  }),
  computed: mapGetters({
    model: 'generator/selectedModel'
  })
}
</script>
