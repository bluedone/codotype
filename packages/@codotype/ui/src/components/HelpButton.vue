<template>
  <i
    @mouseover="$store.commit('editor/help/showing', true)"
    @mouseout="$store.commit('editor/help/showing', false)"
    class="fa fa-lg fa-question-circle text-primary">
  </i>
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
      this.driver.defineSteps(this.$store.getters[`tour/${this.tour}`])
      return this.driver.start()
    }
  }
}
</script>
