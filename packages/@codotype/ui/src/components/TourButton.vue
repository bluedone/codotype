<template>
  <b-button
    variant="light"
    class="mr-2 d-none d-md-block"
    size="sm"
    @click.stop="startTour()"
  >
    <i class="fa fa-fw fa-book-open" />
    Tutorial
  </b-button>
</template>

<script>
import Driver from 'driver.js'

export default {
  name: 'TourButton',
  created () {
    this.driver = new Driver()
  },
  methods: {
    startTour () {
      this.driver.defineSteps(this.$store.getters[`tour/appEditorSteps`])
      return this.driver.start()
    }
  }
}
</script>
