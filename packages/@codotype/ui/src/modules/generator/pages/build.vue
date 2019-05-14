<template>
  <div class="container-fluid h-100">
    <Loading v-if="starting" />
    <LoadingBuild v-else-if="loading" />
    <BuildError v-else-if="fetchError || runtimeError" />
    <BuildFinished v-else-if="finished" />
    <b-row v-else class='justify-content-center'>
      <b-col xl=12 lg=12>

        <BuildSteps v-if="model.id">
          <template slot="step-1">
            <b-row class="justify-content-center">
              <b-col sm=12 lg="8" xl=6>
                <ProjectForm />
              </b-col>
            </b-row>
          </template>

          <template slot="step-2">
            <b-row class="justify-content-center">
              <b-col sm=12 xl=10>
                <BlueprintEditor />
              </b-col>
            </b-row>
          </template>

          <template slot="step-3">
            <b-row class='justify-content-center'>
              <b-col sm=12 xl=10>
                <ConfigureGenerator :id="id" />
              </b-col>
            </b-row>
          </template>
        </BuildSteps>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from '../../../components/Loading'
import BuildSteps from '../../build/components/BuildSteps'
import BuildError from '../../build/components/BuildError'
import LoadingBuild from '../../build/components/LoadingBuild'
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
  metaInfo () {
    return { title: this.model.label }
  },
  components: {
    Loading,
    LoadingBuild,
    BuildSteps,
    BuildError,
    BuildFinished,
    ProjectForm,
    BlueprintEditor,
    ConfigureGenerator
  },
  async created () {
    try {
      await this.$store.dispatch('generator/fetchCollection')
      this.selectModel(this.id)
      this.$store.dispatch('build/loadSteps', this.id)
      this.$store.dispatch('build/steps/reset')
      setTimeout(() => {
        this.starting = false
      }, 500)
    } catch (err) {
      this.starting = false
    }
  },
  methods: mapActions({
    selectModel: 'generator/selectModel'
  }),
  computed: mapGetters({
    fetchError: 'generator/error',
    runtimeError: 'build/runtime/error',
    model: 'generator/selectedModel',
    loading: 'build/runtime/loading',
    finished: 'build/runtime/finished'
  })
}
</script>
