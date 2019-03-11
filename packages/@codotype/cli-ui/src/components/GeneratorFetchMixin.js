export default {
  computed: {
    selectedModel () {
      return JSON.parse(process.env.VUE_APP_GENERATOR_META)
    }
  }
}


