<template>
  <GeneratorMenu v-if="showGeneratorMenu"/>
  <HomeMenu v-else/>
</template>

<script>
import HomeMenu from './HomeMenu'
import GeneratorMenu from './GeneratorMenu'

export default {
  name: 'Navbar',
  components: {
    HomeMenu,
    GeneratorMenu
  },
  computed: {
    showGeneratorMenu () {
      return ['GeneratorShow', 'GeneratorBuild'].includes(this.$route.name)
    }
  }
}
</script>

<style lang="sass">

  nav.navbar
    border-bottom: 1px solid #d3d3d3

</style>
