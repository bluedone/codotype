<template>
  <button
    class="btn btn-link"
    :disabled="disabled"
    :size="size"
    @click.stop="startTour()"
    @mouseover="$store.commit('editor/help/showing', true)"
    @mouseout="$store.commit('editor/help/showing', false)"
    v-b-tooltip.hover
    :placement="tooltipPlacement || 'left' "
    :title='"Click here to start tour"'
  >
    Tutorial
  </button>
</template>

<script>
import Driver from 'driver.js'

export default {
  name: 'TourButton',
  props: ['tour', 'size', 'tooltipPlacement', 'disabled'],
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
