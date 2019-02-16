<template>
  <b-row>
    <b-col lg=12>
      <!-- TODO - remove the v-if="model.id", janky -->
      <GeneratorStart :model="model" v-if="model.id" />
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import GeneratorStart from '../components/GeneratorStart'

export default {
  name: 'GeneratorShow',
  props: {
    id: {
      required: true
    }
  },
  components: {
    GeneratorStart
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
  },
  methods: mapActions({
    selectModel: 'generator/selectModel'
  }),
  computed: mapGetters({
    model: 'generator/selectedModel'
  })
}
</script>
