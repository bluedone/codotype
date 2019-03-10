<template>
  <GeneratorStart :model="model" v-if="model.id" />
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
    // CLEANUP - this is only needed IF the generator has NOT been fetched yet
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
