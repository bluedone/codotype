export default {
  async created () {
    await this.$store.dispatch('generator/fetchCollection')
    this.fetching = false
  },
  data () {
    return {
      fetching: true
    }
  },
  computed: {
    generatorId () {
      const generator = this.$store.getters['generator/collection'][0]
      if (generator) return generator.id
      return null
    }
  }
}