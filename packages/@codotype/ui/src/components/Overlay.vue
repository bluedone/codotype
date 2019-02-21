<template>
  <div :class="className"></div>
</template>

<script>
export default {
  name: 'Overlay',
  computed: {
    className () {
      let css = ['overlay']
      if (this.$store.getters['editor/help/showing']) css.push('active')
      return css.join(' ')
    }
  }
}
</script>

<style lang="sass">

  .overlay
    z-index: 0
    width: 100%
    height: 100%
    position: fixed
    background-color: #000
    opacity: 0
    transition: opacity .25s ease-out
    pointer-events: none
    .overlay
      width: 100%
      height: 100%

    &.active
      z-index: 80
      opacity: 0.60

</style>
