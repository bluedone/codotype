<template>
  <BlueprintMenu v-if="showBlueprintMenu"/>
  <GeneratorMenu v-else-if="showGeneratorMenu"/>
  <HomeMenu v-else/>
</template>

<script>
import HomeMenu from './HomeMenu'
import BlueprintMenu from './BlueprintMenu'
import GeneratorMenu from './GeneratorMenu'

export default {
  name: 'Navbar',
  components: {
    HomeMenu,
    BlueprintMenu,
    GeneratorMenu
  },
  computed: {
    showBlueprintMenu () {
      return this.$route.name === 'BlueprintShow'
    },
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
