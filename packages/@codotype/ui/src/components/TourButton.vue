<template>
  <b-button
    variant='outline-dark'
    :size="size"
    @click.stop="startTour()"
    v-b-tooltip.hover
    :placement="tooltipPlacement || 'left' "
    :title='"Click here to start tour"'
  >
    <i class="fa fa-car"></i>
    Tour
  </b-button>
</template>

<script>
import Driver from 'driver.js'

export default {
  name: 'TourButton',
  props: ['tour', 'size', 'tooltipPlacement'],
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
