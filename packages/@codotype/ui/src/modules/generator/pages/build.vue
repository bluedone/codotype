<template>
  <Loading v-if="starting || loading" />
  <BuildFinished v-else-if="finished" />
  <b-row v-else class='justify-content-center'>
    <b-col xl=12 lg=12>

      <BuildSteps v-if="model.id">
        <template slot="step-1">
          <b-row class='w-100 justify-content-center'>
            <b-col sm=9>
              <ProjectForm />
            </b-col>
          </b-row>
        </template>

        <template slot="step-2">
          <b-row class='w-100 justify-content-center'>
            <b-col sm=12>
              <BlueprintEditor />
            </b-col>
          </b-row>
        </template>

        <template slot="step-3">
          <b-row class='w-100 justify-content-center'>
            <b-col sm=9>
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
import Loading from '../../../components/Loading'
import BuildSteps from '../../build/components/BuildSteps'
import BuildFinished from '../../build/components/BuildFinished'
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
  data () {
    return {
      starting: true
    }
  },
  components: {
    Loading,
    BuildSteps,
    BuildFinished,
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
    await this.$store.dispatch('generator/fetchCollection')
    this.selectModel(this.id)
    this.$store.dispatch('build/loadSteps', this.id)
    this.$store.dispatch('build/steps/reset')
    setTimeout(() => {
      this.starting = false
    }, 500)
  },
  methods: mapActions({
    selectModel: 'generator/selectModel'
  }),
  computed: mapGetters({
    model: 'generator/selectedModel',
    loading: 'build/runtime/loading',
    finished: 'build/runtime/finished'
  })
}
</script>
