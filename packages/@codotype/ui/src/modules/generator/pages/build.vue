<template>
  <div class="container-fluid h-100">
    <Loading v-if="starting" />
    <LoadingBuild v-else-if="loading" />
    <BuildError v-else-if="fetchError || runtimeError" />
    <BuildFinished v-else-if="finished" />
    <b-row v-else class="mt-4 justify-content-center">
      <b-col sm=12 xl=10 v-if="model && model.id">
        <BlueprintEditor :id="model.id" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from '../../../components/Loading'
import BuildError from '../../build/components/BuildError'
import LoadingBuild from '../../build/components/LoadingBuild'
import BuildFinished from '../../build/components/BuildFinished'
import BlueprintEditor from '../../../components/BlueprintEditor'

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
    BuildError,
    BuildFinished,
    BlueprintEditor
  },
  async created () {
    try {
      await this.$store.dispatch('generator/fetchCollection')
      this.selectModel(this.id)
      this.$store.dispatch('build/loadSteps', this.id)
      // this.$store.dispatch('build/steps/reset')
      this.$store.dispatch('build/selectBuild', this.id) // TODO - this is invoked in `build.editorModule` as well
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
    schemas: 'editor/schema/collection/items',
    fetchError: 'generator/error',
    runtimeError: 'build/runtime/error',
    model: 'generator/selectedModel',
    loading: 'build/runtime/loading',
    finished: 'build/runtime/finished'
  })
}
</script>
